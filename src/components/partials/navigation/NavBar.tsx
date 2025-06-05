
import { Navbar, NavbarSection, NavbarSpacer, Link } from "@/components/ui/navigation";

import Brand from "@/components/partials/global/Brand";
import AuthManager from "@/components/partials/global/AuthManager";

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
        <AuthManager user={{
          uuid: crypto.randomUUID(),
          name: "Michel Montejuado",
          email: "michel.montejuado@example.com"
        }} />
      </NavbarSection>
    </Navbar>
  );
}