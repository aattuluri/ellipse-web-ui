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
                            <li>The information you provided for the event is true and is appropriate.
                                In case we notice any incorrect information, the event will be suspended and further
                                action would be taken against you.</li>
                            <li>The information of participants is only used for event purpose and not for any other purpose. Legal action will
                             be taken if this information is used elsewhere.</li>
                            <li>ellipseapp.com reserves the right to update and change these Terms of Service regularly
                               without notice to you or acceptance by you. </li>
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
