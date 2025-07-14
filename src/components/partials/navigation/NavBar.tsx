import {
  Navbar,
  NavbarSection,
  NavbarSpacer,
  Link,
} from "@/components/ui/navigation";

import Brand from "@/components/partials/global/Brand";
import AuthManager from "@/components/partials/global/AuthManager";
import LocaleSelector from "@/components/ui/LocaleSelector";

export default function NavBar() {
  return (
    <Navbar>
      <NavbarSection>
        <Link href="/">
          <Brand />
        </Link>
      </NavbarSection>
      <NavbarSpacer />
      <NavbarSection>
        <LocaleSelector variant="compact" className="mr-4" />
        <AuthManager />
      </NavbarSection>
    </Navbar>
  );
}
