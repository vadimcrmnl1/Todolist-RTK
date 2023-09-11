import {BaseThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AppDispatch, AppRootStateType} from "app/store";
import {ResponseType} from "common/types";
import {handleServerNetworkError} from "common/utils/handle-server-network-error";

export const thunkTryCatch = async (
    thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatch, null | ResponseType>,
    logic: Function) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        return await logic()
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
}