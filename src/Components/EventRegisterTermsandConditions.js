import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';

export default function AlertDialog(props) {

    const theme = useTheme();

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                PaperProps={{
                style: {
                    backgroundColor: theme.palette.secondary.main,
                    boxShadow: 'none',
                },
            }}
            >
                <DialogTitle id="title">{"Terms and Conditions"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <ul>
                            <li>Provided registration data and your profile will be shared with event admin</li> 
                        </ul>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Dismiss
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
