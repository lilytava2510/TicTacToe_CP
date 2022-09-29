import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IBoard } from '../Interfaces/IBoard'
import axios from 'axios'

export interface BoardState {
  loading: boolean,
  error: boolean,
  board?: IBoard,
  // game?: IBoard[]
}

const initialBoardState: BoardState = {
  loading: false,
  error: false,
 
}

export const createBoard = createAsyncThunk(
    'board/start',
    async (thunkAPI) => {
        try{
            const res = await axios.get('http://localhost:8080/board/start');
            console.log(res.data);
            return res.data;
        }catch(e){
            console.log(e);
        }
    }
)

export type  playTrunInfo = {
  id?: number,
  x?: number,
  move?: number
}

export const playTurn = createAsyncThunk(
  'board/playTurn',
  async (info:playTrunInfo,thunkAPI) => {
    try{
      const res = await axios.post(`http://localhost:8080/board/play?id=${info.id}&x=${info.x}&move=${info.move}`);
      console.log(res.data);
      return res.data;
    }catch(e){
      console.log(e)
    }
  }
) 

export const boardReset = createAsyncThunk(
  'board/reset',
  async (id: number | undefined ,thunkAPI) => {
    try{
      const res = await axios.get(`http://localhost:8080/board/reset?id=${id}`);
      console.log(res.data);
      return res.data;
    }catch(e){
      console.log(e)
    }
  }
) 

export const playMulti = createAsyncThunk(
  'board/playMulti',
  async (info:playTrunInfo,thunkAPI) => {
    try{
      const res = await axios.post(`http://localhost:8080/board/play-multi?id=${info.id}&x=${info.x}&move=${info.move}`);
      console.log(res.data);
      return res.data;
    }catch(e){
      console.log(e)
    }
  }
) 

export const joinGame = createAsyncThunk(
  'board/joinGame',
  async (id: any, thunkAPI) => {
    try{
      const res = await axios.post(`http://localhost:8080/board/join-game?id=${id}`);
      console.log(res.data);
      return res.data;
    }catch(e){
      console.log(e)
    }
  }
) 

// export const allGames = createAsyncThunk(
//   'board/allGames',
//   async (thunkAPI) => {
//       try{
//           const res = await axios.get('http://localhost:8080/board/all-games');
//           console.log(res.data);
//           return res.data;
//       }catch(e){
//           console.log(e);
//       }
//   }
// )

export const boardSlice = createSlice({
  name: 'board',
  initialState: initialBoardState,
  reducers: {
    toggleError: (state) => {
      state.error = !state.error;
    },
    clearBoard: (state) => {
      state.board = undefined;
    }
  },
  extraReducers: (builder) => {
    //create board
    builder.addCase(createBoard.pending, (state, action)=>{
        state.loading = true;
    });
    builder.addCase(createBoard.fulfilled, (state, action)=> {
        state.board = action.payload;
        state.error = false;
        state.loading = false;
    })
    builder.addCase(createBoard.rejected,(state,action)=> {
        state.error = true;
        state.loading = false;
    })
    //play turn
    builder.addCase(playTurn.pending, (state, action)=>{
      state.loading = true;
    });
    builder.addCase(playTurn.fulfilled, (state, action)=> {
        state.board = action.payload;
        state.error = false;
        state.loading = false;
    })
    builder.addCase(playTurn.rejected,(state,action)=> {
        state.error = true;
        state.loading = false;
    })
    // board Reset
    builder.addCase(boardReset.pending, (state, action)=>{
      state.loading = true;
    });
    builder.addCase(boardReset.fulfilled, (state, action)=> {
        state.board = action.payload;
        state.error = false;
        state.loading = false;
    })
    builder.addCase(boardReset.rejected,(state,action)=> {
        state.error = true;
        state.loading = false;
    })
    // board play multi
    builder.addCase(playMulti.pending, (state, action)=>{
      state.loading = true;
    });
    builder.addCase(playMulti.fulfilled, (state, action)=> {
        state.board = action.payload;
        state.error = false;
        state.loading = false;
    })
    builder.addCase(playMulti.rejected,(state,action)=> {
        state.error = true;
        state.loading = false;
    })
    // board join game
    builder.addCase(joinGame.pending, (state, action)=>{
      state.loading = true;
    });
    builder.addCase(joinGame.fulfilled, (state, action)=> {
        state.board = action.payload;
        state.error = false;
        state.loading = false;
    })
    builder.addCase(joinGame.rejected,(state,action)=> {
        state.error = true;
        state.loading = false;
    })
    // board all games
    // builder.addCase(allGames.pending, (state, action)=>{
    //   state.loading = true;
    // });
    // builder.addCase(allGames.fulfilled, (state, action)=> {
    //     state.game = action.payload;
    //     state.error = false;
    //     state.loading = false;
    // })
    // builder.addCase(allGames.rejected,(state,action)=> {
    //     state.error = true;
    //     state.loading = false;
    // })
  }
})

// Action creators are generated for each case reducer function
export const { toggleError, clearBoard } = boardSlice.actions

export default boardSlice.reducer