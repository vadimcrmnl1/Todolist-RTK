import {createSlice} from '@reduxjs/toolkit';
import {appActions} from 'app/app.reducer';
import {authAPI, LoginParamsType} from 'features/auth/auth.api';
import {clearTasksAndTodolists} from 'common/actions';
import {createAppAsyncThunk} from 'common/utils';
import {ResultCode} from "common/enums";

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        captcha: ''
    },
    reducers: {
        // captcha: (state, action) => {
        //     state.captcha = action.payload.captcha
        // }
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
            .addCase(getCaptcha.fulfilled, (state, action) => {
                state.captcha = action.payload.captcha
            })

    }
})


// thunks
const login = createAppAsyncThunk<{ isLoggedIn: boolean}, LoginParamsType>('auth/login',
    async (arg, {dispatch, rejectWithValue}) => {
        try {
            const res = await authAPI.login(arg)
            if (res.data.resultCode === ResultCode.Success) {
                return {isLoggedIn: true}
            }
            if (res.data.resultCode === ResultCode.Captcha) {
                dispatch(authThunks.getCaptcha())
                return {isLoggedIn: false}
            } else {
                return rejectWithValue({data: res.data, showGlobalError: true})
            }
        } catch (e) {
            return rejectWithValue(null)
        }
    })
const logout = createAppAsyncThunk<{ isLoggedIn: boolean}, void>('auth/logout',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const res = await authAPI.logout()
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(clearTasksAndTodolists())
                return {isLoggedIn: false}
            } else {
                return rejectWithValue({data: res.data, showGlobalError: true})
            }
        } catch (e) {
            return rejectWithValue(null)
        }
    })
const isInitializedApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>('app/isInitialized',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const res = await authAPI.me()
            if (res.data.resultCode === ResultCode.Success) {
                return {isLoggedIn: true}
            } else {
                return rejectWithValue(null)
            }

        } catch (e) {
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.setAppInitialized({isInitialized: true}))
        }
    })
const getCaptcha = createAppAsyncThunk<{captcha: string}, void>('auth/getCaptcha',
    async (_, {rejectWithValue}) => {
        try {
            const res = await authAPI.getCaptcha()
            return {captcha: res.data.url}
        } catch (e) {
            return rejectWithValue(null)
        }
    })
export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {login, logout, isInitializedApp, getCaptcha}