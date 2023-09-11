import {Dispatch} from 'redux';
import {appActions} from 'app/app.reducer';
import {ResponseType} from 'common/types/common.types';

/**
 *@template D - Тип данных, возвращаемых сервером.
 * @param {ResponseType<D>} data - Данные, полученные от сервера.
 * @param {Dispatch} dispatch - Функция для добавления состояния приложения.
 * @param {boolean} [showError=true] - Флаг, утверждающий, нужно ли отобразить ошибку.
 * @return {void} - Ничего не возвращает.
 */
export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch, showError: boolean = true) => {
    if (showError) {
        dispatch(appActions.setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    // dispatch(appActions.setAppStatus({status: 'failed'}))
}
