import { shallowEqual, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootStateType, AppDispatch } from "./store";

type Selector<T> = (state: RootStateType) => T;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export const useShallowEqualSelector = <T>(selector: Selector<T>): T => {
return useSelector(selector, shallowEqual);
};
