import { store } from "../lib/store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface AppThunkConfig {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue?: string;
    extra?: unknown;
}
