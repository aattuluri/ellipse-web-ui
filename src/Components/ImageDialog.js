import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { DialogContent, DialogTitle } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  imageBox:{
    display: "flex",
        justifyContent: "center",
  },
  dialog: {
    // height: '800px',
    minHeight: '90vh',
    maxHeight: '90vh',
},
  image: {
    maxWidth: "100%",
  },
  icons: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    // color: theme.palette.grey[500],

},
title:{
  backgroundColor: theme.palette.secondary
}
}));




function ImageDialog(props) {
  const classes = useStyles();
  const event = props.event;
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
                    backgroundColor: "transparent",
                    boxShadow: 'none',
                    
                },
            }}
            classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.title}>{event.name}
            <div className={classes.icons}>
            <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon fontSize="large" />
                    </IconButton>
            </div>
            </DialogTitle>
              <DialogContent>
              <Box className={classes.imageBox}>
              <img className={classes.image} src={process.env.REACT_APP_API_URL + `/api/image?id=${event.poster_url}`}  alt="profile pic"></img>
              </Box>
                
              </DialogContent>
            </Dialog>
      </div>
   );
}

export default ImageDialog;

