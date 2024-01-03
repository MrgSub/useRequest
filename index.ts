import {useCallback, useEffect, useReducer} from 'react';
import {camelCase, capitalize} from 'lodash';
import {EGlobalActions, useRequestContext} from "./global";
import {AxiosError} from 'axios'

type RequestFunction<RequestData, ResponseData extends object = {}> = (values: RequestData) => Promise<TResponse<ResponseData>>

interface IValidResponse<Data> {
    data: Data;
}

interface IState {
    Response: Record<string, any> | null
    Error: unknown | null,
    Loading: boolean,
    Statuscode: null | number
}

interface ISuffixes<Data, R extends object> extends IState {
    Request: RequestFunction<Data, R>,
    Response: R | Record<string, any> | null
    Error: Record<string, any> | null,
    Loading: boolean,
    Statuscode: null | number
}

type TResponse<Data> = IValidResponse<Data> | unknown;
type returnType<Data extends object, T extends string, R extends object> = {[P in keyof ReturnType<typeof suffixes<P, R>> & string as `${T}${P}`]: ReturnType<typeof suffixes<Data, R>>[P] };

const formatKey = (functionName: string, keyName: string) =>
    `${camelCase(functionName)}${capitalize(keyName)}`;

const suffixes = <T, R extends object>(): ISuffixes<T, R> => ({
    Request: async () => null,
    Response: null,
    Error: null,
    Loading: false,
    Statuscode: null,
} as const);

enum EAction {
    'reset' = 'reset',
    'loadingStart' = 'loadingStart',
    'loadingStop' = 'loadingStop',
    'handleResponse' = 'handleResponse'
}

const reducer = (state: IState, action: {type: EAction, value?: Record<keyof IState, any>}):IState => {
    switch (action.type) {
        case EAction.handleResponse:
            return {
                ...state,
                Error: action.value?.Error,
                Response: action.value?.Response,
                Statuscode: action.value?.Statuscode,
                Loading: action.value?.Loading
            };
        case EAction.reset:
            return {
                ...state,
                Error: null,
                Response: null,
                Statuscode: null
            };
        case EAction.loadingStart:
            return {
                ...state,
                Loading: true,
            };
        case EAction.loadingStop:
            return {
                ...state,
                Loading: false,
            };
        default:
            throw new Error();
    }
}

/**
 * Special recipe for lazy
 * @example name = handleLogin -> {
 *     ${func}Response, example: handleLoginResponse
 *     ${func}Request,
 *     ${func}Loading
 *     ${func}Error
 *     ${func}StatusCode
 * }
 * @param func
 * @param name
 */
export const useRequest = <Name extends string = '', RequestData extends object = {}, ResponseData extends object = {}>(
    func: RequestFunction<RequestData, ResponseData>,
    name: Name
) => {
    if (!name) throw new Error('Function name not found, please pass the function name as the 2nd argument')
    const [state, dispatch] = useReducer(reducer, {
        Loading: false,
        Response: null,
        Statuscode: null,
        Error: null,
    })
    const { dispatch: globalDispatch, loading, error } = useRequestContext()

    const resetState = () => dispatch({type: EAction.reset})

    const doRequest = useCallback(
        async (_data: RequestData) => {
            resetState();
            dispatch({type: EAction.loadingStart})
            try {
                const exec = await func(_data);
                return dispatch({
                    type: EAction.handleResponse,
                    value: {
                        Response: (exec as IValidResponse<ResponseData>).data || true,
                        Loading: false,
                        Statuscode: 200,
                        Error: null
                    }
                });
            } catch (error) {
                return dispatch({
                    type: EAction.handleResponse,
                    value: {
                        Response: null,
                        Loading: false,
                        Statuscode: error?.response?.status || 500,
                        Error: error?.response?.data || error
                    }
                });
            }
        },
        [func]
    );

    useEffect(() => {
        if (globalDispatch) globalDispatch({type: EGlobalActions.ADD_REQUEST, request: name})
        resetState();
        dispatch({type: EAction.loadingStop})
        return () => {
            resetState();
            dispatch({type: EAction.loadingStop})
        };
    }, []);

    const isForcedLoading = useCallback(() => {
        if (!loading) return false
        return loading.some(e=>e === name)
    }, [loading]);

    const isForcedError = useCallback(() => {
        if (!error) return false
        return error.some(e=>e === name)
    }, [error]);

    return {
        [formatKey(name, 'request')]: doRequest,
        [formatKey(name, 'response')]: state.Response,
        [formatKey(name, 'error')]: isForcedError() ? new AxiosError('Generic error from @ajxb/useRequest', '400') : state.Error,
        [formatKey(name, 'loading')]: isForcedLoading() ?? state.Loading,
        [formatKey(name, 'statuscode')]: state.Statuscode,
    } as returnType<RequestData, Name, ResponseData>
};
