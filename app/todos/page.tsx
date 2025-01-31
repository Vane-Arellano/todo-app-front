'use client'
import { useDispatch, useSelector } from "react-redux";
import  { TasksTable } from "./components/todo-table"
import { RootState, setTodos, setTotalPages, setTotalTodos } from "@/redux/store";
import { useEffect, useState } from "react";
import { getTodos } from "./service/todos";
import { toast } from "sonner";
import { TodosResponse } from "./interfaces/todos";

export default function TaskPage() {
  const dispatch = useDispatch();
  const pagination = useSelector((state:RootState) => state.pagination)
  const todos = useSelector((state: RootState) => state.todos.todos);
  const isTodoAdded = useSelector((state: RootState) => state.todos.isTodoAdded);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const data : TodosResponse = await getTodos(pagination.pageIndex);
        
        dispatch(setTodos(data.todos));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setTotalTodos(data.totalTodos))
        setLoading(false); 

      } catch (e) {
        toast('Somewthing went wrong ' + e);
      }
      
    };

    fetchTodos();
  }, [dispatch, isTodoAdded, pagination]);

  if (loading) {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <div
          className="text-primary inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
        </div>
      </div>
    
    )
    
  }

  return (
    <div className="container mx-auto py-10">
      <TasksTable 
        data={todos} 
        totalPages={pagination.totalPages} 
        page={pagination.pageIndex}
        totalTodos={pagination.totalTodos}
      /> 
    </div>
  );
}