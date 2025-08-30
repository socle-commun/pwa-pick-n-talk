import Button from "@/components/ui/actions/Button";
import Link from "@/components/ui/navigation/Link";

export default function ErrorPage() {
  return (
    <>
      <main
        className={"grid place-items-center px-6 py-24 sm:py-32 lg:px-8"}
      >
        <div className={"text-center"}>
          <p className={"text-3xl font-semibold"}>404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
            Page not found
          </h1>
          <p
            className="mt-6 text-lg font-medium text-pretty text-zinc-500 sm:text-xl/8"
          >
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className={"mt-10 flex items-center justify-center gap-x-6"}>
            <Button href="/" color="dark/white">
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
