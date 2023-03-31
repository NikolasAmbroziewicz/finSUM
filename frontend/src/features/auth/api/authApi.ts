import apiBase, { authHeader } from 'src/api/httpCommon';

import {
  loginSchemaType,
  registerSchemaType
} from 'src/features/auth/validators';

import { Tokens } from 'src/store/user/userSlice';

export const signUp = async (data: registerSchemaType) => {
  return apiBase.post('/auth/v1/signup', { ...data }).then((res) => res.data);
};

export const singIn = async (data: loginSchemaType) => {
  return apiBase.post('/auth/v1/signin', { ...data }).then((res) => res.data);
};

export const refreshToken = async (tokens: Tokens) => {
  return apiBase.get('/auth/v1/refresh_tokens', {
      headers: {
        ...authHeader(tokens)
      }
    })
    .then((res) => res.data);
};