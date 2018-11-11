import { addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import config from '../config';
import { AppThunkAction } from '../store';
import { fetchReq } from '../Utils';

export interface ConfigState {
    isLoading: boolean;
    Config: any;
}

export interface RequestAction {
    type: 'REQUEST_DATA';
}

export interface ReceiveAction {
    type: 'RECEIVE_DATA';
    Data: any;
}

export type KnownAction = RequestAction | ReceiveAction;

export const actionCreators = {
    getConfig: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetchReq(`${config.restUrl}/api/config`, 'GET')
            .then((data) => {
                dispatch({ type: 'RECEIVE_DATA', Data: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_DATA' });
        return fetchTask;
    },
    updateItem: (data): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetchReq(`${config.restUrl}/api/config`, 'PUT', { config: data })
            .then((data) => {
                dispatch({ type: 'RECEIVE_DATA', Data: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_DATA' });
        return fetchTask;
    }
};

const unloadedState: ConfigState = { Config: {}, isLoading: false };

export const reducer: Reducer<ConfigState> = (state: ConfigState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_DATA':
            return {
                Config: state.Config,
                isLoading: true
            };
        case 'RECEIVE_DATA':
            return {
                Config: action.Data,
                isLoading: false
            };
    }

    return state || unloadedState;
};
