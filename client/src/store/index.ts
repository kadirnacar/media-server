
import { ConfigState, reducer as configReducer } from '../reducers/config';
import { FoldersState, reducer as foldersReducer } from '../reducers/folders';

export interface ApplicationState {
    Config: ConfigState;
    Folders: FoldersState;
}

export const reducers = {
    Config: configReducer,
    Folders: foldersReducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}