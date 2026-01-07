import { RootState } from "src/app/providers/StoreProvider";

export const getConfiguration = (state: RootState) =>
    state.configuratorReducer.configuration;
