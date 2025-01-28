import { TodoBodyState } from "@/redux/store";

export const getTodos = async () => {
    const api_url = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch(`${api_url}`); 
    const todos = await response.json(); 
    return todos
}

export const createNewTodo = async (newTodo: TodoBodyState) => {
    const api_url = process.env.NEXT_PUBLIC_API_URL
    const newTodoResponse = await fetch(`${api_url}`, {
        method: 'POST', 
        body: JSON.stringify(newTodo), 
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const todo = await newTodoResponse.json();
    return todo
}

export const updateTodo = async (id : string, todoBody: TodoBodyState) => {
    const api_url = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch (`${api_url}/${id}`, {
        method: 'PUT', 
        body: JSON.stringify(todoBody), 
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.ok
}

export const changeTodoStatus = async (id: string) => {
    const api_url = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch (`${api_url}/${id}/changeStatus`, {
        method: 'PUT', 
    }); 
    const itChanged = response.ok
    return itChanged
}

export const deleteTodo = async (id: string) => {
    const api_url = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch (`${api_url}/${id}`, {
        method: 'DELETE', 
    })

    return response.ok
}