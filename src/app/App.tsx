import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {CircularProgress, Container} from '@mui/material';
import {Login} from 'features/auth/Login'
import './App.css'
import {TodolistsList} from 'features/todolists-list/TodolistsList'
import {ErrorSnackbar} from 'common/components'
import {selectIsInitialized} from 'app/app.selectors';
import {authThunks} from "features/auth/auth.reducer";
import {useActions} from "common/hooks/useActions";
import {Header} from "common/components/Header/Header";

function App() {

    const isInitialized = useSelector(selectIsInitialized)
    const {isInitializedApp} = useActions(authThunks)
    useEffect(() => {
        isInitializedApp()
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <Header/>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    )
}

export default App
