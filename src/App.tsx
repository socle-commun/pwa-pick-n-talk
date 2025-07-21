import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import AppProviders from "@/components/partials/global/AppProviders";
import LazyRoute from "@/components/partials/global/LazyRoute";
import { useDaltonismMode, useFontSize, useThemeMode } from "@/utils/theme";

// Lazy-loaded route components
const Layout = lazy(() => import("@/routes/layout"));
const CatchAllPage = lazy(() => import("@/routes/error"));
const IndexPage = lazy(() => import("@/routes/page"));

const ForgotPasswordPage = lazy(() => import("@/routes/auth/forgot-password/page"));
const SignInPage = lazy(() => import("@/routes/auth/sign-in/page"));
const SignUpPage = lazy(() => import("@/routes/auth/sign-up/page"));

const FeedbackPage = lazy(() => import("@/routes/feedback/page"));
const PrivacyPage = lazy(() => import("@/routes/privacy/page"));
const ProfilePage = lazy(() => import("@/routes/profile/page"));
const SettingsPage = lazy(() => import("@/routes/settings/page"));
const SetupPage = lazy(() => import("@/routes/setup/page"));

const BindersPage = lazy(() => import("@/routes/binders/page"));
const BinderPage = lazy(() => import("@/routes/binders/[uuid]/page"));
const BinderEditPage = lazy(() => import("@/routes/binders/[uuid]/edit/page"));

function App() {
  // Initialize theme system
  useFontSize();
  useThemeMode();
  useDaltonismMode();

  // Theme is always ready with the new system
  return (
    <AppProviders>
      <BrowserRouter
        basename={process.env.NODE_ENV === "production" ? "/pick-n-talk" : "/"}
      >
        <Routes>
          <Route path="" element={<LazyRoute component={Layout} />}>
            <Route index element={<LazyRoute component={IndexPage} />} />

            <Route path="auth">
              <Route path="forgot-password" element={<LazyRoute component={ForgotPasswordPage} />} />
              <Route path="sign-in" element={<LazyRoute component={SignInPage} />} />
              <Route path="sign-up" element={<LazyRoute component={SignUpPage} />} />
            </Route>

            <Route path="feedback" element={<LazyRoute component={FeedbackPage} />} />
            <Route path="privacy" element={<LazyRoute component={PrivacyPage} />} />
            <Route path="profile" element={<LazyRoute component={ProfilePage} />} />
            <Route path="settings" element={<LazyRoute component={SettingsPage} />} />
            <Route path="setup" element={<LazyRoute component={SetupPage} />} />

            <Route path="binders">
              <Route index element={<LazyRoute component={BindersPage} />} />
              <Route path=":uuid">
                <Route index element={<LazyRoute component={BinderPage} />} />
                <Route path="edit" element={<LazyRoute component={BinderEditPage} />} />
              </Route>
            </Route>

            <Route path="*" element={<LazyRoute component={CatchAllPage} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
