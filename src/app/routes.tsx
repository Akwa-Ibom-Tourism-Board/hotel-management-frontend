import { Routes, Route } from "react-router-dom";
import { PageShell } from "@/shared/components";
import { LandingPage } from "@/features/home";
import { NotFoundPage } from "@/features/not-found";
import {
  LoginPage,
  RegisterNinPage,
  RegisterDetailsPage,
  VerifyEmailPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from "@/features/auth";
import { AnalyticsPage } from "@/features/dashboard";
import {
  EstablishmentsListPage,
  AddEstablishmentPage,
  BulkAddEstablishmentsPage,
  EstablishmentDetailPage,
} from "@/features/establishments";
import { LicensingStatusPage } from "@/features/licensing";
import { ProfilePage } from "@/features/profile";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <PageShell>
          <LandingPage />
        </PageShell>
      }
    />

    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterNinPage />} />
    <Route path="/register/details" element={<RegisterDetailsPage />} />
    <Route path="/register/verify-email" element={<VerifyEmailPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/reset-password" element={<ResetPasswordPage />} />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <AnalyticsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/establishments"
      element={
        <ProtectedRoute>
          <EstablishmentsListPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/establishments/add"
      element={
        <ProtectedRoute>
          <AddEstablishmentPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/establishments/bulk-add"
      element={
        <ProtectedRoute>
          <BulkAddEstablishmentsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/establishments/:id"
      element={
        <ProtectedRoute>
          <EstablishmentDetailPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/licensing"
      element={
        <ProtectedRoute>
          <LicensingStatusPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/profile"
      element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      }
    />

    <Route
      path="*"
      element={
        <PageShell>
          <NotFoundPage />
        </PageShell>
      }
    />
  </Routes>
);
