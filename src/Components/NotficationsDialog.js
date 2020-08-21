import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
// import CardContent from '@material-ui/core/CardContent';
// import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles((theme) => ({
    dialog: {
        // height: '800px',
        minHeight: '90vh',
        maxHeight: '90vh',
    },
    root3:{
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2)
      },
}));


export default function FormDialog(props) {
    const classes = useStyles();





    return (
        <div>
            <Dialog scroll="paper" open={props.open} fullWidth={true} PaperProps={{
                style: {
                    backgroundColor: "#1C1C1E",
                    boxShadow: 'none',
                },
            }} onClose={props.handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.dialog }}>
                <DialogTitle id="form-dialog-title">Notifications</DialogTitle>
                <Divider></Divider>
                <DialogContent>
                    <Box m={1} p={1}  className={classes.root3}>

                        <Box className={classes.root2} whiteSpace="normal">
                            <Typography className={classes.title}>
                                "Hello"
                            </Typography>
                            <Typography className={classes.pos}>
                                "HJokjnckjd"
                            </Typography>
                        </Box>
                        <Box className={classes.root5}>
                            <Typography variant="body2" >
                                {/* {date.toDateString()}{" " + date.toLocaleTimeString()} */}
                                "lalith"
                            </Typography>
                        </Box>
                    </Box>
                    <Box m={1} p={1}  className={classes.root3}>

<Box className={classes.root2} whiteSpace="normal">
    <Typography className={classes.title}>
        "Hello"
    </Typography>
    <Typography className={classes.pos}>
        "HJokjnckjd"
    </Typography>
</Box>
<Box className={classes.root5}>
    <Typography variant="body2" >
        {/* {date.toDateString()}{" " + date.toLocaleTimeString()} */}
        "lalith"
    </Typography>
</Box>
</Box>
 <Box m={1} p={1}  className={classes.root3}>

<Box className={classes.root2} whiteSpace="normal">
    <Typography className={classes.title}>
        "Hello"
    </Typography>
    <Typography className={classes.pos}>
        "HJokjnckjd"
    </Typography>
</Box>
<Box className={classes.root5}>
    <Typography variant="body2" >
        {/* {date.toDateString()}{" " + date.toLocaleTimeString()} */}
        "lalith"
    </Typography>
</Box>
</Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
