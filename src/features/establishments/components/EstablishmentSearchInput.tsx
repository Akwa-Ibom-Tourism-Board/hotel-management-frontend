import { useState } from "react";
import styled from "styled-components";
import { CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/shared/hooks";
import { Input, Label } from "@/shared/ui";
import { searchEstablishments } from "../api";
import type { EstablishmentSearchResult } from "../api/types";

const Wrap = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const Hint = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: -0.15rem 0 0.4rem;
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.375rem);
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  max-height: 16rem;
  overflow-y: auto;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
`;

const ResultItem = styled.button<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ $disabled, theme }) => ($disabled ? "transparent" : theme.colors.muted.DEFAULT)};
  }
`;

const ResultName = styled.span`
  display: block;
  font-weight: 600;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.foreground};
`;

const ResultMeta = styled.span`
  display: block;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  text-transform: capitalize;
`;

const ClaimedBadge = styled.span`
  flex-shrink: 0;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
`;

const EmptyState = styled.div`
  padding: 0.875rem 1rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

interface EstablishmentSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (result: EstablishmentSearchResult) => void;
}

export const EstablishmentSearchInput = ({ value, onChange, onSelect }: EstablishmentSearchInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(value, 450);

  const { data: results = [], isFetching } = useQuery({
    queryKey: ["establishment-search", debouncedQuery],
    queryFn: () => searchEstablishments(debouncedQuery),
    enabled: debouncedQuery.trim().length >= 2,
  });

  const showDropdown = isOpen && debouncedQuery.trim().length >= 2;

  return (
    <Wrap>
      <Label $required>Business Name</Label>
      <Hint>Type the full name; avoid abbreviations, for example write International instead of Intl.</Hint>
      <Input
        placeholder="Start typing your establishment's name..."
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
      />
      {showDropdown && (
        <Dropdown>
          {isFetching && <EmptyState>Searching...</EmptyState>}
          {!isFetching && results.length === 0 && (
            <EmptyState>No existing establishment found with that name; you can register it as new below.</EmptyState>
          )}
          {!isFetching &&
            results.map((result) => {
              const claimed = Boolean(result.ownerId);
              return (
                <ResultItem
                  key={result.id}
                  type="button"
                  $disabled={claimed}
                  disabled={claimed}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    if (claimed) return;
                    onSelect(result);
                    setIsOpen(false);
                  }}
                >
                  <div>
                    <ResultName>{result.businessName}</ResultName>
                    <ResultMeta>
                      {result.entityType.replace(/_/g, " ")} &middot; {result.localGovernment}
                    </ResultMeta>
                  </div>
                  {claimed ? <ClaimedBadge>Already Claimed</ClaimedBadge> : <CheckCircle2 size={16} color="#16A34A" />}
                </ResultItem>
              );
            })}
        </Dropdown>
      )}
    </Wrap>
  );
};
