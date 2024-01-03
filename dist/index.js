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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRequest = void 0;
var react_1 = require("react");
var lodash_1 = require("lodash");
var global_1 = require("./global");
var axios_1 = require("axios");
var formatKey = function (functionName, keyName) {
    return "".concat((0, lodash_1.camelCase)(functionName)).concat((0, lodash_1.capitalize)(keyName));
};
var suffixes = function () { return ({
    Request: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, null];
    }); }); },
    Response: null,
    Error: null,
    Loading: false,
    Statuscode: null,
}); };
var EAction;
(function (EAction) {
    EAction["reset"] = "reset";
    EAction["loadingStart"] = "loadingStart";
    EAction["loadingStop"] = "loadingStop";
    EAction["handleResponse"] = "handleResponse";
})(EAction || (EAction = {}));
var reducer = function (state, action) {
    var _a, _b, _c, _d;
    switch (action.type) {
        case EAction.handleResponse:
            return __assign(__assign({}, state), { Error: (_a = action.value) === null || _a === void 0 ? void 0 : _a.Error, Response: (_b = action.value) === null || _b === void 0 ? void 0 : _b.Response, Statuscode: (_c = action.value) === null || _c === void 0 ? void 0 : _c.Statuscode, Loading: (_d = action.value) === null || _d === void 0 ? void 0 : _d.Loading });
        case EAction.reset:
            return __assign(__assign({}, state), { Error: null, Response: null, Statuscode: null });
        case EAction.loadingStart:
            return __assign(__assign({}, state), { Loading: true });
        case EAction.loadingStop:
            return __assign(__assign({}, state), { Loading: false });
        default:
            throw new Error();
    }
};
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
var useRequest = function (func, name) {
    var _a;
    var _b;
    if (!name)
        throw new Error('Function name not found, please pass the function name as the 2nd argument');
    var _c = (0, react_1.useReducer)(reducer, {
        Loading: false,
        Response: null,
        Statuscode: null,
        Error: null,
    }), state = _c[0], dispatch = _c[1];
    var _d = (0, global_1.useRequestContext)(), globalDispatch = _d.dispatch, loading = _d.loading, error = _d.error;
    var resetState = function () { return dispatch({ type: EAction.reset }); };
    var doRequest = (0, react_1.useCallback)(function (_data) { return __awaiter(void 0, void 0, void 0, function () {
        var exec, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    resetState();
                    dispatch({ type: EAction.loadingStart });
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, func(_data)];
                case 2:
                    exec = _c.sent();
                    return [2 /*return*/, dispatch({
                            type: EAction.handleResponse,
                            value: {
                                Response: exec.data || true,
                                Loading: false,
                                Statuscode: 200,
                                Error: null
                            }
                        })];
                case 3:
                    error_1 = _c.sent();
                    return [2 /*return*/, dispatch({
                            type: EAction.handleResponse,
                            value: {
                                Response: null,
                                Loading: false,
                                Statuscode: ((_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _a === void 0 ? void 0 : _a.status) || 500,
                                Error: ((_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _b === void 0 ? void 0 : _b.data) || error_1
                            }
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [func]);
    (0, react_1.useEffect)(function () {
        if (globalDispatch)
            globalDispatch({ type: global_1.EGlobalActions.ADD_REQUEST, request: name });
        resetState();
        dispatch({ type: EAction.loadingStop });
        return function () {
            resetState();
            dispatch({ type: EAction.loadingStop });
        };
    }, []);
    var isForcedLoading = (0, react_1.useCallback)(function () {
        if (!loading)
            return false;
        return loading.some(function (e) { return e === name; });
    }, [loading]);
    var isForcedError = (0, react_1.useCallback)(function () {
        if (!error)
            return false;
        return error.some(function (e) { return e === name; });
    }, [error]);
    return _a = {},
        _a[formatKey(name, 'request')] = doRequest,
        _a[formatKey(name, 'response')] = state.Response,
        _a[formatKey(name, 'error')] = isForcedError() ? new axios_1.AxiosError('Generic error from @ajxb/useRequest', '400') : state.Error,
        _a[formatKey(name, 'loading')] = (_b = isForcedLoading()) !== null && _b !== void 0 ? _b : state.Loading,
        _a[formatKey(name, 'statuscode')] = state.Statuscode,
        _a;
};
exports.useRequest = useRequest;
