import React from 'react';

// import { makeStyles } from '@material-ui/core/styles';
import { DialogContent, DialogTitle } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';

// const useStyles = makeStyles((theme) => ({
  
// }));




function ImageDialog(props) {
  // const classes = useStyles();

  function handleClose() {
    props.handleClose();

}

  return (
      <div>
        <Dialog
            open={props.open}
            onClose={handleClose}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth={true}
            maxWidth="md"
            PaperProps={{
                style: {
                    backgroundColor: "#1C1C1E",
                    boxShadow: 'none',
                },
            }}>
            <DialogTitle>Hello</DialogTitle>
              <DialogContent>
                <img src={props.image} alt="profile pic"></img>
              </DialogContent>
            </Dialog>
      </div>
   );
}

export default ImageDialog;

