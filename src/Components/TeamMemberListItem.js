import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Typography } from '@material-ui/core';

import AuthContext from '../AuthContext';
import WebSocketContext from '../WebSocketContext';



// const useStyles = makeStyles((theme) => ({
//   root: {
//     alignItems: "center",
//     backgroundColor: theme.palette.secondary.main,
//     marginBottom: theme.spacing(2),

//   },

// }));




function Eventcard(props) {
    const token = localStorage.getItem('token');
    const { currentUser } = React.useContext(AuthContext);
    //   const classes = useStyles();
      const event = props.event;
    const [memberDetails, setMemberDetails] = React.useState({});
    const { webSocketContext } = React.useContext(WebSocketContext);

    React.useEffect(() => {
        fetchAll()
        // eslint-disable-next-line
    }, [props])

    const fetchAll = () =>{
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
    const handleRemoveButton = () =>{
        const d = new Date();
        var data = new FormData();
        data = JSON.stringify({
            event_id: event._id,
            team_id: props.id._id,
            user_id: props.user_id
        });
        // console.log(data);
        fetch(process.env.REACT_APP_API_URL + `/api/event/remove_user_from_team`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: data
        }).then((response) => {
            response.json().then(value => {
                // console.log(value);
                props.fetchAll()
                if (webSocketContext) {
                    webSocketContext.send(JSON.stringify({
                        action: "team_status_update_message",
                        team_id: props.id._id,
                        msg: {
                            'id': props.user_id + Date.now(),
                            'user_id': currentUser.user_id,
                            'user_name': currentUser.name,
                            'user_pic': currentUser.user_pic,
                            'message_type': 'team_status_update_message',
                            'message': memberDetails.name + " was removed from the team",
                            'date': d.toISOString()
                        }
                    }));
                    webSocketContext.send(JSON.stringify({
                        action: "team_status_update_status",
                        team_id: props.id._id,
                        users: props.id.members,
                        msg: {
                          'id': currentUser.user_id + Date.now(),
                          'user_id': currentUser.user_id,
                          'user_name': currentUser.name,
                          'user_pic': currentUser.profile_pic,
                          'message_type': 'team_status_update_message',
                          'message': currentUser.name + " has left the team",
                          'date': d.toISOString()
                        }
                      }));
                }
            })
        })
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
            {props.admin && !(currentUser.user_id === props.user_id) && <ListItemSecondaryAction>
                <IconButton onClick={handleRemoveButton} edge="end" aria-label="delete">
                    <RemoveCircleIcon></RemoveCircleIcon> <Typography>Remove</Typography>
                </IconButton>
            </ListItemSecondaryAction>}
        </ListItem>
    );
}

export default Eventcard;

