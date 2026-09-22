import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Plus, Layers } from "lucide-react";
import { DashboardShell, PageLoader } from "@/shared/components";
import { Input, Select, Button } from "@/shared/ui";
import { entityTypeOptions } from "@/shared/content";
import { listMyEstablishments } from "../api";
import { EstablishmentsTable } from "../components/EstablishmentsTable";
import { TopBar, FiltersRow, SearchWrap, SelectWrap, ActionsRow, ErrorText, DraftBanner } from "./EstablishmentsListPage.styles";

const STATUS_OPTIONS = ["Draft", "Pending", "Approved", "Rejected"] as const;

const SORT_OPTIONS = [
  { value: "name", label: "Sort: Name (A-Z)" },
  { value: "type", label: "Sort: Type" },
  { value: "status", label: "Sort: Status" },
  { value: "newest", label: "Sort: Newest First" },
];

export const EstablishmentsListPage = () => {
  const {
    data: establishments = [],
    isLoading,
    isError,
  } = useQuery({ queryKey: ["my-establishments"], queryFn: listMyEstablishments });

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const filtered = useMemo(() => {
    let list = establishments.filter((e) => e.businessName.toLowerCase().includes(search.trim().toLowerCase()));
    if (typeFilter !== "all") list = list.filter((e) => e.entityType === typeFilter);
    if (statusFilter !== "all") list = list.filter((e) => e.registrationStatus === statusFilter);

    return [...list].sort((a, b) => {
      switch (sortBy) {
        case "type":
          return a.entityType.localeCompare(b.entityType);
        case "status":
          return a.registrationStatus.localeCompare(b.registrationStatus);
        case "newest":
          return (b.submittedAt ?? "").localeCompare(a.submittedAt ?? "");
        case "name":
        default:
          return a.businessName.localeCompare(b.businessName);
      }
    });
  }, [establishments, search, typeFilter, statusFilter, sortBy]);

  const draftCount = establishments.filter((e) => e.registrationStatus === "Draft").length;

  return (
    <DashboardShell title="Establishments">
      {draftCount > 0 && (
        <DraftBanner>
          You have {draftCount} draft{draftCount === 1 ? "" : "s"} in progress.{" "}
          <button type="button" onClick={() => setStatusFilter("Draft")}>
            Continue where you left off
          </button>
        </DraftBanner>
      )}

      <TopBar>
        <FiltersRow>
          <SearchWrap>
            <Input
              placeholder="Search your establishments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchWrap>
          <SelectWrap>
            <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">All Types</option>
              {entityTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </SelectWrap>
          <SelectWrap>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Statuses</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
          </SelectWrap>
          <SelectWrap>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </SelectWrap>
        </FiltersRow>

        <ActionsRow>
          <Link to="/dashboard/establishments/bulk-add">
            <Button type="button" variant="outline">
              <Layers size={16} /> Bulk Add
            </Button>
          </Link>
          <Link to="/dashboard/establishments/add">
            <Button type="button">
              <Plus size={16} /> Add Establishment
            </Button>
          </Link>
        </ActionsRow>
      </TopBar>

      {isLoading && <PageLoader title="Loading your establishments..." />}
      {isError && <ErrorText>We could not load your establishments right now, please refresh the page.</ErrorText>}
      {!isLoading && !isError && <EstablishmentsTable establishments={filtered} />}
    </DashboardShell>
  );
};
