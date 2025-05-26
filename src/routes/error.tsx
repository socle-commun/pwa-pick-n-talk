import Button from "@/components/actions/button/Button";
import Link from "@/components/navigation/Link";

import cn from "@/utilities/cn";

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
              className={cn("rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-xs bg-zinc-500 text-zinc-50 dark:bg-zinc-500 dark:text-zinc-50 hover:bg-zinc-900 dark:hover:bg-zinc-100 hover:text-zinc-50 dark:hover:text-zinc-950 transition-colors")}
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