import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {todolistsThunks} from 'features/todolists-list/todolists/model/todolists.reducer'
import {Grid, Paper} from '@mui/material'
import {AddItemForm} from 'common/components'
import {Todolist} from 'features/todolists-list/todolists/ui/Todolist/Todolist'
import {Navigate} from 'react-router-dom'
import {useAppDispatch} from 'common/hooks';
import {selectIsLoggedIn} from 'features/auth/auth.selectors';
import {selectTasks} from 'features/todolists-list/tasks/model/tasks.selectors';
import {selectTodolists} from 'features/todolists-list/todolists/model/todolists.selectors';
import {useActions} from "common/hooks/useActions";


export const TodolistsList = () => {
    const todolists = useSelector(selectTodolists)
    const tasks = useSelector(selectTasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const {
        fetchTodolists,
        addTodolist,
    } = useActions(todolistsThunks)

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        fetchTodolists()
    }, [])

    const addTodolistCallback = (title: string) => {
        // @ts-ignore
        return addTodolist(title).unwrap()
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolistCallback}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
