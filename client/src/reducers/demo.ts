import { addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import config from '../config';
import { AppThunkAction } from '../store';
import { fetchReq } from '../Utils';

export interface DemoState {
    isLoading: boolean;
    Data: any[];
    Item: any;
}

export interface RequestAction {
    type: 'REQUEST_DATA';
}

export interface ReceiveAction {
    type: 'RECEIVE_DATA';
    Data: any[];
}

export interface ReceiveItemAction {
    type: 'RECEIVE_ITEM_DATA';
    Item: any;
}

export type KnownAction = RequestAction | ReceiveAction | ReceiveItemAction;

export const actionCreators = {
    getList: (page?, length?, id?, sorting?): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetchReq(`${config.restUrl}/api/demo/list`, 'GET')
            .then((data) => {
                dispatch({ type: 'RECEIVE_DATA', Data: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_DATA' });
        return fetchTask;
    },
    getItem: (id): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetchReq(`${config.restUrl}/api/demo/item/${id}`, 'GET')
            .then((data) => {
                dispatch({ type: 'RECEIVE_ITEM_DATA', Item: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_DATA' });
        return fetchTask;
    },
    deleteItem: (id): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetchReq(`${config.restUrl}/api/demo/${id}`, 'DELETE')
            .then((data) => {
                dispatch({ type: 'RECEIVE_DATA', Data: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_DATA' });
        return fetchTask;
    },
    updateItem: (id, data): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetchReq(`${config.restUrl}/api/demo/${id}`, 'PUT', { values: data })
            .then((data) => {
                dispatch({ type: 'RECEIVE_DATA', Data: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_DATA' });
        return fetchTask;
    },
    createItem: (data): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetchReq(`${config.restUrl}/api/demo/`, 'POST', { values: data })
            .then((data) => {
                dispatch({ type: 'RECEIVE_DATA', Data: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_DATA' });
        return fetchTask;
    }
};

const unloadedState: DemoState = { Data: [], Item: {}, isLoading: false };

export const reducer: Reducer<DemoState> = (state: DemoState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_DATA':
            return {
                Data: state.Data,
                Item: state.Item,
                isLoading: true
            };
        case 'RECEIVE_DATA':
            return {
                Data: action.Data,
                Item: state.Item,
                isLoading: false
            };
        case 'RECEIVE_ITEM_DATA':
            return {
                Data: state.Data,
                Item: action.Item,
                isLoading: false
            };
    }

    return state || unloadedState;
};
