import { describe, expect, it, vi } from 'vitest';
import type { State, AppDispatch } from '@types';

const useDispatchMock = vi.fn();
const useSelectorMock = vi.fn<[unknown], unknown>();

vi.mock('react-redux', () => ({
  useDispatch: () => useDispatchMock,
  useSelector: (selector: unknown) => useSelectorMock(selector),
}));

describe('Hooks: dispatch helpers', () => {
  it('UseAppDispatch should return dispatch function', async () => {
    const { useAppDispatch } = await import('./dispatch');
    const dispatch = useAppDispatch();
    expect(dispatch).toBe(useDispatchMock as unknown as AppDispatch);
  });

  it('UseAppSelector should pass selector to useSelector', async () => {
    const { useAppSelector } = await import('./dispatch');

    const selector = (state: State) => state;
    useAppSelector(selector);

    expect(useSelectorMock).toHaveBeenCalledTimes(1);
    expect(useSelectorMock).toHaveBeenCalledWith(selector);
  });
});
