import { fireEvent, screen, render, waitFor } from "@testing-library/react";

import React from "react";

import { Line } from "./Line";
import { Provider } from "react-redux";
import { RenderResult } from "@testing-library/react";
import { store } from "../../Store";

const renderStore = (): RenderResult =>
  render(
    <Provider store={store}>
      <Line name={"1"} />
    </Provider>
  );

test("testing line prop", () => {
  renderStore();

  const lineProp = screen.getByTitle("line");

  expect(lineProp.id).toBe("1");
});
