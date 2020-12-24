import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Typography } from '@material-ui/core';
import WebSocketContext from '../WebSocketContext';
import AuthContext from '../AuthContext';


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
    }, [props, token])

    const handleAcceptButton = () => {
        const d = new Date();
        var data = new FormData();
        data = JSON.stringify({
            event_id: event._id,
            team_id: props.id._id,
            user_id: props.user_id
        });
        fetch(process.env.REACT_APP_API_URL + `/api/event/accept_user_teamup_request`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: data
        }).then((response) => {
            response.json().then(value => {
                console.log(value);
                props.fetchAll();

                if (webSocketContext) {
                    webSocketContext.send(JSON.stringify({
                        action: "team_status_update_message",
                        team_id: props.id._id,
                        msg: {
                            'id': props.user_id + Date.now(),
                            'user_id': currentUser.user_id,
                            'user_name': memberDetails.name,
                            'user_pic': memberDetails.user_pic,
                            'message_type': 'team_status_update_message',
                            'message': memberDetails.name + " has joined the team",
                            'date': d.toISOString()
                        }
                    }));
                    webSocketContext.send(JSON.stringify({
                        action: "team_status_update_status",
                        team_id: props.id._id,
                        users: [value.updated_user_id],
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
                <Avatar alt={memberDetails.name} src={memberDetails.user_pic ? process.env.REACT_APP_API_URL + `/api/image?id=${memberDetails.user_pic}` : "abc.lpg"} />
            </ListItemAvatar>
            <ListItemText
                primary={memberDetails.name}
                secondary={memberDetails.college}
            />
            <ListItemSecondaryAction>
                {/* <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton> */}
                <IconButton onClick={handleAcceptButton} edge="end" aria-label="delete">
                    <CheckCircleIcon></CheckCircleIcon><Typography>Accept</Typography>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>

    );
}

export default Eventcard;

