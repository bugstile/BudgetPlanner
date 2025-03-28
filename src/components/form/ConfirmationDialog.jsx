import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";

export default function ConfirmationDialog({
  onConfirm,
  onCancel,
  message,
  open,
  confirmVariant = "destructive", // Default variant for confirm
  cancelVariant = "outline",    // Default variant for cancel
}) {
  return (
    <AlertDialog open={open} onOpenChange={(openState) => !openState && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onCancel}
            className={buttonVariants({ variant: cancelVariant })} // Apply the cancel button variant via className
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={buttonVariants({ variant: confirmVariant })} // Apply the confirm button variant via className
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
