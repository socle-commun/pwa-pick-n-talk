import Button from "@/components/ui/actions/Button";
import Link from "@/components/ui/navigation/Link";

import cn from "@/utils/cn";

export default function ErrorPage() {
  return (
    <>
      <main className={cn("grid place-items-center px-6 py-24 sm:py-32 lg:px-8")}>
        <div className={cn("text-center")}>
          <p className={cn("text-3xl font-semibold")}>404</p>
          <h1 className={cn("mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl")}>
            Page not found
          </h1>
          <p className={cn("mt-6 text-lg font-medium text-pretty text-zinc-500 sm:text-xl/8")}>
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className={cn("mt-10 flex items-center justify-center gap-x-6")}>
            <Button
              href="/"
              color="dark/white"
            >
              Go back home
            </Button>
            <Link href="/support" className={cn("text-sm font-semibold")}>
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}