import { addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import config from '../config';
import { AppThunkAction } from '../store';
import { fetchReq } from '../Utils';

export interface FoldersState {
    isLoading: boolean;
    Data: any;
}

export interface RequestAction {
    type: 'REQUEST_FOLDERS';
}

export interface ReceiveAction {
    type: 'RECEIVE_FOLDERS';
    Data: any;
}

export type KnownAction = RequestAction | ReceiveAction;

export const actionCreators = {
    getFolders: (folder): AppThunkAction<KnownAction> => (dispatch, getState) => {
        console.log(folder);
        let fetchTask = fetchReq(`${config.restUrl}/api/folders/path${folder ? "/"+folder : ""}`, 'GET')
            .then((data) => {
                dispatch({ type: 'RECEIVE_FOLDERS', Data: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_FOLDERS' });
        return fetchTask;
    },
    updateItem: (data): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetchReq(`${config.restUrl}/api/folders`, 'PUT', { data: data })
            .then((data) => {
                dispatch({ type: 'RECEIVE_FOLDERS', Data: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_FOLDERS' });
        return fetchTask;
    }
};

const unloadedState: FoldersState = { Data: {}, isLoading: false };

export const reducer: Reducer<FoldersState> = (state: FoldersState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_FOLDERS':
            return {
                Data: state.Data,
                isLoading: true
            };
        case 'RECEIVE_FOLDERS':
            return {
                Data: action.Data,
                isLoading: false
            };
    }

    return state || unloadedState;
};
