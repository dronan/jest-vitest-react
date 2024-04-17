# Jest Course "OKR Project"

## Description

Here we'll have an example based on a Sundae app, an app created using React, with a mocked backend response, to simulate the interactions between the frontend and the backend to test the frontend components.

The tests are written using Jest and React Testing Library, with the help of Mock Service Worker (MSW) to mock network responses.

You can find README.md files in each test directory (list bellow) that provides an overview of the tests, including the setup, imports, components being tested, test descriptions, and key methods used in the tests.

## Test Directories

- [Confirmation Tests](/sundae-starter/src/pages/confirmation/tests/README.md)
- [Entry Tests](/sundae-starter/src/pages/entry/tests/README.md)
- [Summary Tests](/sundae-starter/src/pages/summary/tests/README.md)
- [General Tests](/sundae-starter/src/tests/README.md)

---

## Key methods used in the tests:

**_render():_** This method render a component onto the page so we can test it. It's like mounting a component in a real browser.

**_screen.getByRole()_**: Finds an element by its role (button, checkbox or any other). It helps us find elements like the users would find them.

**_screen.findByRole()_**: Similar to getByRole, but it waits for the element to appear. It's used with async operations. This is helpful for testing elements that might take some time to show up due to data loading or animations.

**_screen.queryByRole()_**: Looks for an element by its role, but if it doesn’t find anything, it doesn’t throw an error; it just returns null. This is great for checking that something is not on the page.

**_screen.getByText()_**, **_screen.findByText()_**: These methods look for elements that contain certain text. getByText retrieves it immediately, while findByText waits for it to appear or change.

**_expect().not.toBeInTheDocument()_**: Checks if an element isn't exists on the page.

**_expect().toBeInTheDocument()_**: Check if an element is actually on the page.

**_expect().toHaveTextContent()_**: Check if an element contains specific text. It's useful for validate the content of elements to ensure they say what they should.

**_expect().toBeDisabled()_**, **_expect().toBeEnabled()_**: These check whether elements like buttons are disabled or enabled.

**_userEvent.setup()_**: Prepares to simulate user actions like clicking, typing, etc. It creates a user-like experience in tests, allowing us to act like some user would interact with the component.

**_userEvent.click()_**: Simulates a click by a user, like clicking a button or a checkbox.

**_userEvent.type()_**: Simulates typing into an input field. This helps test how input fields react to users typing into them.

**_userEvent.hover()_**, **_userEvent.unhover()_**: These simulate mouse hovering over elements and moving away. Useful for testing how elements like tooltips react when the mouse moves over them.

**_server.resetHandlers()_**: Changes the default behavior of the mock server. This lets us test different responses from the server, like simulating an error during a network request.
