'use client'
import { useDispatch, useSelector } from "react-redux";
import  { TasksTable } from "./components/todo-table"
import { RootState, setTodos } from "@/redux/store";
import { useEffect, useState } from "react";
import { getTodos } from "./service/todos";

export default function TaskPage() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const isTodoAdded = useSelector((state: RootState) => state.todos.isTodoAdded);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      const data = await getTodos();
      dispatch(setTodos(data));
      setLoading(false); 
    };

    fetchTodos();
  }, [dispatch, isTodoAdded]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container mx-auto py-10">
      <TasksTable data={todos}/> 
    </div>
  );
}