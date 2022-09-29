import { fireEvent, screen, render, waitFor } from "@testing-library/react";

import React from "react";

import { Circle } from "./Circle";
import { Provider } from "react-redux";
import { RenderResult } from "@testing-library/react";
import { store } from "../../Store";

const renderStore = (): RenderResult =>
  render(
    <Provider store={store}>
      <Circle name={"1"} />
    </Provider>
  );

test("testing circle prop", () => {
  render(<Circle name={"1"} />);

  const circleProp = screen.getByTitle("circle");

  expect(circleProp.id).toBe("1");
});
