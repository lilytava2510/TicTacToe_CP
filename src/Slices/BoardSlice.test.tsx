import React from "react";
// import boardReducer, {
//   clearBoard,
//   boardReset,
//   playTurn,
//   createBoard,
//   toggleError,
// } from "./BoardSlice";
// import { RootState, getStoreWithState } from "../Store";
// import axiosMock from "axios";
// import { cleanup } from "@testing-library/react";

// afterEach(cleanup);

// jest.mock("axios");

// describe("board reducer", () => {
//   it("should return the initial state when passed an empty action", () => {
//     const initalState = undefined;
//     const action = { type: " " };
//     const result = boardReducer(initalState, action);
//     expect(result).toEqual({ error: false, loading: false });
//   });
//   it("should trigger toggleError", () => {
//     const initalState = undefined;
//     const action = toggleError();
//     const result = boardReducer(initalState, action);
//     expect(result).toEqual({ error: true, loading: false });
//   });
//   it("should trigger clearBoard", () => {
//     const initalState = undefined;
//     const action = clearBoard();
//     const result = boardReducer(initalState, action);
//     expect(result).toEqual({ board: undefined, error: false, loading: false });
//   });
// });

// describe("create thunks", () => {
//   describe("createBoard w/full redux store", () => {
//     it("should createBoard", async () => {
//       const state: RootState = {
//         board: {
//           loading: false,
//           error: false,
//           board: {
//             id: 1,
//             one: 0,
//             two: 0,
//             three: 0,
//             four: 0,
//             five: 0,
//             six: 0,
//             seven: 0,
//             eight: 0,
//             nine: 0,
//             gameOver1: false,
//             gameOver2: false,
//           },
//         },
//       };
//       const store = getStoreWithState(state);
//       const initalState = undefined;
//       const nextState = boardReducer(
//         initalState,
//         store.dispatch({
//           type: "board/start/rejected",
//           payload: await createBoard(),
//           error: true,
//         })
//       );
//       const rootState = { board: nextState };
//       expect(store.getState().board.loading).toEqual(false);
//       expect(rootState.board.error).toEqual(true);
//     });
//     it("should fail creating board", async () => {
//       const state: RootState = {
//         board: {
//           loading: false,
//           error: true,

//         },
//       };
//       const store = getStoreWithState(state);
//       await store.dispatch(createBoard());
//       expect(store.getState().board.error).toEqual(false);
//     });
//   });
// });

// describe("reset thunks", () => {
//   describe("resetBoard w/full redux store", () => {
//     it("should reset", async () => {
//       const state: RootState = {
//         board: {
//           loading: false,
//           error: false,
//           board: {
//             id: 1,
//             one: 0,
//             two: 0,
//             three: 0,
//             four: 0,
//             five: 0,
//             six: 0,
//             seven: 0,
//             eight: 0,
//             nine: 0,
//             gameOver1: false,
//             gameOver2: false,
//           },
//         },
//       };
//       const store = getStoreWithState(state);
//       const initalState = undefined;
//       const nextState = boardReducer(
//         initalState,
//         store.dispatch({
//           type: "board/reset/rejected",
//           payload: await boardReset(),
//           error: true,
//         })
//       );
//       const rootState = { board: nextState };
//       expect(store.getState().board.loading).toEqual(false);
//       expect(rootState.board.error).toEqual(true);
//     });
//     it("should fail creating board", async () => {
//       const state: RootState = {
//         board: {
//           loading: false,
//           error: true,
//         },
//       };
//       const store = getStoreWithState(state);
//       await store.dispatch(boardReset());
//       expect(store.getState().board.error).toEqual(false);
//     });
//   });
// });

// describe("playTurn thunks", () => {
//   describe("playTurn w/full redux store", () => {
//     it("should make a move", async () => {
//       const state: RootState = {
//         board: {
//           loading: false,
//           error: false,
//           board: {
//             id: 1,
//             one: 1,
//             two: 2,
//             three: 0,
//             four: 0,
//             five: 0,
//             six: 0,
//             seven: 0,
//             eight: 0,
//             nine: 0,
//             gameOver1: false,
//             gameOver2: false,
//           },
//         },
//       };
//       const store = getStoreWithState(state);
//       const initalState = undefined;
//       let info = {
//         id: 1,
//         x: 1,
//         move: 1,
//       };
//       const nextState = boardReducer(
//         initalState,
//         store.dispatch({
//           type: "board/playTurn/rejected",
//           payload: await playTurn(info),
//           error: true,
//         })
//       );
//       const rootState = { board: nextState };
//       expect(store.getState().board.loading).toEqual(false);
//       expect(rootState.board.error).toEqual(true);
//     });
//     it("should fail making a move", async () => {
//       const state: RootState = {
//         board: {
//           loading: false,
//           error: true,
//         },
//       };
//       let info = {
//         id: 1,
//         x: 1,
//         move: 1,
//       };
//       const store = getStoreWithState(state);
//       await store.dispatch(playTurn(info));
//       expect(store.getState().board.error).toEqual(false);
//     });
//   });
// });
