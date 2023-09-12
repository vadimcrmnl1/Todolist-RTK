import React, {useCallback} from "react";
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {selectAppStatus} from "app/app.selectors";
import {selectIsLoggedIn} from "features/auth/auth.selectors";
import {useActions} from "common/hooks/useActions";
import {authThunks} from "features/auth/auth.reducer";

export const Header: React.FC = () => {
    const status = useSelector(selectAppStatus)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const {logout} = useActions(authThunks)

    const logoutHandler = useCallback(() => {
        logout()
    }, [])
    return (
        <AppBar position="static">
            <Toolbar style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    TODOLIST
                </Typography>
                {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
        </AppBar>
    )
}