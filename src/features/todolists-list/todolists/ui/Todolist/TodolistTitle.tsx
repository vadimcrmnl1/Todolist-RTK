import React from "react";
import {EditableSpan} from "common/components";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TodolistDomainType, todolistsThunks} from "features/todolists-list/todolists/model/todolists.reducer";
import {useActions} from "common/hooks/useActions";

type TodolistTitleProps = {
    todolist: TodolistDomainType
}
export const TodolistTitle: React.FC<TodolistTitleProps> = ({todolist}) => {
    const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks)
    const handleRemoveTodolist = () => {
        removeTodolist(todolist.id)
    }
    const handleChangeTodolistTitle = (title: string) => {
        changeTodolistTitle({id: todolist.id, title})
    }
    return (
        <h3><EditableSpan value={todolist.title} onChange={handleChangeTodolistTitle}/>
            <IconButton onClick={handleRemoveTodolist} disabled={todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
    )
}