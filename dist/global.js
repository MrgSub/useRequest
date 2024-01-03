"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRequestContext = exports.GlobalProvider = exports.EGlobalActions = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var initialState = {
    requests: [],
    loading: [],
    error: []
};
var GlobalContext = (0, react_1.createContext)(initialState);
var EGlobalActions;
(function (EGlobalActions) {
    EGlobalActions["ADD_REQUEST"] = "ADD_REQUEST";
    EGlobalActions["ADD_LOADING"] = "ADD_LOADING";
    EGlobalActions["DEL_LOADING"] = "DEL_LOADING";
    EGlobalActions["ADD_ERR"] = "ADD_ERR";
    EGlobalActions["DEL_ERR"] = "DEL_ERR";
})(EGlobalActions || (exports.EGlobalActions = EGlobalActions = {}));
var reducer = function (state, action) {
    switch (action.type) {
        case EGlobalActions.ADD_REQUEST:
            return __assign(__assign({}, state), { requests: state.requests.some(function (e) { return e === action.request; }) ?
                    state.requests : __spreadArray(__spreadArray([], state.requests, true), [action.request], false) });
        case EGlobalActions.ADD_LOADING:
            return __assign(__assign({}, state), { loading: state.loading.some(function (e) { return e === action.request; }) ?
                    state.loading : __spreadArray(__spreadArray([], state.loading, true), [action.request], false) });
        case EGlobalActions.DEL_LOADING:
            return __assign(__assign({}, state), { loading: state.loading.filter(function (e) { return e !== action.request; }) });
        case EGlobalActions.ADD_ERR:
            return __assign(__assign({}, state), { error: state.error.some(function (e) { return e === action.request; }) ?
                    state.error : __spreadArray(__spreadArray([], state.error, true), [action.request], false) });
        case EGlobalActions.DEL_ERR:
            return __assign(__assign({}, state), { error: state.error.filter(function (e) { return e !== action.request; }) });
        default:
            return state;
    }
};
var GlobalProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useReducer)(reducer, initialState), state = _b[0], dispatch = _b[1];
    var addLoading = function (request) { return function () { return dispatch({ type: EGlobalActions.ADD_LOADING, request: request }); }; };
    var delLoading = function (request) { return function () { return dispatch({ type: EGlobalActions.DEL_LOADING, request: request }); }; };
    var addError = function (request) { return function () { return dispatch({ type: EGlobalActions.ADD_ERR, request: request }); }; };
    var delError = function (request) { return function () { return dispatch({ type: EGlobalActions.DEL_ERR, request: request }); }; };
    return (0, jsx_runtime_1.jsxs)(GlobalContext.Provider, { value: {
            requests: state.requests,
            loading: state.loading,
            error: state.error,
            dispatch: dispatch
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: { position: 'absolute', bottom: 0, left: 0, height: 150, width: '100%', background: 'gray', border: '2px solid red', boxSizing: 'border-box' }, children: (0, jsx_runtime_1.jsx)("div", { style: { overflow: 'auto', textAlign: 'left', maxHeight: 125, paddingLeft: 10, border: '1px solid darkgray' }, children: state.requests.map(function (request) { return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 10, padding: 10 }, children: [(0, jsx_runtime_1.jsx)("a", { style: { fontWeight: '600', textDecoration: 'underline' }, children: "Request 1" }), (0, jsx_runtime_1.jsxs)("a", { onClick: !state.loading.includes(request) ? addLoading(request) : delLoading(request), children: ["Loading: ", state.loading.includes(request) ? 'Yes' : 'No'] }), (0, jsx_runtime_1.jsxs)("a", { onClick: !state.error.includes(request) ? addError(request) : delError(request), children: ["Error: ", state.error.includes(request) ? 'Yes' : 'No'] }), (0, jsx_runtime_1.jsx)("a", { children: "Executions: 0 (coming soon)" })] })); }) }) }), children] });
};
exports.GlobalProvider = GlobalProvider;
var useRequestContext = function () { return (0, react_1.useContext)(GlobalContext); };
exports.useRequestContext = useRequestContext;
