declare type RequestFunction<RequestData, ResponseData extends object = {}> = (values: RequestData) => Promise<TResponse<ResponseData>>;
interface IValidResponse<Data> {
    data: Data;
}
interface IState {
    Response: Record<string, any> | null;
    Error: unknown | null;
    Loading: boolean;
    Statuscode: null | number;
}
interface ISuffixes<Data, R extends object> extends IState {
    Request: RequestFunction<Data, R>;
    Response: R | Record<string, any> | null;
    Error: Record<string, any> | null;
    Loading: boolean;
    Statuscode: null | number;
}
declare type TResponse<Data> = IValidResponse<Data> | unknown;
declare type returnType<Data extends object, T extends string, R extends object> = {
    [P in keyof ReturnType<typeof suffixes<P, R>> & string as `${T}${P}`]: ReturnType<typeof suffixes<Data, R>>[P];
};
declare const suffixes: <T, R extends object>() => ISuffixes<T, R>;
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
export declare const useRequest: <Name extends string = "", RequestData extends object = {}, ResponseData extends object = {}>(func: RequestFunction<RequestData, ResponseData>, name: Name) => returnType<RequestData, Name, ResponseData>;
export {};
