import * as React from "react";
import { render, screen } from "@testing-library/react";
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

describe("app has component", () => {
  it("should render App", () => {
    renderStore();
    const contentDiv = screen.getByTitle("content");

    expect(contentDiv).toBeInTheDocument();
  });
});
