import React from "react";
import {Button} from "@mui/material";
import {
    FilterValuesType,
    TodolistDomainType,
    todolistsActions
} from "features/todolists-list/todolists/model/todolists.reducer";
import {useActions} from "common/hooks/useActions";

type FilterTaskButtonsPropsType = {
    todolist: TodolistDomainType

}
export const FilterTaskButtons: React.FC<FilterTaskButtonsPropsType> = ({todolist}) => {
    const {changeTodolistFilter} = useActions(todolistsActions)
    const handleChangeFilter = (filter: FilterValuesType) => {
        changeTodolistFilter({filter, id: todolist.id})
    }
    return (
        <div style={{paddingTop: '10px'}}>
            <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={() => handleChangeFilter('all')}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={() => handleChangeFilter('active')}
                    color={'primary'}>Active
            </Button>
            <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={() => handleChangeFilter('completed')}
                    color={'secondary'}>Completed
            </Button>
        </div>
    )
}