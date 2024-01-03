import {createContext, type ReactNode, useContext, useReducer} from "react";

const initialState: {
    requests: string[],
    loading: string[],
    error: string[],
    dispatch?: any
} = {
    requests: [],
    loading: [],
    error: []
}

const GlobalContext = createContext(initialState)

export enum EGlobalActions {
    ADD_REQUEST = "ADD_REQUEST",
    ADD_LOADING = "ADD_LOADING",
    DEL_LOADING = "DEL_LOADING",
    ADD_ERR = "ADD_ERR",
    DEL_ERR = "DEL_ERR",
}

const reducer = (state: typeof initialState, action: {type: EGlobalActions, request: string}) => {
    switch (action.type) {
        case EGlobalActions.ADD_REQUEST:
            return {
                ...state,
                requests: state.requests.some((e:string)=>e === action.request) ?
                    state.requests : [...state.requests, action.request]
            }
        case EGlobalActions.ADD_LOADING:
            return {
                ...state,
                loading: state.loading.some((e:string)=>e === action.request) ?
                    state.loading : [...state.loading, action.request]
            }
        case EGlobalActions.DEL_LOADING:
            return {
                ...state,
                loading: state.loading.filter(e=>e !== action.request)
            }
        case EGlobalActions.ADD_ERR:
            return {
                ...state,
                error: state.error.some((e:string)=>e === action.request) ?
                    state.error : [...state.error, action.request]
            }
        case EGlobalActions.DEL_ERR:
            return {
                ...state,
                error: state.error.filter(e=>e !== action.request)
            }
        default:
            return state;
    }
};

export const GlobalProvider = ({children}:{children: ReactNode}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addLoading = (request: string) => () => dispatch({type: EGlobalActions.ADD_LOADING, request})
    const delLoading = (request: string) => () => dispatch({type: EGlobalActions.DEL_LOADING, request})
    const addError = (request: string) => () => dispatch({type: EGlobalActions.ADD_ERR, request})
    const delError = (request: string) => () => dispatch({type: EGlobalActions.DEL_ERR, request})

    return <GlobalContext.Provider value={{
        requests: state.requests,
        loading: state.loading,
        error: state.error,
        dispatch
    }}>
        <div style={{position:'absolute', bottom: 0, left: 0, height: 150, width: '100%', background:'gray', border:'2px solid red', boxSizing: 'border-box'}}>
            <div style={{overflow:'auto', textAlign:'left', maxHeight: 125, paddingLeft: 10, border:'1px solid darkgray'}}>
                {state.requests.map((request) => (
                    <div style={{display: 'flex', gap: 10, padding: 10}}>
                        <a style={{fontWeight: '600', textDecoration: 'underline'}}>Request 1</a>
                        <a onClick={!state.loading.includes(request) ? addLoading(request) : delLoading(request)}>Loading: {state.loading.includes(request) ? 'Yes' : 'No'}</a>
                        <a onClick={!state.error.includes(request) ? addError(request) : delError(request)}>Error: {state.error.includes(request) ? 'Yes' : 'No'}</a>
                        <a>Executions: 0 (coming soon)</a>
                    </div>
                ))}
            </div>
        </div>
        {children}
    </GlobalContext.Provider>
}

export const useRequestContext = () => useContext(GlobalContext)
