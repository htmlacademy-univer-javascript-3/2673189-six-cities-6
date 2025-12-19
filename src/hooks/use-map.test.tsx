import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { MutableRefObject } from 'react';

import useMap from './use-map';
import type { City } from '@types';

const addLayerMock = vi.fn();
const setViewMock = vi.fn();

const mapConstructorMock = vi.fn();

vi.mock('leaflet', () => {
  class Map {
    public addLayer = addLayerMock;
    public setView = setViewMock;

    constructor(container: HTMLElement, options: unknown) {
      mapConstructorMock(container, options);
    }
  }

  class TileLayer {
    constructor() {}
  }

  return { Map, TileLayer };
});

describe('hook: useMap', () => {
  beforeEach(() => {
    addLayerMock.mockClear();
    setViewMock.mockClear();
    mapConstructorMock.mockClear();
  });

  it('Should create map instance once and add tile layer', () => {
    const mapDiv = document.createElement('div');
    const mapRef = { current: mapDiv } as MutableRefObject<HTMLElement | null>;

    const city: City = {
      name: 'Paris',
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
    };

    const { result, rerender } = renderHook(
      ({ currentCity }: { currentCity: City }) => useMap(mapRef, currentCity),
      { initialProps: { currentCity: city } }
    );

    expect(result.current).not.toBeNull();

    expect(mapConstructorMock).toHaveBeenCalledTimes(1);
    expect(mapConstructorMock).toHaveBeenCalledWith(
      mapDiv,
      expect.objectContaining({
        center: { lat: city.location.latitude, lng: city.location.longitude },
        zoom: city.location.zoom,
      })
    );

    expect(addLayerMock).toHaveBeenCalledTimes(1);

    rerender({ currentCity: city });
    expect(mapConstructorMock).toHaveBeenCalledTimes(1);
    expect(addLayerMock).toHaveBeenCalledTimes(1);
  });

  it('Should call setView when city changes (after map is created)', () => {
    const mapDiv = document.createElement('div');
    const mapRef = { current: mapDiv } as MutableRefObject<HTMLElement | null>;

    const city1: City = {
      name: 'Paris',
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
    };

    const city2: City = {
      name: 'Amsterdam',
      location: { latitude: 52.3676, longitude: 4.9041, zoom: 10 },
    };

    const { rerender } = renderHook(
      ({ currentCity }: { currentCity: City }) => useMap(mapRef, currentCity),
      { initialProps: { currentCity: city1 } }
    );

    const setViewCallsAfterInit = setViewMock.mock.calls.length;

    act(() => {
      rerender({ currentCity: city2 });
    });

    expect(setViewMock.mock.calls.length).toBeGreaterThan(setViewCallsAfterInit);
    expect(setViewMock).toHaveBeenLastCalledWith(
      { lat: city2.location.latitude, lng: city2.location.longitude },
      city2.location.zoom
    );
  });
});
