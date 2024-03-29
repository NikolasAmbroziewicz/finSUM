import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { useIncomeApi } from 'src/features/Income/api/incomeApi';

import { IncomeSchemaType } from 'src/features/Income/validators';

import type { RootState } from '../main';
import { IncomeState } from './types';

export const getIncome = createAsyncThunk(
  'income/getIncome',
  async (date: Date) => {
    const { get_income } = useIncomeApi();

    const res: IncomeSchemaType[] = await get_income(date);

    return res;
  }
);

export const addIncome = createAsyncThunk(
  'income/addIncome',
  async (data: IncomeSchemaType) => {
    const { add_income } = useIncomeApi();

    const res: IncomeSchemaType = await add_income(data);

    return res;
  }
);

export const editIncome = createAsyncThunk(
  'income/editIncome',
  async (data: IncomeSchemaType) => {
    const { edit_income } = useIncomeApi();

    const res: IncomeSchemaType = await edit_income(data);

    return res;
  }
);

export const deleteIncome = createAsyncThunk(
  'income/deleteIncome',
  async (id: number) => {
    const { delete_income } = useIncomeApi();

    const res: IncomeSchemaType = await delete_income(id);

    return res;
  }
);

const initialState: IncomeState = {
  income: [],
  isLoading: false
};

const incomeSlice = createSlice({
  name: 'income',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getIncome.fulfilled, (state, action) => {
        state.income = action.payload;
        state.isLoading = false;
      })
      .addCase(getIncome.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getIncome.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.income.push(action.payload);
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        const newState = state.income.filter(
          (income) => income.id !== action.payload.id
        );
        state.income = newState;
      })
      .addCase(editIncome.fulfilled, (state, action) => {
        const findIndex = state.income.findIndex(
          (income) => income.id === action.payload.id
        );
        state.income[findIndex] = action.payload;
      });
  }
});

export const getAllIncome = (state: RootState) => state.income.income;
export const getLoadingStatus = (state: RootState) => state.income.isLoading;

export default incomeSlice.reducer;
