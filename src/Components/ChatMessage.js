import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
import InfoIcon from '@material-ui/icons/Info';
import { ListItemAvatar } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({

    root: {
        position: 'fixed',
        width: '75%',
        height: '100vh',
        backgroundColor: theme.palette.primary.light,

    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    inline: {
        // overflow: 'wrap'
        // display: 'block'
    }

}));

function ChatMessage(props) {
    // const token = localStorage.getItem('token');
    // const user = React.useContext(AuthContext);
    const classes = useStyles();
    const message = props.message;
    const [userType, setUserType] = React.useState('')
    const date = new Date(message.date);
    // console.log(date.toLocaleTimeString([], {timeStyle: 'short'}))
    useEffect(() => {
        if (props.adminId === message.id) {
            setUserType('Admin')
        }
    }, [props.adminId,message.id])

    return (
        <ListItem alignItems="flex-start">
            {/* <ListItemAvatar>
                <Avatar alt={name} src={`http://localhost:4000/api/image?id=${message.userPic}`} />
            </ListItemAvatar> */}
            <ListItemAvatar style={{display:'none'}} ><InfoIcon></InfoIcon></ListItemAvatar>
            <ListItemText
                primary={
                    <React.Fragment>
                        <Typography
                            component="h6"
                            variant="body2"
                            className={classes.inline}
                        >
                            {message.user_name}
                        </Typography>

                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                        >
                            {userType}
                        </Typography>
                    </React.Fragment>
                }
                secondary={<React.Fragment>
                    <Typography
                        component="span"
                        variant="body1"
                        color="textPrimary"
                        className={classes.inline}
                    >
                        {message.message}
                    </Typography>

                    <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                        className={classes.inline}
                    >
                        {"   "+date.toLocaleTimeString([], {timeStyle: 'short'})}
                    </Typography>
                </React.Fragment>}

            />
        </ListItem>
    );
}

export default ChatMessage;

