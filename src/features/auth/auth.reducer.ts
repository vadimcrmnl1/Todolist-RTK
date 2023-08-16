import {createSlice} from '@reduxjs/toolkit';
import {appActions} from 'app/app.reducer';
import {authAPI, LoginParamsType} from 'features/auth/auth.api';
import {clearTasksAndTodolists} from 'common/actions';
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from 'common/utils';
import {ResultCode} from "common/enums";

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        captcha: ''
    },
    reducers: {
        captcha: (state, action) => {
            state.captcha = action.payload.captcha
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(isInitializedApp.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })

    }
})


// thunks
const login = createAppAsyncThunk<{ isLoggedIn: boolean}, LoginParamsType>('auth/login',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setAppStatus({status: 'loading'}))
            const res = await authAPI.login(arg)
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
                return {isLoggedIn: true}
            }
            if (res.data.resultCode === ResultCode.Captcha) {
                dispatch(authThunks.getCaptcha())
                return {isLoggedIn: false}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(res.data)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })
const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>('auth/logout',
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setAppStatus({status: 'loading'}))
            const res = await authAPI.logout()
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(clearTasksAndTodolists())
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
                return {isLoggedIn: false}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })
const isInitializedApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>('app/isInitialized',
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            const res = await authAPI.me()
            if (res.data.resultCode === ResultCode.Success) {
                return {isLoggedIn: true}
            } else {
                return rejectWithValue(null)
            }

        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.setAppInitialized({isInitialized: true}))
        }
    })
const getCaptcha = createAppAsyncThunk<string, void>('auth/getCaptcha',
    async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
        try {
            const res = await authAPI.getCaptcha()
            return res.data.url
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })
export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {login, logout, isInitializedApp, getCaptcha}