import { Link } from "react-router-dom";
import styled from "styled-components";
import { Building2, ChevronRight } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import type { Establishment } from "../api/types";

const TableWrap = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.card};
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

const ChevronCell = styled(Td)`
  width: 2rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

interface EstablishmentsTableProps {
  establishments: Establishment[];
}

export const EstablishmentsTable = ({ establishments }: EstablishmentsTableProps) => {
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
    <TableWrap>
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
                <StatusBadge status={establishment.registrationStatus} />
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
    </TableWrap>
  );
};
