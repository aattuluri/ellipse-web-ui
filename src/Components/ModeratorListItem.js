import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Typography } from '@material-ui/core';

import AuthContext from '../AuthContext';
// import WebSocketContext from '../WebSocketContext';



// const useStyles = makeStyles((theme) => ({
//   root: {
//     alignItems: "center",
//     backgroundColor: theme.palette.secondary.main,
//     marginBottom: theme.spacing(2),

//   },

// }));




function ModeratorListItem(props) {
    const token = localStorage.getItem('token');
    const { currentUser } = React.useContext(AuthContext);
    //   const classes = useStyles();
    const event = props.event;
    const [memberDetails, setMemberDetails] = React.useState({});

    React.useEffect(() => {
        fetchAll()
        // eslint-disable-next-line
    }, [props])

    const fetchAll = () => {
        try {
            fetch(process.env.REACT_APP_API_URL + `/api/event/get_team_member_details?id=${props.user_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'GET',
            }).then(response => {
                response.json().then(value => {
                    // console.log(value);

                    setMemberDetails(value);
                })
            })
        }
        catch (e) {
            console.log(e);
        }
    }
    const handleRemoveButton = () => {
        if (props.type === "moderator") {
            // const d = new Date();
            var data = new FormData();
            data = JSON.stringify({
                event_id: event._id,
                moderator_id: props.user_id
            });
            // console.log(data);
            fetch(process.env.REACT_APP_API_URL + `/api/event/remove_moderator`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: data
            }).then((response) => {
                if (response.status === 200) {
                    response.json().then(value => {
                        props.setEvent(value.event);

                    })
                }
            })
        }
        else {
            // const d = new Date();
            var data2 = new FormData();
            data2 = JSON.stringify({
                event_id: event._id,
                blocked_user_id: props.user_id
            });
            // console.log(data);
            fetch(process.env.REACT_APP_API_URL + `/api/event/unblock_chat_for_user`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: data2
            }).then((response) => {
                if (response.status === 200) {
                    response.json().then(value => {
                        props.setEvent(value.event);

                    })
                }
            })
        }

    }

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <Avatar alt={memberDetails.name} src={memberDetails.user_pic ? process.env.REACT_APP_API_URL + `/api/image?id=${memberDetails.user_pic}` : "abc.jpg"} />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={props.id === props.user_id ? memberDetails.name + " (Team Leader)" : memberDetails.name}
                secondary={memberDetails.college}
            />
            {currentUser.user_id === event.user_id && <IconButton onClick={handleRemoveButton} edge="end" aria-label="delete">
                <RemoveCircleIcon></RemoveCircleIcon> <Typography>{props.type === "moderator" ? "Remove" : "UnBlock"}</Typography>
            </IconButton>}
        </ListItem>
    );
}

export default ModeratorListItem;

