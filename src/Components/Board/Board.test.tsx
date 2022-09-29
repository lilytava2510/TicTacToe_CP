import {
  fireEvent,
  screen,
  render,
  waitFor,
  queryByAltText,
  queryByText,
  getByRole,
  getByTitle,
  getByTestId,
} from "@testing-library/react";
import * as React from "react";
import axios from "axios";
import { Board } from "./Board";
import { Circle } from "./Circle";
import { Line } from "./Line";
import { Provider } from "react-redux";
import { RenderResult } from "@testing-library/react";
import { store } from "../../Store";
import { useDispatch, useSelector } from "react-redux";
import { BoardState } from "../../Slices/BoardSlice";
import boardReducer, { playTurn } from "../../Slices/BoardSlice";

const renderStore = (): RenderResult =>
  render(
    <Provider store={store}>
      <Board />
    </Provider>
  );

const renderCircle = (): RenderResult =>
  render(
    <Provider store={store}>
      <Circle name={"1"} />
    </Provider>
  );

const renderLine = (): RenderResult =>
  render(
    <Provider store={store}>
      <Line name={"1"} />
    </Provider>
  );

test("handling the turns", () => {
  renderStore();
  const handlePlaydiv = screen.getByTitle("box");
  expect(screen.getByTitle("box")).toBeInTheDocument();
});
test("reset button test for text", () => {
  renderStore();

  const resetBtn = screen.getByTitle("reset");

  expect(resetBtn.textContent).toBe("Reset");
});

describe("handlePlay", () => {
  it("should make a call to handlePlay function", async () => {
    const initalState: BoardState = {
      loading: false,
      error: false,
      board: {
        id: 1,
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0,
        seven: 0,
        eight: 0,
        nine: 0,
        gameOver1: false,
        gameOver2: false,
      },
    };
    const handlePlay = jest.fn();
    renderStore();

    const btn = screen.getByTitle("btn1");
    fireEvent.click(btn);

    let info = {
      id: 1,
      x: 1,
      move: 1,
    };

    await store.dispatch(playTurn(info));
    expect(store.getState().board.error).toEqual(false);
  });
});
