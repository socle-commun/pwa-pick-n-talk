
/**
 * Error page for 404 and general routing errors.
 * Purpose: Display a user-friendly error message using only semantic components.
 */
import Button from "@/components/ui/actions/Button";
import Link from "@/components/ui/navigation/Link";
import ErrorSection from "@/components/partials/layout/ErrorSection";
import ErrorCode from "@/components/partials/layout/ErrorCode";
import ErrorTitle from "@/components/partials/layout/ErrorTitle";
import ErrorText from "@/components/partials/layout/ErrorText";


export default function ErrorPage() {
  return (
    <ErrorSection>
      <ErrorCode>404</ErrorCode>
      <ErrorTitle>Page not found</ErrorTitle>
      <ErrorText>Sorry, we couldn't find the page you're looking for.</ErrorText>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button href="/" color="dark/white">
          Go back home
        </Button>
        <Link href="/support" className="text-sm font-semibold">
          Contact support <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </ErrorSection>
  );
}
