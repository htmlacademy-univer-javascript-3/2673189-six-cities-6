import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '@types';
import { setOffers, requireAuthorization, setOffersDataLoadingStatus, setUser, setOfferById, setNearbyOffers } from '@store/action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthStatus } from '@consts/consts';
import { UserData, User } from '@types';
import type { OfferDto } from '../types/offer-dto.type';
import { adaptOfferToClient } from '@services/offer-adapter';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<OfferDto[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(setOffers(data.map(adaptOfferToClient)));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<User>(APIRoute.Login);
      dispatch(setUser(data));
      dispatch(requireAuthorization(AuthStatus.AUTH));
    } catch {
      dispatch(setUser(null));
      dispatch(requireAuthorization(AuthStatus.NOAUTH));
    }
  },
);

export const loginAction = createAsyncThunk<void, UserData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<User>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(setUser(data));
    dispatch(requireAuthorization(AuthStatus.AUTH));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setUser(null));
    dispatch(requireAuthorization(AuthStatus.NOAUTH));
  },
);

export const fetchOfferByIdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferById',
  async (offerId, {dispatch, extra: api}) => {
    const { data } = await api.get<OfferDto>(`${APIRoute.Offers}/${offerId}`);
    dispatch(setOfferById(adaptOfferToClient(data)));
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (offerId, {dispatch, extra: api}) => {
    const { data } = await api.get<OfferDto[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    dispatch(setNearbyOffers(data.map(adaptOfferToClient).slice(0, 3)));
  },
);
