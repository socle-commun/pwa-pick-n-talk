import { useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router";

import AppProviders from "@/components/partials/global/AppProviders";

import Layout from "@/routes/layout";
import CatchAllPage from "@/routes/error";
import IndexPage from "@/routes/page";

import SignInPage from "@/routes/auth/sign-in/page";
import SignUpPage from "@/routes/auth/sign-up/page";

import BinderLayout from "@/routes/[uuid]/layout";
import BinderPage from "@/routes/[uuid]/page";
import BinderEditPage from "@/routes/[uuid]/edit/page";

import SettingsLayout from "@/routes/settings/layout";
import SettingsPage from "@/routes/settings/page";

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
              <Route path="sign-in" element={<SignInPage />} />
              <Route path="sign-up" element={<SignUpPage />} />
            </Route>

            <Route path=":uuid" element={<BinderLayout />}>
              <Route index element={<BinderPage />} />
              <Route path="edit" element={<BinderEditPage />} />
            </Route>

            <Route path="settings" element={<SettingsLayout />}>
              <Route index element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<CatchAllPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  )
}

export default App;
