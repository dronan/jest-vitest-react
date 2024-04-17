# Summary

- [Test Documentation for App Component](#test-documentation-for-app-component)
  - [Test Setup](#test-setup)
    - [Imports](#imports)
    - [Component](#component)
  - [Test Descriptions](#test-descriptions)
    - [Test: Order Phases for Happy Path](#test-order-phases-for-happy-path)
      - [Description](#description)
      - [Key Methods](#key-methods)
      - [Scenarios Tested](#scenarios-tested)
    - [Test: Toppings Header Absence on Summary Page If No Toppings Ordered](#test-toppings-header-absence-on-summary-page-if-no-toppings-ordered)
      - [Description](#description-1)
      - [Key Methods](#key-methods-1)
    - [Test: Toppings Header Absence After Removing Toppings](#test-toppings-header-absence-after-removing-toppings)
      - [Description](#description-2)
      - [Key Methods](#key-methods-2)

---

# Test Documentation for App Component

Test the `App` component, which orchestrates the entire ice cream ordering process in a React application.

## Test Setup

### Imports

- `render, screen`: Responsable for rendering components and accessing DOM queries.
- `userEvent`: Simulate user interactions such as typing and clicking.

### Component

- `App`: The root component that includes all subcomponents for the ice cream ordering system.

## Test Descriptions

### Test: Order Phases for Happy Path

### Code

```jsx
test("Order phases for happy path", async () => {
  const user = userEvent.setup();
  // render app
  // Don't need to wrap in provider; already wrapped!
  const { unmount } = render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const chocolateInput = screen.getByRole("spinbutton", { name: "Chocolate" });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);

  // find and click order summary button
  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  await user.click(orderSummaryButton);

  // check summary subtotals
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // accept terms and click button
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmOrderButton);

  // Expect "loading" to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // check confirmation page text
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  // expect that loading has disappeared
  const notLoading = screen.queryByText("loading");
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // find and click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderButton);

  // check that scoops and toppings have been reset
  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  // explicitly unmount component to trigger network call cancellation on cleanup
  unmount();
});
```

#### Description:

This test walks through the complete order process, ensuring that each phase works.

#### Key Methods:

- `render()`: Renders the `App` component.
- `screen.findByRole()`: Finds elements by their accessible role asynchronously, useful for retrieving elements after they render or update.
- `userEvent.clear()` and `userEvent.type()`: Simulate user interaction with input fields.
- `userEvent.click()`: Simulates clicks on buttons and checkboxes.
- `expect().toBeInTheDocument()`: Asserts that an element is present in the document.
- `expect().toHaveTextContent()`: Checks if the text content of an element matches specified text.
- `expect().not.toBeInTheDocument()`: Ensures an element is not present on the page.

#### Scenarios Tested:

- Adding different types of scoops and a topping.
- Checking the accuracy of subtotal calculations.
- Navigating through the ordering process to the order summary and confirmation screens.
- Verifying the order number on the confirmation screen.
- Resetting the order process to ensure the application is ready for a new order.

### Test: Toppings Header Absence on Summary Page If No Toppings Ordered

### Code

```jsx
test("Toppings header is not on summary page if no toppings ordered", async () => {
  const user = userEvent.setup();
  // render app
  render(<App />);

  // add ice cream scoops but no toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const chocolateInput = screen.getByRole("spinbutton", { name: "Chocolate" });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  // find and click order summary button
  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  await user.click(orderSummaryButton);

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole("heading", { name: /toppings/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});
```

#### Description:

Ensures that the toppings subtotal heading does not appear on the order summary page if no toppings were added.

#### Key Methods:

- `screen.queryByRole()`: Similar to `findByRole` but returns null if no elements match, which is ideal for checking non-existence.

### Test: Toppings Header Absence After Removing Toppings

### Code

```jsx
test("Toppings header is not on summary page if no scoops ordered, then removed", async () => {
  const user = userEvent.setup();

  // render app
  render(<App />);

  // add ice cream scoops
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  // add a topping and confirm
  const cherriesTopping = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesTopping);
  expect(cherriesTopping).toBeChecked();

  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("1.50");

  // remove the topping
  await user.click(cherriesTopping);
  expect(cherriesTopping).not.toBeChecked();
  expect(toppingsTotal).toHaveTextContent("0.00");

  // find and click order summary button
  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  await user.click(orderSummaryButton);

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $2.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole("heading", { name: /toppings/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});
```

#### Description:

Validates that the toppings subtotal heading is removed from the summary page if toppings are initially added then all removed before proceeding to the summary.

#### Key Methods:

- `expect().toBeChecked()` and `expect().not.toBeChecked()`: Check if a checkbox is checked or not, for UI state changes based on user interaction.
