import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { kebabCaseToTitleCase } from "./helpers";

test("button click flow", () => {
  // render the app
  render(<App />);

  // find the button
  const btn = screen.getByRole("button", { name: /blue/i });

  // check the initial state
  expect(btn).toHaveClass("medium-violet-red");

  // click event
  fireEvent.click(btn);

  // check the button text
  expect(btn).toHaveTextContent(/red/i);

  // check the button class
  expect(btn).toHaveClass("midnight-blue");
});

test("checkbox click flow", () => {
  // render the app
  render(<App />);

  // find the button
  const btn = screen.getByRole("button", { name: /blue/i });
  // find the checkbox
  const checkbox = screen.getByRole("checkbox", { name: /disable button/i });

  // check the initial state
  expect(btn).toBeEnabled();
  expect(checkbox).not.toBeChecked();

  // click event
  fireEvent.click(checkbox);

  // check the button state
  expect(btn).not.toBeEnabled();

  // click event
  fireEvent.click(checkbox);
  expect(btn).toBeEnabled();
});

test("button click flow", () => {
  // render the app
  render(<App />);

  // find the button
  const btn = screen.getByRole("button", { name: /blue/i });
  // find the checkbox
  const checkbox = screen.getByRole("checkbox", { name: /disable button/i });

  // click event
  fireEvent.click(btn);
  fireEvent.click(checkbox);

  // check the button state
  expect(btn).not.toBeEnabled();
  expect(btn).toHaveClass("gray");

  // click event
  fireEvent.click(checkbox);
  expect(btn).toBeEnabled();
});

describe("kebabCaseToTitleCase", () => {
  test("works for no hypens", () => {
    expect(kebabCaseToTitleCase("red")).toBe("Red");
  });
  test("works for one hypen", () => {
    expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
  });
  test("works for multiple hypens", () => {
    expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
  });

  // // import the function
  // const { kebabCaseToTitleCase } = require("./helpers");

  // test("should convert kebab case to title case", () => {
  //   const colorName = "medium-violet-red";
  //   const result = kebabCaseToTitleCase(colorName);
  //   expect(result).toBe("Medium Violet Red");
  // });
});
