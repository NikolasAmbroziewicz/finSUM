import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { useLocalStorage } from 'src/hooks/useLocalStorage'

import { signUp, singIn, refreshToken } from 'src/features/auth/api/authApi'
import {
  loginSchemaType,
  registerSchemaType
} from 'src/features/auth/validators';

type Store = {
  refreshToken?: string,
  accessToken?: string,
}

interface UserStore {
  user?: {
    email: string
    name: string
    surname: string
  },
  tokens: Store, 
}

const initialState: UserStore = {
  user: undefined,
  tokens: {
    refreshToken: undefined,
    accessToken: undefined,
  },
}

export const signUpUser = createAsyncThunk('user/register', async (data: registerSchemaType) => {
  const { setToLocalStorage } = useLocalStorage()
  
  const res: UserStore = await signUp(data)
  setToLocalStorage('user', res.tokens)

  return res
})

export const signInUser = createAsyncThunk('user/login', async (data: loginSchemaType) => {
  const { setToLocalStorage } = useLocalStorage()

  const res: UserStore = await singIn(data)
  setToLocalStorage('user', res.tokens)

  return res
})

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logOut: (state, action) => {
      state.tokens.accessToken = undefined,
      state.tokens.refreshToken = undefined
    }  
  },
  extraReducers(builder) {
    builder
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.tokens = action.payload.tokens
        state.user = action.payload.user
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.tokens = action.payload.tokens
        state.user = action.payload.user
      })
  }
})

export const { logOut } = userSlice.actions

export const selectCurrentTokens = (state: UserStore) => state.tokens

export const selectCurrentUser = (state: UserStore) => state.user

export default userSlice.reducer