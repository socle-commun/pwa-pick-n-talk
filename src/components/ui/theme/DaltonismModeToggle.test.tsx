import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "jotai";
import React from "react";

import DaltonismModeToggle from "./DaltonismModeToggle";

// Mock react-i18next
const mockT = (key: string) => key;
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: mockT }),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider>{children}</Provider>
);

describe("DaltonismModeToggle", () => {
  it("should render with default daltonism mode", () => {
    render(
      <DaltonismModeToggle />,
      { wrapper }
    );

    expect(screen.getByText("accessibility.daltonism.options.none.label")).toBeInTheDocument();
  });

  it("should open dropdown when clicked", async () => {
    const user = userEvent.setup();

    render(
      <DaltonismModeToggle />,
      { wrapper }
    );

    const button = screen.getByRole("button");
    await user.click(button);

    expect(screen.getByText("accessibility.daltonism.options.protanopia.label")).toBeInTheDocument();
  });

  it("should change daltonism mode when option is selected", async () => {
    const user = userEvent.setup();

    render(
      <DaltonismModeToggle />,
      { wrapper }
    );

    const button = screen.getByRole("button");
    await user.click(button);

    const protanopiaOption = screen.getByText("accessibility.daltonism.options.protanopia.label");
    await user.click(protanopiaOption);

    expect(screen.getByText("accessibility.daltonism.options.protanopia.label")).toBeInTheDocument();
  });
});
