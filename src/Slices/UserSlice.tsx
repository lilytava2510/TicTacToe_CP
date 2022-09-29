import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../Interfaces/IUser";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";

export interface UserState {
  loading: boolean;
  error: boolean;
  user?: IUser;
  token?: string;
  loggedIn: boolean;
}

const initialUserState: UserState = {
  loading: false,
  error: false,
  loggedIn: false,
};
export type register = {
  username: string;
  password: string;
};
export const registerUser = createAsyncThunk(
  "user/register",
  async (credentials: register, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/user/register",
        credentials
      );
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async (credentials: register, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/user/login",
        credentials
      );
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const userInfoLogin = createAsyncThunk(
  "user/Infologin",
  async (credentials: register, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/user/username",
        credentials
      );
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const apiValidateLogin = createAsyncThunk(
  "user/validate",
  async (token: string | null | undefined, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:8080/user/authenticate`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const userLogout = createAsyncThunk(
  "user/logout",
  async (token: string | null | undefined, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:8080/user/logout`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    toggleError: (state) => {
      state.error = !state.error;
    },
    clearUser: (state) => {
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    // user register
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.token = action.payload;
      state.error = false;
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });
    // login user
    builder.addCase(userLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.token = action.payload;
      state.error = false;
      state.loading = false;
      state.loggedIn = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });
    //login with user info
    builder.addCase(userInfoLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userInfoLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = false;
      state.loading = false;
    });
    builder.addCase(userInfoLogin.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(apiValidateLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(apiValidateLogin.fulfilled, (state, action) => {
      state.loggedIn = action.payload;
      state.error = false;
      state.loading = false;
    });
    builder.addCase(apiValidateLogin.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(userLogout.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.loggedIn = false;
      state.error = false;
      state.loading = false;
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const { toggleError } = UserSlice.actions;

export default UserSlice.reducer;
