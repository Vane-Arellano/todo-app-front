/**
 * Handles the saving of a new todo item.
 *
 * This function validates the provided `newTodo` object, ensuring that required fields
 * are filled. If validation passes, it attempts to create a new todo item by calling
 * the `createNewTodo` service. Upon successful creation, it dispatches actions to add
 * the new todo to the store, trigger a todo-added event, close the dialog, and reset
 * the todo form values. If an error occurs during the creation process, a toast
 * notification is displayed with an error message. If validation fails, a toast
 * notification prompts the user to fill in all required fields.
 *
 * @param newTodo - The new todo object containing the details of the todo item to be created.
 * @param dispatch - The Redux dispatch function used to dispatch actions to the store.
 * @param setOpen - A function to control the open state of the dialog.
 */
import { addTodo, triggerTodoAdded, restartTodoValues } from "@/redux/store";
import { toast } from "sonner";
import { createNewTodo } from "../service/todos";


export const handleSaveTodo = async (newTodo: any, dispatch: any, setOpen: any) => {
  if (newTodo.name != '' && newTodo.priority != '') {
    try {
      const todo = await createNewTodo(newTodo);
      dispatch(addTodo(todo));
      dispatch(triggerTodoAdded());
      setOpen(false);
      dispatch(restartTodoValues());
    } catch (error) {
      toast("Something went wrong, please try again" + error);
    }
  } else {
    toast("Please fill in all fields marked with *");
  }
}