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
  
  export function AlertDelete() {
    const deleteS = useSelector((state: RootState) => state.delete);
    const dispatch = useDispatch();

    return (
        <AlertDialog open={deleteS.delete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle data-testid="confirm-delete">Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                You wont be able to undo this action and recover the task you&apos;re deleting.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => handleCloseDelete({dispatch})}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() =>{
                 handleDeleteTodo({dispatch, deleteS})
                 handleCloseDelete({dispatch})
                }}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> 
    
    )
  }
  