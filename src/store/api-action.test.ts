import { describe, expect, it } from 'vitest';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from '@store/reducer';
import {
  changeFavoriteStatusAction,
  checkAuthAction,
  fetchFavoritesAction,
  fetchNearbyOffersAction,
  fetchOfferByIdAction,
  fetchOffersAction,
  fetchReviewsByOfferIdAction,
  postReviewAction,
} from '@store/api-action';
import { APIRoute, AuthStatus, NameSpace } from '@consts/consts';
import type { OfferDto } from '@types';

import { makeOffer, makeReview, makeUser } from '@test/mock';
import { setOffers } from '@store/offers-data/offers-data.slice';

type State = ReturnType<typeof rootReducer>;

const makeStore = (api: AxiosInstance) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
  });

describe('Api-action thunks', () => {
  it('FetchOffersAction should load offers into state', async () => {
    const api: AxiosInstance = axios.create();
    const mockApi = new MockAdapter(api);

    const store = makeStore(api);

    const dto: OfferDto[] = [
      {
        id: '1',
        title: 't',
        type: 'apartment',
        price: 1,
        city: {
          name: 'Paris',
          location: { latitude: 1, longitude: 2, zoom: 10 },
        },
        location: { latitude: 1, longitude: 2, zoom: 10 },
        isFavorite: false,
        isPremium: false,
        rating: 4,
        previewImage: 'img/x.jpg',
      } as unknown as OfferDto,
    ];

    mockApi.onGet(APIRoute.Offers).reply(200, dto);

    const result = await store.dispatch(fetchOffersAction());
    expect(result.meta.requestStatus).toBe('fulfilled');

    const state = store.getState() as State;
    expect(state[NameSpace.Offers].isOffersDataLoading).toBe(false);
    expect(state[NameSpace.Offers].offers).toHaveLength(1);
    expect(state[NameSpace.Offers].offers[0].id).toBe('1');
  });

  it('CheckAuthAction success should set user and AUTH', async () => {
    const api: AxiosInstance = axios.create();
    const mockApi = new MockAdapter(api);

    const store = makeStore(api);

    const user = makeUser({ token: 'server-token' });
    mockApi.onGet(APIRoute.Login).reply(200, user);

    await store.dispatch(checkAuthAction());

    const state = store.getState() as State;
    expect(state[NameSpace.User].user?.email).toBe(user.email);
    expect(state[NameSpace.User].authorizationStatus).toBe(AuthStatus.AUTH);
  });

  it('CheckAuthAction fail should set user null and NOAUTH', async () => {
    const api: AxiosInstance = axios.create();
    const mockApi = new MockAdapter(api);

    const store = makeStore(api);

    mockApi.onGet(APIRoute.Login).reply(401);

    await store.dispatch(checkAuthAction());

    const state = store.getState() as State;
    expect(state[NameSpace.User].user).toBeNull();
    expect(state[NameSpace.User].authorizationStatus).toBe(AuthStatus.NOAUTH);
  });

  it('FetchOfferByIdAction success should set offerById', async () => {
    const api: AxiosInstance = axios.create();
    const mockApi = new MockAdapter(api);
    const store = makeStore(api);

    const dto = {
      id: '10',
      title: 'Offer',
      type: 'apartment',
      price: 100,
      city: {
        name: 'Paris',
        location: { latitude: 1, longitude: 2, zoom: 10 },
      },
      location: { latitude: 1, longitude: 2, zoom: 10 },
      isFavorite: false,
      isPremium: false,
      rating: 4,
      previewImage: 'img/x.jpg',
    } as unknown as OfferDto;

    mockApi.onGet(`${APIRoute.Offers}/10`).reply(200, dto);

    const result = await store.dispatch(fetchOfferByIdAction('10'));
    expect(result.meta.requestStatus).toBe('fulfilled');

    const state = store.getState() as State;
    expect(state[NameSpace.Offer].offerById?.id).toBe('10');
  });

  it('FetchOfferByIdAction fail should clear offerById and be rejected', async () => {
    const api: AxiosInstance = axios.create();
    const mockApi = new MockAdapter(api);
    const store = makeStore(api);

    mockApi.onGet(`${APIRoute.Offers}/10`).reply(404);

    const result = await store.dispatch(fetchOfferByIdAction('10'));
    expect(result.meta.requestStatus).toBe('rejected');

    const state = store.getState() as State;
    expect(state[NameSpace.Offer].offerById).toBeNull();
  });

  it('FetchNearbyOffersAction should set max 3 nearby offers', async () => {
    const api: AxiosInstance = axios.create();
    const mockApi = new MockAdapter(api);
    const store = makeStore(api);

    const dto = Array.from({ length: 5 }, (_, idx) =>
      ({
        id: String(idx + 1),
        title: 'Offer',
        type: 'apartment',
        price: 100,
        city: {
          name: 'Paris',
          location: { latitude: 1, longitude: 2, zoom: 10 },
        },
        location: { latitude: 1, longitude: 2, zoom: 10 },
        isFavorite: false,
        isPremium: false,
        rating: 4,
        previewImage: 'img/x.jpg',
      } as unknown as OfferDto)
    );

    mockApi.onGet(`${APIRoute.Offers}/10/nearby`).reply(200, dto);

    await store.dispatch(fetchNearbyOffersAction('10'));

    const state = store.getState() as State;
    expect(state[NameSpace.Offer].nearbyOffers).toHaveLength(3);
  });

  it('FetchReviewsByOfferIdAction success should set reviews and clear error', async () => {
    const api: AxiosInstance = axios.create();
    const mockApi = new MockAdapter(api);
    const store = makeStore(api);

    const reviews = [makeReview({ id: '1' }), makeReview({ id: '2' })];
    mockApi.onGet(`${APIRoute.Comments}/10`).reply(200, reviews);

    await store.dispatch(fetchReviewsByOfferIdAction('10'));

    const state = store.getState() as State;
    expect(state[NameSpace.Reviews].reviews).toEqual(reviews);
    expect(state[NameSpace.App].error).toBeNull();
    expect(state[NameSpace.Reviews].isReviewsLoading).toBe(false);
  });

  it('FetchReviewsByOfferIdAction fail should set empty reviews and error', async () => {
    const api: AxiosInstance = axios.create();
    const mockApi = new MockAdapter(api);
    const store = makeStore(api);

    mockApi.onGet(`${APIRoute.Comments}/10`).reply(500);

    await store.dispatch(fetchReviewsByOfferIdAction('10'));

    const state = store.getState() as State;
    expect(state[NameSpace.Reviews].reviews).toEqual([]);
    expect(state[NameSpace.App].error).toBe('Failed to load reviews.');
    expect(state[NameSpace.Reviews].isReviewsLoading).toBe(false);
  });

  it('PostReviewAction success should get reviews and set them', async () => {
    const api: AxiosInstance = axios.create();
    const mockApi = new MockAdapter(api);
    const store = makeStore(api);

    const reviews = [makeReview({ id: '1' })];
    mockApi.onPost(`${APIRoute.Comments}/10`).reply(200);
    mockApi.onGet(`${APIRoute.Comments}/10`).reply(200, reviews);

    const result = await store.dispatch(postReviewAction({ offerId: '10', comment: 'x', rating: 4 }));

    expect(result.meta.requestStatus).toBe('fulfilled');

    const state = store.getState() as State;
    expect(state[NameSpace.Reviews].reviews).toEqual(reviews);
    expect(state[NameSpace.App].error).toBeNull();
    expect(state[NameSpace.Reviews].isReviewPosting).toBe(false);
  });

  it('PostReviewAction fail should set error and return null', async () => {
    const api: AxiosInstance = axios.create();
    const mockApi = new MockAdapter(api);
    const store = makeStore(api);

    mockApi.onPost(`${APIRoute.Comments}/10`).reply(500);

    const result = await store.dispatch(postReviewAction({ offerId: '10', comment: 'x', rating: 4 }));

    const state = store.getState() as State;
    expect(state[NameSpace.App].error).toBe('Failed to send review. Please try again.');
    expect(state[NameSpace.Reviews].isReviewPosting).toBe(false);
    expect((result as unknown as { payload: unknown }).payload).toBeNull();
  });

  it('ChangeFavoriteStatusAction should update isFavorite in offers list', async () => {
    const api: AxiosInstance = axios.create();
    const mockApi = new MockAdapter(api);

    const store = makeStore(api);

    store.dispatch(setOffers([makeOffer({ id: '1', isFavorite: false })]));

    const dto: OfferDto = {
      id: '1',
      title: 't',
      type: 'apartment',
      price: 1,
      city: {
        name: 'Paris',
        location: { latitude: 1, longitude: 2, zoom: 10 },
      },
      location: { latitude: 1, longitude: 2, zoom: 10 },
      isFavorite: true,
      isPremium: false,
      rating: 4,
      previewImage: 'img/x.jpg',
    };

    mockApi.onPost(`${APIRoute.Favorite}/1/1`).reply(200, dto);

    const result = await store.dispatch(changeFavoriteStatusAction({ offerId: '1', status: 1 }));
    expect(result.meta.requestStatus).toBe('fulfilled');

    const state = store.getState() as State;
    expect(state[NameSpace.Offers].offers[0].isFavorite).toBe(true);
  });

  it('FetchFavoritesAction should sync isFavorite flags with server favorites', async () => {
    const api: AxiosInstance = axios.create();
    const mockApi = new MockAdapter(api);
    const store = makeStore(api);

    store.dispatch(
      setOffers([makeOffer({ id: '1', isFavorite: false }), makeOffer({ id: '2', isFavorite: true })])
    );

    const favoriteServerDto: OfferDto[] = [
      {
        id: '1',
        title: 't',
        type: 'apartment',
        price: 1,
        city: {
          name: 'Paris',
          location: { latitude: 1, longitude: 2, zoom: 10 },
        },
        location: { latitude: 1, longitude: 2, zoom: 10 },
        isFavorite: true,
        isPremium: false,
        rating: 4,
        previewImage: 'img/x.jpg',
      } as unknown as OfferDto,
    ];

    mockApi.onGet(APIRoute.Favorite).reply(200, favoriteServerDto);

    await store.dispatch(fetchFavoritesAction());

    const state = store.getState() as State;
    expect(state[NameSpace.Offers].offers.find((o) => o.id === '1')?.isFavorite).toBe(true);
    expect(state[NameSpace.Offers].offers.find((o) => o.id === '2')?.isFavorite).toBe(false);
  });
});
