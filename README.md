Udemy Jest Course

- Here we'll have an example based on a Sundae app, an app created using React, with a mocked backend response, to simulate the interactions between the frontend and the backend to test the frontend components.

- The app has a few components, such as the App component, which orchestrates the entire ice cream ordering process, the OrderConfirmation component, which handles the final confirmation step of placing an order, and the SummaryForm component, which handles user interactions related to finalizing an order, including terms and conditions acceptance.

- The tests are written using Jest and React Testing Library, with the help of Mock Service Worker (MSW) to mock network responses.

- The tests are divided into different sections, each focusing on a specific component or feature of the app. For example, the tests for the App component focus on testing the order phases for the happy path, while the tests for the SummaryForm component focus on verifying the initial conditions and interactions with the checkbox and confirm button.

- You can find a README.md file in each test directory that provides an overview of the tests, including the setup, imports, components being tested, test descriptions, and key methods used in the tests.

---

A resume of the key methods used in the tests:

render(): This method render a component onto the page so we can test it. It's like mounting a component in a real browser.

screen.getByRole(): Finds an element by its role (button, checkbox or any other). It helps us find elements like the users would find them.

screen.findByRole(): Similar to getByRole, but it waits for the element to appear. It's used with async operations. This is helpful for testing elements that might take some time to show up due to data loading or animations.

screen.queryByRole(): Looks for an element by its role, but if it doesn’t find anything, it doesn’t throw an error; it just returns null. This is great for checking that something is not on the page.

screen.getByText(), screen.findByText(): These methods look for elements that contain certain text. getByText retrieves it immediately, while findByText waits for it to appear or change.

expect().not.toBeInTheDocument(): Checks if an element isn't exists on the page.

expect().toBeInTheDocument(): Check if an element is actually on the page.

expect().toHaveTextContent(): Check if an element contains specific text. It's useful for validate the content of elements to ensure they say what they should.

expect().toBeDisabled(), expect().toBeEnabled(): These check whether elements like buttons are disabled or enabled.

userEvent.setup(): Prepares to simulate user actions like clicking, typing, etc. It creates a user-like experience in tests, allowing us to act like some user would interact with the component.

userEvent.click(): Simulates a click by a user, like clicking a button or a checkbox.

userEvent.type(): Simulates typing into an input field. This helps test how input fields react to users typing into them.

userEvent.hover(), userEvent.unhover(): These simulate mouse hovering over elements and moving away. Useful for testing how elements like tooltips react when the mouse moves over them.

server.resetHandlers(): Changes the default behavior of the mock server. This lets us test different responses from the server, like simulating an error during a network request.
