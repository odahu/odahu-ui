import React, { Dispatch } from "react";
import { 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogActions, 
    DialogContent,
    DialogContentText, 
} from "@material-ui/core";

export interface ConfirmDialogProps {
    title: string;
    open: boolean;
    children: any;
    setOpen: Dispatch<boolean>;
    onConfirm: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmDialogProps> = props => {
    const { title, open, children, setOpen, onConfirm } = props;
    
    return (
        <Dialog 
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="confirmation-dialog"
            aria-describedby="confirm-dialog-description" 
        >
            <DialogTitle id="confirmation-dialog">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="confirm-dialog-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color="default"
                    onClick={() => setOpen(false)}
                >
                    No
                </Button>
                <Button
                    color="secondary"
                    onClick={() => {
                        setOpen(false);
                        onConfirm();
                    }}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}