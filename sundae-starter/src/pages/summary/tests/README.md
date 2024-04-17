# Sumary

- [Test Documentation for SummaryForm Component](#test-documentation-for-summaryform-component)
  - [Test Setup](#test-setup)
    - [Imports](#imports)
    - [Component](#component)
  - [Test Descriptions](#test-descriptions)
- [Test 1: Initial Conditions](#test-1-initial-conditions)
- [Test 2: Checkbox Enables and Disables Button](#test-2-checkbox-enables-and-disables-button)
- [Test 3: Popover Responds to Hover](#test-3-popover-responds-to-hover)

# Test Documentation for SummaryForm Component

Tests for the `SummaryForm` component within a React application. The component handles user interactions related to finalizing an order, including terms and conditions acceptance.

## Test Setup

### Imports

- `render, screen`: Imported from `@testing-library/react` for rendering components and accessing DOM queries.
- `userEvent`: Imported from `@testing-library/user-event` to simulate user interactions.

### Component

- `SummaryForm`: This component includes a checkbox for agreeing to terms and conditions and a button to confirm the order.

## Test Descriptions

### Test 1: Initial Conditions

### Code

```jsx
test("Initial conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});
```

#### Description:

This test verifies the initial state of the `SummaryForm` when it is first rendered.

#### Key Methods:

- `render()`: Renders the `SummaryForm` component into the virtual DOM.
- `screen.getByRole()`: Retrieves elements by their accessible role, used here to find the checkbox and button.
- `expect().not.toBeChecked()`: Asserts that the checkbox is not checked by default.
- `expect().toBeDisabled()`: Ensures that the confirm order button is disabled initially.

### Test 2: Checkbox Enables and Disables Button

### Code

```jsx
test("Checkbox enables button on first click and disables on second click", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});
```

#### Description:

Tests the functionality of the checkbox controlling the enabled state of the confirm order button.

#### Key Methods:

- `userEvent.click()`: Simulates user clicking actions on the checkbox.
- `expect().toBeEnabled()`: Checks if the button becomes enabled when the checkbox is checked.
- `expect().toBeDisabled()`: Verifies that the button becomes disabled when the checkbox is unchecked.

### Test 3: Popover Responds to Hover

### Code

```jsx
test("popover responds to hover", async () => {
  // Create a setup function that returns the userEvent object
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);

  // await is needed to wait for the hover to complete ever user action, or it will fail
  await user.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
```

#### Description:

Ensures that a popover with additional information appears when hovering over the terms and conditions label and disappears when not hovering.

#### Key Methods:

- `screen.queryByText()`: Searches for text elements; returns null if no elements match, used to check for the absence of the popover initially.
- `userEvent.hover()` and `userEvent.unhover()`: Simulates mouse hovering actions to trigger the display and hiding of the popover.
- `expect().toBeInTheDocument()`: Asserts that the popover appears on the screen during hover.
- `expect().not.toBeInTheDocument()`: Confirms that the popover is removed from the screen after unhovering.
