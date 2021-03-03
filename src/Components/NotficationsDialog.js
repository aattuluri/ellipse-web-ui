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
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
// import { Redirect } from 'react-router';



const useStyles = makeStyles((theme) => ({
    dialog: {
        // height: '800px',
        minHeight: '90vh',
        maxHeight: '90vh',
    },
    root3: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2)
    },
    root5:{
        display: "flex",
            justifyContent: "flex-end",
      },
      secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
      },
      icons: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    },
      
}));


export default function FormDialog(props) {
    const classes = useStyles();
    const theme = useTheme();
    const token = localStorage.getItem('token');
    const [notificationms,setNotifications] = React.useState([]);
    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_URL+'/api/get_notifications_desc', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            if (response.status === 200) {
                response.json().then(value => {
                    setNotifications(value);
                })
            }
        })
    }, [token])

    const handleNotificationClick = (n) => () =>{
        props.handleClick(n.event_id)
    }

    function handleClose() {
        props.handleClose();
    }


    return (
        <div>
            <Dialog scroll="paper" open={props.open} fullWidth={true} PaperProps={{
                style: {
                    backgroundColor: theme.palette.secondary.main,
                    boxShadow: 'none',
                },
            }} onClose={props.handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.dialog }}>
                <DialogTitle id="form-dialog-title">Notifications</DialogTitle>
                <div className={classes.icons}>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon fontSize="large" />
                    </IconButton>
                    </div>
                <Divider></Divider>
                <DialogContent>
                {
                    notificationms.map((n,index)=>{
                        const date = new Date(n.time)
                       return <Box onClick={handleNotificationClick(n)} m={1} p={1} className={classes.root3}>
                        <Box className={classes.root2} whiteSpace="normal">
                            <Typography className={classes.title}>
                                {n.title}
                            </Typography>
                            <Typography className={classes.pos}>
                                {n.description}
                            </Typography>
                        </Box>
                        <Box className={classes.root5}>
                            <Typography variant="body2" >
                                {date.toDateString()}{" " + date.toLocaleTimeString()}
                            </Typography>
                        </Box>
                    </Box>
                    })
                }  
                {
                    notificationms.length === 0 && <Typography>No Notifications</Typography>
                }  
                </DialogContent>
            </Dialog>
        </div>
    );
}
