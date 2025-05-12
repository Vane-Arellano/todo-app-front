
import { editTodo, placeName, restartTodoValues } from "@/redux/store";
import { updateTodo } from "../service/todos";
import { toast } from "sonner";
import { Todo, TodoBodyState } from "../interfaces/todos";
import { EditState } from "../interfaces/dialogs";

/**
 * Handles the editing of a todo item. This function updates the todo item in the backend,
 * updates the Redux store, and resets the form values after a successful edit.
 *
 * @param {Todo | undefined} todoToEdit - The todo item to be edited. If undefined, the function will not proceed.
 * @param {string} name - The new name for the todo item. Must not be an empty string.
 * @param {TodoBodyState} editTodoSelector - The selector containing the current edit state, including priority and due date.
 * @param {any} dispatch - The Redux dispatch function used to update the store.
 * @param {EditState} edit - The current edit state, including the ID of the todo being edited.
 * @param {() => void} closeEdit - A callback function to close the edit dialog.
 *
 * @returns {Promise<void>} A promise that resolves when the editing process is complete.
 *
 * @throws Will log an error and display a toast notification if the update fails.
 *
 * @remarks
 * - The function ensures that all required fields (name and priority) are filled before proceeding.
 * - If the update is successful, the Redux store is updated with the new todo values, and the form values are reset.
 * - If any required fields are missing, a toast notification is displayed to inform the user.
 */

export const handleEditTodo = async (
  todoToEdit: Todo | undefined,
  name: string,
  editTodoSelector: TodoBodyState,
  dispatch: any,
  edit: EditState,
  closeEdit: () => void
) => {
  if (todoToEdit && name != '' && editTodoSelector.priority != '') {
    try {
      dispatch(placeName(name))

      await updateTodo(edit.id!, {
        name: name,
        priority: editTodoSelector.priority,
        dueDate: editTodoSelector.dueDate
      });
      dispatch(closeEdit());

      dispatch(editTodo({
        id: edit.id,
        name: name,
        priority: editTodoSelector.priority,
        dueDate: editTodoSelector.dueDate
      }));

      dispatch(restartTodoValues());


    } catch (error) {
      toast("Something went wrong, please try again" + error)
    }
  }
  else {
    toast('Something went wrong, please fill all fields marked with *')
  }
}

/**
 * Handles the placement of todo values into the edit form. This function sets the name, priority,
 * and due date of the todo item being edited.
 *
 * @param {Todo | undefined} todoToEdit - The todo item to be edited. If undefined, the function will not proceed.
 * @param {(name: string) => void} setName - A callback function to set the name of the todo item.
 * @param {(priority: "low" | "medium" | "high") => void} setPriority - A callback function to set the priority of the todo item.
 * @param {(dueDate: Date | undefined) => void} setDueDate - A callback function to set the due date of the todo item.
 *
 * @returns {void}
 *
 * @remarks
 * - The function checks if the todoToEdit is defined before proceeding to set the values.
 */

export const handlePlaceTodoToEdit = (
  todoToEdit: Todo | undefined,
  setName: (name: string) => void,
  setPriority: (priority: "low" | "medium" | "high") => void,
  setDueDate: (dueDate: Date | undefined) => void
) => {  
  if (todoToEdit) {
    setName(todoToEdit.name)
    setPriority(
      todoToEdit.priority == '0'
        ? "low" : todoToEdit.priority == '1'
          ? "medium" : "high")
    if (todoToEdit.dueDate !== null) {
      setDueDate(new Date(todoToEdit.dueDate))
    }
  }
}

/**
 * Handles the closing of the edit dialog. This function resets the form values and closes the dialog.
 *
 * @param {any} dispatch - The Redux dispatch function used to update the store.
 * @param {() => void} closeEdit - A callback function to close the edit dialog.
 *
 * @returns {void}
 *
 * @remarks
 * - The function resets the form values to their initial state.
 */
export const handleCloseEdit = (
  dispatch: any,
  closeEdit: () => void
) => {
  dispatch(closeEdit());
}