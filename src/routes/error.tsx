import { Button } from "@mui/material";

import Link from "@/components/partials/navigation/Link";

export default function ErrorPage() {
  return (
    <>
      <main
        className={"grid place-items-center px-6 py-24 sm:py-32 lg:px-8"}
      >
        <div className={"text-center"}>
          <p className={"text-3xl font-semibold"}>404</p>
          <h1 >
            Page not found
          </h1>
          <p

          >
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className={"mt-10 flex items-center justify-center gap-x-6"}>
            <Button href="/" variant="contained" color="primary">
              Go back home
            </Button>
            <Link href="/support" className={"text-sm font-semibold"}>
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
