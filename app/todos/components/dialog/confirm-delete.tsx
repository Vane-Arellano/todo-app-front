import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { closeDelete, deleteTodoReducer, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../../service/todos";
  
  export function AlertDelete() {
    const deleteS = useSelector((state: RootState) => state.delete);
    const dispatch = useDispatch();

    const handleDeleteTodo = async () => {
      dispatch(deleteTodoReducer(deleteS.id))
      await deleteTodo(deleteS.id)
    }
    const handleCloseDelete = () => {
        dispatch(closeDelete());
    }
    return (
      <AlertDialog open={deleteS.delete} onOpenChange={handleCloseDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You wont be able to undo this action and recover the task you&apos;re deleting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTodo}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  