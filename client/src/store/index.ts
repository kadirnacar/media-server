
import { DemoState, reducer as demoReducer } from '../reducers/demo';

export interface ApplicationState {
    Demo: DemoState;
}

export const reducers = {
    Demo: demoReducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}