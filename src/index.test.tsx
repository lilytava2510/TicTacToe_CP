import { screen, render } from "@testing-library/react";
import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Store";
import { RenderResult } from "@testing-library/react";

const renderStore = (): RenderResult =>
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

describe("index renders correctly", () => {
  it("index should render", () => {
    renderStore();
    const title = screen.getByTitle("Board");
    expect(title).toBeInTheDocument();
  });
});
