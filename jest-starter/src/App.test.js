import { logRoles, render, screen } from "@testing-library/react";
import App from "./App";

test("button has correct initial color", () => {
  const { container } = render(<App />);
  logRoles(container);
  const btn = screen.getByRole("button", { name: /blue/i });
  expect(btn).toHaveClass("red");
});

// test("button has correct initial text", () => {
//   render(<App />);
//   const colorButton = screen.getByRole("button", {
//     name: "Change to Midnight Blue",
//   });
//   expect(colorButton.textContent).toBe("Change to Midnight Blue");
// });

// test("button has correct color after click", () => {
//   render(<App />);
//   const colorButton = screen.getByRole("button", {
//     name: "Change to Midnight Blue",
//   });
//   colorButton.click();
//   expect(colorButton).toHaveStyle({ backgroundColor: "midnight-blue" });
// });

// test("button has correct text after click", () => {
//   render(<App />);
//   const colorButton = screen.getByRole("button", {
//     name: "Change to Midnight Blue",
//   });
//   colorButton.click();
//   expect(colorButton.textContent).toBe("Change to Medium Violet Red");
// });
