import { closeDelete, deleteTodoReducer } from "@/redux/store"
import { UnknownAction } from "@reduxjs/toolkit"
import { Dispatch } from "react"
import { deleteTodo } from "../service/todos"
import { DeleteState } from "../interfaces/dialogs"

export const handleDeleteTodo = async (
    {dispatch, deleteS}: 
    {
        dispatch: Dispatch<UnknownAction>
        deleteS: DeleteState
    }
) => {
    dispatch(deleteTodoReducer(deleteS.id))
    await deleteTodo(deleteS.id)
}

export const handleCloseDelete = (
    {dispatch}: 
    {
        dispatch: Dispatch<UnknownAction>
    }
) => {
    dispatch(closeDelete())
}