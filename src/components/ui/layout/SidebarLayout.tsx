import {
  Dialog as HeadlessDialog,
  DialogBackdrop as HeadlessDialogBackdrop,
  DialogPanel as HeadlessDialogPanel,
  CloseButton as HeadlessCloseButton,
} from "@headlessui/react";
import { useState, type PropsWithChildren, type ReactNode } from "react";


import { NavbarItem } from "@/components/ui/navigation";
import cn from "@/utils/cn";

function OpenMenuIcon() {
  return (
    <svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M2 6.75C2 6.33579 2.33579 6 2.75 6H17.25C17.6642 6 18 6.33579 18 6.75C18 7.16421 17.6642 7.5 17.25 7.5H2.75C2.33579 7.5 2 7.16421 2 6.75ZM2 13.25C2 12.8358 2.33579 12.5 2.75 12.5H17.25C17.6642 12.5 18 12.8358 18 13.25C18 13.6642 17.6642 14 17.25 14H2.75C2.33579 14 2 13.6642 2 13.25Z" />
    </svg>
  );
}

function CloseMenuIcon() {
  return (
    <svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  );
}

function MobileSidebar({
  open,
  close,
  children,
}: PropsWithChildren<{ open: boolean; close: () => void }>) {
  return (
    <HeadlessDialog open={open} onClose={close} className="lg:hidden">
      <HeadlessDialogBackdrop
        transition
        className={cn(
          "fixed inset-0 theme-bg-overlay transition data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        )}
      />
      <HeadlessDialogPanel
        transition
        className={cn(
          "fixed inset-y-0 w-full max-w-80 p-2 transition duration-300 ease-in-out data-closed:-translate-x-full"
        )}
      >
        <div
          className={cn(
            "flex h-full flex-col rounded-lg theme-bg-secondary shadow-xs ring-1 theme-border-primary"
          )}
        >
          <div className={cn("-mb-3 px-4 pt-3")}>
            <HeadlessCloseButton as={NavbarItem} aria-label="Close navigation">
              <CloseMenuIcon />
            </HeadlessCloseButton>
          </div>
          {children}
        </div>
      </HeadlessDialogPanel>
    </HeadlessDialog>
  );
}

export default function SidebarLayout({
  navbar,
  sidebar,
  children,
}: PropsWithChildren<{ navbar: ReactNode; sidebar: ReactNode }>) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="relative isolate flex min-h-svh w-full theme-bg-secondary max-lg:flex-col lg:theme-bg-primary">
      {/* Sidebar on desktop */}
      <div className="fixed inset-y-0 left-0 w-64 max-lg:hidden">{sidebar}</div>

      {/* Sidebar on mobile */}
      <MobileSidebar open={showSidebar} close={() => setShowSidebar(false)}>
        {sidebar}
      </MobileSidebar>

      {/* Navbar on mobile */}
      <header className="flex items-center px-4 lg:hidden">
        <div className="py-2.5">
          <NavbarItem
            onClick={() => setShowSidebar(true)}
            aria-label="Open navigation"
          >
            <OpenMenuIcon />
          </NavbarItem>
        </div>
        <div className="min-w-0 flex-1">{navbar}</div>
      </header>

      {/* Content */}
      <main className="flex flex-1 flex-col pb-2 lg:min-w-0 lg:pt-2 lg:pr-2 lg:pl-64">
        <div className="grow p-6 lg:rounded-lg lg:theme-bg-secondary lg:p-10 lg:shadow-xs lg:ring-1 lg:theme-border-primary">
          <div className="mx-auto max-w-6xl">{children}</div>
        </div>
      </main>
    </div>
  );
}
