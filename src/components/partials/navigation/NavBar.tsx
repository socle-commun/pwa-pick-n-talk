
import AuthManager from "@/components/partials/global/AuthManager";
import Brand from "@/components/partials/global/Brand";
import LocaleSelector from "@/components/ui/LocaleSelector";
import {
  Navbar,
  NavbarSection,
  NavbarSpacer,
  Link,
} from "@/components/ui/navigation";

export default function NavBar() {
  return (
    <Navbar>
      <NavbarSection>
        <Link href="/">
          <Brand />
        </Link>
      </NavbarSection>
      <NavbarSpacer />
      <NavbarSection className="flex-shrink-0">
        <LocaleSelector variant="compact" className="mr-2 sm:mr-4" />
        <AuthManager />
      </NavbarSection>
    </Navbar>
  );
}
