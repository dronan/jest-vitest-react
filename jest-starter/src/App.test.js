import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("button click flow", () => {
  // render the app
  render(<App />);

  // find the button
  const btn = screen.getByRole("button", { name: /blue/i });

  // check the initial state
  expect(btn).toHaveClass("red");

  // click event
  fireEvent.click(btn);

  // check the button text
  expect(btn).toHaveTextContent(/red/i);

  // check the button class
  expect(btn).toHaveClass("blue");
});
