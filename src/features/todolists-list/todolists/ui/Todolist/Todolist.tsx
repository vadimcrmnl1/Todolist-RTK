import React, {useEffect} from 'react'
import {TodolistDomainType} from 'features/todolists-list/todolists/model/todolists.reducer'
import {tasksThunks} from 'features/todolists-list/tasks/model/tasks.reducer';
import {AddItemForm} from 'common/components'
import {TaskType} from "features/todolists-list/tasks/api/tasks.api.types";
import {useActions} from "common/hooks/useActions";
import {FilterTaskButtons} from "features/todolists-list/todolists/ui/Todolist/FilterTaskButtons";
import {TodolistTitle} from "features/todolists-list/todolists/ui/Todolist/TodolistTitle";
import {Tasks} from "features/todolists-list/tasks/ui/Tasks/Tasks";

type PropsType = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}

export const Todolist: React.FC<PropsType> = React.memo(function ({todolist, tasks}) {

    const {addTask, fetchTasks} = useActions(tasksThunks)
    useEffect(() => {
        fetchTasks(todolist.id)
    }, [])

    const handleAddTask = (title: string) => {
        // @ts-ignore
        return addTask({title, todolistId: todolist.id}).unwrap()
    }

    return <div>
        <TodolistTitle todolist={todolist}/>
        <AddItemForm addItem={handleAddTask} disabled={todolist.entityStatus === 'loading'}/>
        <Tasks todolist={todolist} tasks={tasks}/>
        <FilterTaskButtons todolist={todolist}/>

    </div>
})


