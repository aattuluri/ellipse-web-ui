import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

export default function AlertDialog(props) {

    const [reply,setReply] = React.useState(null);

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSendButton = () => {
    props.handleReplyConfirmation(reply)
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Reply Message"}</DialogTitle>
        <DialogContent>
          <TextField name="reply" value={reply} onChange={(ev)=>{setReply(ev.target.value)}} >

          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendButton} color="primary" autoFocus>
            send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}