# Summary

- [Test Documentation for OrderEntry Component](#test-documentation-for-orderentry-component)
  - [Test Setup](#test-setup)
    - [Imports](#imports)
  - [Test Descriptions](#test-descriptions)
    - [Test 1: Handle Errors for Backend Routes](#test-1-handle-errors-for-backend-routes)
      - [Description](#description)
      - [Key Methods](#key-methods)
    - [Test 2: Disable Order Button If No Scoops Ordered](#test-2-disable-order-button-if-no-scoops-ordered)
      - [Description](#description-1)
      - [Key Methods](#key-methods-1)
- [Test Documentation for Options Component](#test-documentation-for-options-component)
  - [Imports](#imports-1)
  - [Component](#component)
  - [Test Descriptions](#test-descriptions-1)
  - [Test 1: Display Images for Each Scoop Option from Server](#test-1-display-images-for-each-scoop-option-from-server)
    - [Description](#description-2)
    - [Key Methods](#key-methods-2)
  - [Test 2: Display Images for Each Toppings Option from Server](#test-2-display-images-for-each-toppings-option-from-server)
    - [Description](#description-3)
    - [Key Methods](#key-methods-3)
  - [Test 3: Don't Update Total If Scoops Input Is Invalid](#test-3-dont-update-total-if-scoops-input-is-invalid)
    - [Description](#description-4)
    - [Key Methods](#key-methods-4)
- [Test Documentation for ScoopOption Component](#test-documentation-for-scoopoption-component)
  - [Test Setup](#test-setup-1)
    - [Imports](#imports-2)
  - [Test Description](#test-description)
    - [Test: Indicate if Scoop Count is Non-Integer or Out of Range](#test-indicate-if-scoop-count-is-non-integer-or-out-of-range)
    - [Description](#description-5)
    - [Key Methods](#key-methods-5)
    - [Scenarios Tested](#scenarios-tested)
- [Test Documentation for OrderEntry and Options Components](#test-documentation-for-orderentry-and-options-components)
  - [Test Setup](#test-setup-2)
    - [Imports](#imports-3)
  - [Components](#components)
  - [Test Descriptions](#test-descriptions-2)
    - [Scoops and Toppings Subtotal Tests](#scoops-and-toppings-subtotal-tests)
      - [Scoop Subtotal Update](#scoop-subtotal-update)
      - [Toppings Subtotal Update](#toppings-subtotal-update)
    - [Grand Total Tests](#grand-total-tests)
      - [Initial Grand Total](#initial-grand-total)
      - [Grand Total Update on Scoop/Topping Addition](#grand-total-update-on-scooptopping-addition)
      - [Removing Items and Total Update](#removing-items-and-total-update)

# Test Documentation for OrderEntry Component

Overview over all functions and methods used in the test file for the `OrderEntry` component.

## Test Setup

### Imports

- `render, screen`: Imported to render components and access various queries for testing.
- `userEvent`: Imported to simulate real user interactions.
- `HttpResponse, http`: Imported to manage and mock HTTP requests.
- `server`: Imported to set up a test server that intercepts and handles HTTP requests.

## Test Descriptions

### Test 1: Handle Errors for Backend Routes

### Code

```jsx
test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<OrderEntry />);

  const alerts = await screen.findAllByRole("alert");
  expect(alerts).toHaveLength(2);
});
```

#### Description:

This test checks if the application correctly handles and displays errors when the backend services fail.

#### Key Methods:

- `server.resetHandlers()`: Resets and overrides the handlers in the test server to simulate a server error.
- `render()`: Renders the `OrderEntry` component into the virtual DOM for testing.
- `screen.findAllByRole()`: Finds all elements that match the specified role. A alert must be displayed during the process, so, it will find it to check error messages.
- `expect().toHaveLength()`: Check if the number of elements found (alerts) is as expected (2 alerts).

### Test 2: Disable Order Button If No Scoops Ordered

### Code

```jsx
test("disable order button if there are no scoops ordered", async () => {
  const user = userEvent.setup();
  render(<OrderEntry setOrderPhase={vi.fn()} />);

  // order button should be disabled at first, even before options load
  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  expect(orderButton).toBeDisabled();

  // expect button to be enabled after adding scoop
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(orderButton).toBeEnabled();

  // expect button to be disabled again after removing scoop
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "0");
  expect(orderButton).toBeDisabled();
});
```

#### Description:

This test ensures that the order button is disabled when no data are added to the order and enabled when scoops are present.

#### Key Methods:

- `userEvent.setup()`: Sets up userEvent for user interaction simulation, sending a simulated operation.
- `render()`: Renders the `OrderEntry` component.
- `screen.getByRole()`: Retrieves an element by its role, in this case it will find the order button.
- `expect().toBeDisabled()`: Asserts that the button is disabled.
- `screen.findByRole()`: Finds an element by its role asyn, it's necessary for input fields that may take time to load or appear.
- `userEvent.clear()`: Clears the input field.
- `userEvent.type()`: Types into the input field to simulate user input.
- `expect().toBeEnabled()`: Asserts that the button is enabled after conditions change.

---

# Test Documentation for Options Component

Functions and methods used on `Options` component, which is responsible for displaying the options to be added into the cart in a React application.

## Test Setup

### Imports

- `render, screen`: Used to render components and perform queries within the tests.
- `userEvent`: Facilitates simulating user interactions with UI elements.

### Component

- `Options`: This component allows users to select scoops and toppings for their ice cream.

## Test Descriptions

### Test 1: Display Images for Each Scoop Option from Server

### Code

```jsx
test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images with await to make sure they load and avoid error
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
```

#### Description:

Tests if the component displays the correct images for each option fetched from the server.

#### Key Methods:

- `render()`: Renders the `Options` component with `optionType` set to "scoops".
- `screen.findAllByRole()`: Asynchronously finds all images that represent scoops.
- `expect().toHaveLength()`: Ensures the correct number of scoop images is displayed.
- `map()`: Extracts the `alt` text from each image to check if they match expected descriptions.

### Test 2: Display Images for Each Toppings Option from Server

### Code

```jsx
test("Displays image for each toppings option from server", async () => {
  // Mock Service Worker will return three toppings from server
  render(<Options optionType="toppings" />);

  // find images, expect 3 based on what msw returns
  const images = await screen.findAllByRole("img", { name: /topping$/i });
  expect(images).toHaveLength(3);

  // check the actual alt text for the images
  // @ts-ignore
  const imageTitles = images.map((img) => img.alt);
  expect(imageTitles).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
```

#### Description:

Verifies that all expected topping images are displayed correctly according to data fetched from the server.

#### Key Methods:

- `render()`: Renders the `Options` component with `optionType` set to "toppings".
- `screen.findAllByRole()`: Retrieves images asynchronously, filtering by role and name pattern.
- `expect().toEqual()`: Checks if the `alt` text of images matches the expected list of topping names.

### Test 3: Don't Update Total If Scoops Input Is Invalid

### Code

```jsx
test("don't update total if scoops input is invalid", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // wait for the vanillaInput to appear after the server call
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  // find the scoops subtotal, which starts out at 0
  const scoopsSubtotal = screen.getByText("Scoops total: $0.00");

  // clear the input
  await user.clear(vanillaInput);

  // .type() will type one character at a time
  await user.type(vanillaInput, "2.5");

  // make sure scoops subtotal hasn't updated
  expect(scoopsSubtotal).toHaveTextContent("$0.00");

  // do the same test for "100"
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "100");
  expect(scoopsSubtotal).toHaveTextContent("$0.00");

  // do the same test for "-1"
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(scoopsSubtotal).toHaveTextContent("$0.00");
});
```

#### Description:

Ensures that the total cost for scoops does not update when invalid inputs are entered.

#### Key Methods:

- `userEvent.setup()`: Prepares `userEvent` for simulating user interactions.
- `screen.findByRole()`: Finds a specific input field in a async mode.
- `userEvent.clear()`: Clears the content of the input field.
- `userEvent.type()`: Simulates typing into an input field.
- `expect().toHaveTextContent()`: Asserts that the text content of an element matches the expected subtotal, which should not change on invalid input.

---

# Test Documentation for ScoopOption Component

This document outlines the tests performed on the `ScoopOption` component within a React application.

## Test Setup

### Imports

- `render, screen`: Render components and perform queries within the tests.
- `userEvent`: Simulate real user interactions with the DOM.

### Component

- `ScoopOption`: This component represents an individual option for ice cream scoops, allowing users to input the desired quantity.

## Test Description

### Test: Indicate if Scoop Count is Non-Integer or Out of Range

### Code

```jsx
test("indicate if scoop count is non-int or out of range", async () => {
  const user = userEvent.setup();
  render(<ScoopOption />);

  // expect input to be invalid with negative number
  const vanillaInput = screen.getByRole("spinbutton");
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  // replace with decimal input
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  // replace with input that's too high
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  // replace with valid input
  // note: here we're testing our validation rules (namely that the input can display as valid)
  // and not react-bootstrap's response
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "3");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
```

#### Description:

This test validates non-integer, out of range, and valid inputs by indicating validation errors or acceptance via CSS classes.

#### Key Methods:

- `userEvent.setup()`: Sets up the `userEvent` library to simulate user actions.
- `render()`: Renders the `ScoopOption` component into the virtual DOM.
- `screen.getByRole()`: Retrieves the input element for scoop count based on its role as "spinbutton".
- `userEvent.clear()`: Clears any existing input in the field.
- `userEvent.type()`: Simulates typing an input into the field.
- `expect().toHaveClass()`: Asserts whether the input field has the specified CSS class indicating an invalid input.
- `expect().not.toHaveClass()`: Asserts that the input does not have the 'is-invalid' class, indicating the input is valid.

#### Scenarios Tested:

- **Negative Number**: Inputs a negative number to test if the input is marked as invalid.
- **Decimal Input**: Enters a decimal value to check if non-integer values are considered invalid.
- **Out of Range (Too High)**: Tests an excessively high number to see if the input properly catches values outside the allowable range.
- **Valid Input**: Finally, a valid integer within the acceptable range is inputted to ensure it is marked as valid.

---

# Test Documentation for OrderEntry and Options Components

This document provides detailed explanations of the testing procedures for the `OrderEntry` and `Options` components using Jest and React Testing Library. These tests ensure the proper functionality of subtotal and total calculations based on user interactions with the application.

## Test Setup

### Imports

- `render, screen`: These functions from `../../../test-utils/testing-library-utils` are used to render components and perform queries within the tests.
- `userEvent`: Imported from `@testing-library/user-event` to simulate user interactions such as typing and clicking.

### Components

- `Options`: Used for selecting ice cream scoops and toppings.
- `OrderEntry`: Manages the overall ordering process, including displaying totals.

## Test Descriptions

### Scoops and Toppings Subtotal Tests

#### Scoop Subtotal Update

### Code

```jsx
test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});
```

- **Objective**: Ensure the scoop subtotal updates correctly when the number of scoops is changed.
- **Key Methods**:
  - `screen.getByText()`: Retrieves text elements containing subtotal information.
  - `screen.findByRole()`: Finds input fields and buttons asynchronously, which is necessary for elements that might take time to load.
  - `userEvent.clear()` and `userEvent.type()`: Clear the existing value and type a new value into the input fields.

#### Toppings Subtotal Update

### Code

```jsx
test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // make sure total starts out at $0.00
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

  // add cherries and check subtotal
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");

  // add hot fudge and check subtotal
  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: "Hot fudge" });
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("3.00");

  // remove hot fudge and check subtotal
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");
});
```

- **Objective**: Validate that the toppings subtotal updates correctly as toppings are added or removed.
- **Key Methods**:
  - `screen.getByRole()`: Retrieves checkbox elements for toppings to simulate user interaction with these elements.

### Grand Total Tests

- Unitary tests for the grand total calculation based on the scoops and toppings selected.

### Code

```jsx
describe("grand total", () => {});
```

#### Initial Grand Total

### Code

```jsx
test("grand total starts at $0.00", () => {
  const { unmount } = render(<OrderEntry />);
  const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
  expect(grandTotal).toHaveTextContent("0.00");
  unmount();
});
```

- **Objective**: Confirm that the grand total starts at $0.00 when the page loads.
- **Method**: `screen.getByRole()` to retrieve the heading element containing the grand total.

#### Grand Total Update on Scoop/Topping Addition

### Code

```jsx
test("grand total updates properly if scoop is added first", async () => {
  const user = userEvent.setup();

  // Test that the total starts out at $0.00
  render(<OrderEntry />);
  const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
  expect(grandTotal).toHaveTextContent("0.00");

  // update vanilla scoops to 2 and check grand total
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");
  expect(grandTotal).toHaveTextContent("4.00");

  // add cherries and check grand total
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(grandTotal).toHaveTextContent("5.50");
});

test("grand total updates properly if topping is added first", async () => {
  const user = userEvent.setup();
  render(<OrderEntry />);
  const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });

  // add cherries and check grand total
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(grandTotal).toHaveTextContent("1.50");

  // update vanilla scoops to 2 and check grand total
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");
  expect(grandTotal).toHaveTextContent("5.50");
});
```

- **Objective**: Check that the grand total updates correctly whether scoops or toppings are added first.
- **Scenarios**:
  - Adding scoops before toppings and vice versa.
  - Removing items and observing the total adjustment.

#### Removing Items and Total Update

### Code

```jsx
  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    // add cherries
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    // grand total $1.50

    // update vanilla scoops to 2; grand total should be $5.50
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    // remove 1 scoop of vanilla and check grand total
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    // check grand total
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("3.50");

    // remove cherries and check grand total
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
```

- **Objective**: Ensure that the grand total is correctly adjusted when items are removed from the order.
- **Key Methods**:
  - `userEvent.click()`: Simulates clicks on checkboxes and input fields to add or remove scoops/toppings.
  - `expect().toHaveTextContent()`: Asserts the expected grand total at various stages of the order.
