import { type ReactNode } from "react";
export declare enum EGlobalActions {
    ADD_REQUEST = "ADD_REQUEST",
    ADD_LOADING = "ADD_LOADING",
    DEL_LOADING = "DEL_LOADING",
    ADD_ERR = "ADD_ERR",
    DEL_ERR = "DEL_ERR"
}
export declare const GlobalProvider: ({ children }: {
    children: ReactNode;
}) => JSX.Element;
export declare const useRequestContext: () => {
    requests: string[];
    loading: string[];
    error: string[];
    dispatch?: any;
};
