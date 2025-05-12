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
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { handleCloseDelete, handleDeleteTodo } from "../../handlers/confirmDeleteHandlers";
import { cancel, confirmDelete, confirmDeleteDescription, continueText } from "@/const/todo-constants";
  
  export function AlertDelete() {
    const deleteS = useSelector((state: RootState) => state.delete);
    const dispatch = useDispatch();

    return (
        <AlertDialog open={deleteS.delete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle data-testid="confirm-delete">{confirmDelete}</AlertDialogTitle>
              <AlertDialogDescription>
                {confirmDeleteDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => handleCloseDelete({dispatch})}>{cancel}</AlertDialogCancel>
              <AlertDialogAction onClick={() =>{
                 handleDeleteTodo({dispatch, deleteS})
                 handleCloseDelete({dispatch})
                }}>{continueText}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> 
    
    )
  }
  