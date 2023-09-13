import { createAsyncThunk } from '@reduxjs/toolkit';
import { getGnbListOfAuthWithAllApi } from '../api/authgroup';

export const fetchAuthMappedMenuByThunk = createAsyncThunk(
  'authMappedMenu/fetchAuthMappedMenu',
  async (authId) => {
    const response = await getGnbListOfAuthWithAllApi({ paths: { authId } });
    return response.data;
  }
);