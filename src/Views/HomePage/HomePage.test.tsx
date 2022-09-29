import { fireEvent, screen, render, waitFor } from "@testing-library/react";

import * as React from "react";

import { HomePage } from "./HomePage";
import { Provider } from "react-redux";
import { RenderResult } from "@testing-library/react";
import { store } from "../../Store";

const renderStore = (): RenderResult =>
  render(
    <Provider store={store}>
      <HomePage />
    </Provider>
  );

test("handling the start function", () => {
  renderStore();
  expect(screen.getByTitle("start")).toBeInTheDocument();
});
