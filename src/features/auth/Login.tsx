import React from 'react'
import {FormikHelpers, useFormik} from 'formik'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material'
import {useAppDispatch} from 'common/hooks';
import {selectCaptchaUrl, selectIsLoggedIn} from 'features/auth/auth.selectors';
import {authThunks} from "features/auth/auth.reducer";
import {LoginParamsType} from "features/auth/auth.api";
import {BaseResponseType, ResponseType} from "common/types";

export const Login = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const captcha = useSelector(selectCaptchaUrl)
    const errors: Partial<LoginParamsType> = {}
    const formik = useFormik({
        validate: (values) => {

            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }

            // return errors
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: '',
        },
        onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
            dispatch(authThunks.login(values))
                .unwrap()
                .catch((reason: BaseResponseType<ResponseType>) => {
                    reason.fieldsErrors?.forEach((f) => {
                        formikHelpers.setFieldError(f.field, f.error)
                    })
                })
                // .finally(formik.resetForm)

        },

    })

    if (isLoggedIn) {
        return <Navigate to={"/"}/>
    }


    return <Grid container justifyContent="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>
                            To log in get registered <a href={'https://social-network.samuraijs.com/'}
                                                        target={'_blank'}>here</a>
                        </p>
                        <p>
                            or use common test account credentials:
                        </p>
                        <p> Email: free@samuraijs.com
                        </p>
                        <p>
                            Password: free
                        </p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email && formik.touched.email ? <div
                            style={{color: "red"}}>{formik.errors.email}</div> : formik.touched.email && errors.email ?
                            <div style={{color: 'red'}}>{errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.errors.password && formik.touched.password ?
                            <div style={{color: "red"}}>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps("rememberMe")}
                                checked={formik.values.rememberMe}
                            />}
                        />
                        {captcha &&
                            <>
                                <img src={captcha} alt={'captcha'}/>
                                <TextField label={'Enter captcha'}
                                           {...formik.getFieldProps('captcha')}/>
                            </>
                        }
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>

                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
