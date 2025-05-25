import { useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router";

import AppProviders from "@/components/global/AppProviders";

import Layout from "@/routes/layout";
import CatchAllPage from "@/routes/error";
import IndexPage from "@/routes/page";

import SignInPage from "@/routes/auth/sign-in/page";
import SignOutPage from "@/routes/auth/sign-out/page";
import SignUpPage from "@/routes/auth/sign-up/page";

import BindersPage from "@/routes/binders/page";
import BinderPage from "@/routes/binders/[id]/page";
import BinderEditPage from "@/routes/binders/[id]/edit/page";

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
              <Route path="sign-out" element={<SignOutPage />} />
              <Route path="sign-up" element={<SignUpPage />} />
            </Route>

            <Route path="binders">
              <Route index element={<BindersPage />} />
              <Route path=":id">
                <Route index element={<BinderPage />} />
                <Route path="edit" element={<BinderEditPage />} />
              </Route>
            </Route>

            <Route path="settings" element={<SettingsPage />} />

            <Route path="*" element={<CatchAllPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  )
}

export default App;
