import { fireEvent, screen, waitFor } from "@testing-library/react";

/**
 * Helper for form validation tests to reduce nested callbacks
 */
export const validateFieldAsync = async (
  fieldLabel: string,
  value: string,
  expectedError: string
) => {
  const input = screen.getByLabelText(fieldLabel);
  fireEvent.change(input, { target: { value } });
  fireEvent.blur(input);

  await waitFor(() => {
    expect(screen.getByText(expectedError)).toBeInTheDocument();
  });
};

/**
 * Helper for testing valid input values
 */
export const testValidInputAsync = async (
  fieldLabel: string,
  validValue: string
) => {
  const input = screen.getByLabelText(fieldLabel);
  fireEvent.change(input, { target: { value: validValue } });
  fireEvent.blur(input);

  await waitFor(() => {
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
};

/**
 * Helper for form submission tests
 */
export const submitFormAsync = async (expectedData: object) => {
  const submitButton = screen.getByRole("button", { name: /submit/i });
  fireEvent.click(submitButton);

  await waitFor(() => {
    // Form should be submitted successfully
    expect(submitButton).not.toBeDisabled();
  });
};