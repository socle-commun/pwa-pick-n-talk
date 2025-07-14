import { useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router";

import AppProviders from "@/components/partials/global/AppProviders";

import Layout from "@/routes/layout";
import CatchAllPage from "@/routes/error";
import IndexPage from "@/routes/page";

import ForgotPasswordPage from "@/routes/auth/forgot-password/page";
import SignInPage from "@/routes/auth/sign-in/page";
import SignUpPage from "@/routes/auth/sign-up/page";

import FeedbackPage from "@/routes/feedback/page";
import PrivacyPage from "@/routes/privacy/page";
import ProfilePage from "@/routes/profile/page";
import SettingsPage from "@/routes/settings/page";

import BindersPage from "@/routes/binders/page";
import BinderPage from "@/routes/binders/[uuid]/page";
import BinderEditPage from "@/routes/binders/[uuid]/edit/page";

import toggleDarkClass from "@/utilities/toggleDarkClass";

function App() {
  useEffect(() => {
    toggleDarkClass();
  }, []);

  return (
    <AppProviders>
      <BrowserRouter basename={process.env.NODE_ENV === "production" ? "/pick-n-talk" : "/"}>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route index element={<IndexPage />} />

            <Route path="auth">
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="sign-in" element={<SignInPage />} />
              <Route path="sign-up" element={<SignUpPage />} />
            </Route>

            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />

            <Route path="binders">
              <Route index element={<BindersPage />} />
              <Route path=":uuid">
                <Route index element={<BinderPage />} />
                <Route path="edit" element={<BinderEditPage />} />
              </Route>
            </Route>

            <Route path="*" element={<CatchAllPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
