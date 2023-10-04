import {useCallback, useEffect, useReducer} from 'react';
import {camelCase, capitalize} from 'lodash';

type RequestFunction<Data> = (values: Data) => Promise<TResponse>

interface IValidResponse {
    data: any;
}

interface IState {
    Response: Record<string, any> | null
    Error: unknown | null,
    Loading: boolean,
    Statuscode: null | number
}

interface ISuffixes<Data> extends IState {
    Request: RequestFunction<Data>,
    Response: Record<string, any> | null
    Error: Record<string, any> | null,
    Loading: boolean,
    Statuscode: null | number
}

type TResponse = IValidResponse | unknown;
type returnType<Data extends object, T extends string> = {[P in keyof ReturnType<typeof suffixes<P>> & string as `${T}${P}`]: ReturnType<typeof suffixes<Data>>[P] };

const formatKey = (functionName: string, keyName: string) =>
    `${camelCase(functionName)}${capitalize(keyName)}`;

const suffixes = <T>(): ISuffixes<T> => ({
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
export const useRequest = <Data extends object = {}, Name extends string = ''>(
    func: RequestFunction<Data>,
    name: Name
) => {
    if (!name) throw new Error('Function name not found, please pass the function name as the 2nd argument')
    const [state, dispatch] = useReducer(reducer, {
        Loading: false,
        Response: null,
        Statuscode: null,
        Error: null,
    })

    const resetState = () => dispatch({type: EAction.reset})

    const doRequest = useCallback(
        (_data: Data) => {
            resetState();
            dispatch({type: EAction.loadingStart})
            return func(_data)
                .then((e) =>
                    dispatch({
                        type: EAction.handleResponse,
                        value: {
                            Response: (e as IValidResponse).data || true,
                            Loading: false,
                            Statuscode: 200,
                            Error: null
                        }
                    })
                )
                .catch((e) =>
                    dispatch({
                        type: EAction.handleResponse,
                        value: {
                            Response: null,
                            Loading: false,
                            Statuscode: e?.response?.status || 500,
                            Error: e?.response?.data || e
                        }
                    })
                );
        },
        [func]
    );

    useEffect(() => {
        resetState();
        dispatch({type: EAction.loadingStop})
        return () => {
            resetState();
            dispatch({type: EAction.loadingStop})
        };
    }, []);

    return {
        [formatKey(name, 'request')]: doRequest,
        [formatKey(name, 'response')]: state.Response,
        [formatKey(name, 'error')]: state.Error,
        [formatKey(name, 'loading')]: state.Loading,
        [formatKey(name, 'statuscode')]: state.Statuscode,
    } as returnType<Data, Name>
};
