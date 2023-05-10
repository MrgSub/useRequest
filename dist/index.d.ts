interface IValidResponse {
    data: any;
}
interface IState {
    Response: Record<string, any> | null;
    Error: unknown | null;
    Loading: boolean;
    Statuscode: null | number;
}
interface ISuffixes<Data> extends IState {
    Request: (values?: Data) => Promise<TResponse>;
    Response: Record<string, any> | null;
    Error: Record<string, any> | null;
    Loading: boolean;
    Statuscode: null | number;
}
declare type TResponse = IValidResponse | unknown;
declare type returnType<Data extends object, T extends string> = {
    [P in keyof ReturnType<typeof suffixes<P>> & string as `${T}${P}`]: ReturnType<typeof suffixes<Data>>[P];
};
declare const suffixes: <T>() => ISuffixes<T>;
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
export declare const useRequest: <Data extends object, T extends string = "">(func: (values?: Data) => Promise<TResponse>, name: string) => returnType<Data, T>;
export {};
