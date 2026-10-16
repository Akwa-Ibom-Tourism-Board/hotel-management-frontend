import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Building2, ChevronRight, Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui";
import { StatusBadge, DisabledBadge } from "./StatusBadge";
import type { Establishment } from "../api/types";

const OuterWrap = styled.div`
  position: relative;
`;

const TableWrap = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.card};
`;

// Signals there is more of the table to scroll to on narrow screens,
// where the last couple of columns would otherwise be cut off with no
// hint that they're reachable.
const ScrollFade = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 2.5rem;
  border-radius: 0 ${({ theme }) => theme.radii.xl} ${({ theme }) => theme.radii.xl} 0;
  background: linear-gradient(to right, transparent, ${({ theme }) => theme.alpha(theme.colors.foreground, 0.14)});
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  pointer-events: none;
`;

const ExpandBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
`;

const ExpandButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 42rem;
`;

const Thead = styled.thead`
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem 1.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const Row = styled.tr`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
  }
`;

const Td = styled.td`
  padding: 0.875rem 1.25rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.foreground};
  vertical-align: middle;
`;

const NameCell = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.DEFAULT};
  }
`;

const TypeText = styled.span`
  text-transform: capitalize;
`;

const BranchCount = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const EmptyWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3.5rem 1.5rem;
  text-align: center;
`;

const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.muted.foreground};
  max-width: 24rem;
  margin: 0;
`;

const StatusCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  flex-wrap: wrap;
`;

const ChevronCell = styled(Td)`
  width: 2rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

interface EstablishmentsTableProps {
  establishments: Establishment[];
}

// The actual <table> markup, shared between the inline view and the
// enlarged modal so the two never drift out of sync.
const EstablishmentsGrid = ({ establishments }: EstablishmentsTableProps) => (
  <Table>
    <Thead>
      <tr>
        <Th>Business Name</Th>
        <Th>Type</Th>
        <Th>Local Government</Th>
        <Th>Branches</Th>
        <Th>Status</Th>
        <Th aria-hidden />
      </tr>
    </Thead>
    <tbody>
      {establishments.map((establishment) => (
        <Row key={establishment.id}>
          <Td>
            <NameCell to={`/dashboard/establishments/${establishment.id}`}>{establishment.businessName}</NameCell>
          </Td>
          <Td>
            <TypeText>{establishment.entityType.replace(/_/g, " ")}</TypeText>
          </Td>
          <Td>{establishment.localGovernment}</Td>
          <Td>
            <BranchCount>{establishment.branches?.length ?? 0}</BranchCount>
          </Td>
          <Td>
            <StatusCell>
              <StatusBadge status={establishment.registrationStatus} />
              {establishment.isDisabled && <DisabledBadge />}
            </StatusCell>
          </Td>
          <ChevronCell>
            <Link to={`/dashboard/establishments/${establishment.id}`} aria-label={`View ${establishment.businessName}`}>
              <ChevronRight size={16} />
            </Link>
          </ChevronCell>
        </Row>
      ))}
    </tbody>
  </Table>
);

export const EstablishmentsTable = ({ establishments }: EstablishmentsTableProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showFade, setShowFade] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;

    const updateFade = () => {
      setShowFade(el.scrollWidth - el.clientWidth - el.scrollLeft > 4);
    };

    updateFade();
    el.addEventListener("scroll", updateFade, { passive: true });
    window.addEventListener("resize", updateFade);
    return () => {
      el.removeEventListener("scroll", updateFade);
      window.removeEventListener("resize", updateFade);
    };
  }, [establishments]);

  if (establishments.length === 0) {
    return (
      <TableWrap>
        <EmptyWrap>
          <Building2 size={28} />
          <EmptyText>No establishments match your filters yet. Try adjusting the search or filters above.</EmptyText>
        </EmptyWrap>
      </TableWrap>
    );
  }

  return (
    <div>
      <ExpandBar>
        <ExpandButton type="button" onClick={() => setExpanded(true)}>
          <Maximize2 size={13} /> Enlarge
        </ExpandButton>
      </ExpandBar>

      <OuterWrap>
        <TableWrap ref={scrollRef}>
          <EstablishmentsGrid establishments={establishments} />
        </TableWrap>
        <ScrollFade $visible={showFade} />
      </OuterWrap>

      {expanded && (
        <Dialog open={expanded} onOpenChange={setExpanded}>
          <DialogContent maxWidth="min(96vw, 80rem)">
            <DialogTitle>Establishments</DialogTitle>
            <TableWrap style={{ overflowX: "auto" }}>
              <EstablishmentsGrid establishments={establishments} />
            </TableWrap>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
