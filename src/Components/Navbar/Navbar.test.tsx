import { fireEvent, screen, render, waitFor } from "@testing-library/react";

import * as React from "react";
import { Provider } from "react-redux";
import { RenderResult } from "@testing-library/react";
import { store } from "../../Store";
import { Navbar } from "./Navbar";

const renderStore = (): RenderResult =>
  render(
    <Provider store={store}>
      <Navbar />
    </Provider>
  );

test("login button test", () => {
  renderStore();

  const loginBtn = screen.getByTitle("login");

  expect(loginBtn.textContent).toBe("Login");
});

test("testing the logo", () => {
  renderStore();

  const logoImg = screen.getByTitle("img");

  expect(logoImg).toBeInTheDocument();
});
test("testing the head text", () => {
  renderStore();

  const title = screen.getByTitle("header");

  expect(title).toBeInTheDocument();
});
