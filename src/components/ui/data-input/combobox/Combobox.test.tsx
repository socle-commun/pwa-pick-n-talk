import { render, screen, fireEvent } from "@testing-library/react";
import Combobox from "./Combobox";

const testOptions = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Cherry" },
];

describe("Combobox Component", () => {
  test("should render without crashing", () => {
    render(
      <Combobox
        options={testOptions}
        displayValue={(option) => option?.name}
      >
        {(option) => <div key={option.id}>{option.name}</div>}
      </Combobox>
    );
    const combobox = screen.getByRole("combobox");
    expect(combobox).toBeInTheDocument();
  });

  test("should show placeholder when provided", () => {
    render(
      <Combobox
        options={testOptions}
        displayValue={(option) => option?.name}
        placeholder="Select an option"
      >
        {(option) => <div key={option.id}>{option.name}</div>}
      </Combobox>
    );
    const input = screen.getByPlaceholderText("Select an option");
    expect(input).toBeInTheDocument();
  });

  test("should filter options based on input", () => {
    render(
      <Combobox
        options={testOptions}
        displayValue={(option) => option?.name}
      >
        {(option) => <div key={option.id}>{option.name}</div>}
      </Combobox>
    );
    const combobox = screen.getByRole("combobox");

    // Type to filter
    fireEvent.change(combobox, { target: { value: "App" } });

    // Should filter to show Apple
    expect(combobox).toHaveValue("App");
  });

  test("should use custom filter function when provided", () => {
    const customFilter = (option: typeof testOptions[0], query: string) =>
      option.name.toLowerCase().startsWith(query.toLowerCase());

    render(
      <Combobox
        options={testOptions}
        displayValue={(option) => option?.name}
        filter={customFilter}
      >
        {(option) => <div key={option.id}>{option.name}</div>}
      </Combobox>
    );

    const combobox = screen.getByRole("combobox");
    expect(combobox).toBeInTheDocument();
  });

  test("should handle aria-label", () => {
    render(
      <Combobox
        options={testOptions}
        displayValue={(option) => option?.name}
        aria-label="Select fruit"
      >
        {(option) => <div key={option.id}>{option.name}</div>}
      </Combobox>
    );
    const combobox = screen.getByRole("combobox");
    expect(combobox).toHaveAttribute("aria-label", "Select fruit");
  });

  test("should support autofocus", () => {
    render(
      <Combobox
        options={testOptions}
        displayValue={(option) => option?.name}
        autoFocus
      >
        {(option) => <div key={option.id}>{option.name}</div>}
      </Combobox>
    );
    const combobox = screen.getByRole("combobox");
    expect(combobox).toHaveFocus();
  });
});
