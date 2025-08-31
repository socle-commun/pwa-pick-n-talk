
import { Box } from "@mui/material";

import AuthManager from "@/components/partials/global/AuthManager";
import Brand from "@/components/partials/global/Brand";
import LocaleSelector from "@/components/ui/LocaleSelector";
import Navbar from "./navbar/Navbar";
import NavbarSection from "./navbar/NavbarSection";
import Link from "./Link";

export default function NavBar() {
  return (
    <Navbar>
      <NavbarSection>
        <Link href="/">
          <Brand />
        </Link>
      </NavbarSection>
      <Box sx={{ flexGrow: 1 }} />
      <NavbarSection sx={{ flexShrink: 0 }}>
        <LocaleSelector variant="compact" />
        <AuthManager />
      </NavbarSection>
    </Navbar>
  );
}
