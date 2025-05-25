import { useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router";

import AppProviders from "@/components/global/AppProviders";

import Layout from "@/routes/layout";
import CatchAllPage from "@/routes/error";
import IndexPage from "@/routes/page";

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
