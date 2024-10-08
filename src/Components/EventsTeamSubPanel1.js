import React from 'react';
import { Typography, Box, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
// import { cleanup } from '@testing-library/react';

import TeamMemberListItem from './TeamMemberListItem';
import TeamMemberRequestListItem from './TeamMemberRequestListItem';

import AuthContext from '../AuthContext';
import TeamEditDialog from './EditTeamDialog';
import WebSocketContext from '../WebSocketContext';
// import ChatMessage from '../Components/ChatMessage';
// import ChatTextField from './ChatTextField';


const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    // backgroundColor: theme.palette.primary.light,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    alignContent: "center"

  },
  adminDetails: {
    display: "flex",
    justifyContent: "flex-start",
    // marginTop: theme.spacing(2)
  },
  root0: {
    display: "flex",
    justifyContent: "flex-start",

  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(1)
  },

  grid: {
    borderRadius: theme.spacing(3),
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    // maxWidth: '99%',
    marginTop: theme.spacing(2)

  },
  root3: {
    display: "flex",
    justifyContent: "flex-start",
    minWidth: theme.spacing(30)
  },
  root6: {
    display: "flex",
    justifyContent: "center",

  },
  // stickyHeader: {
  //     position: "sticky",
  //     position: "-webkit-sticky",
  //     top: 0,
  // },

  topBar: {
    // display: 'fixed'
    maxHeight: "300px"
  },
  root4: {
    marginRight: theme.spacing(0)
  },
  root5: {
    marginLeft: theme.spacing(0),
    maxWidth: '65%',
    overflow: 'auto',
    //    textOverflow: "ellipsis"
  },
  root2: {
    // backgroundColor: theme.palette.background.paper,
    // borderRadius: theme.spacing(1),
    textDecorationColor: theme.palette.secondary.light,
    maxWidth: '65%',
    minWidth: '20%',
    overflow: 'auto',
    marginLeft: theme.spacing(1)
    // textOverflow: "ellipsis"
  },
  bottomBar: {
    position: 'absolute',
    // flexGrow: 1,
    // zIndex: '5',
    right: theme.spacing(4),
    bottom: theme.spacing(4),
    left: "200px",
    padding: theme.spacing(0, 3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(5),
  },
  progress: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  message: {
    display: "flex",
    justifyContent: "flex-start",
  }

}));

function AboutEventPanel(props) {
  const classes = useStyles();
  const { currentUser } = React.useContext(AuthContext);
  const { children, value, url, index, ...other } = props;
  // const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const event = props.event;
  const registration = props.registration;
  const [teamDetails, setTeamDetails] = React.useState({});
  const [admin, setAdmin] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  const { webSocketContext } = React.useContext(WebSocketContext);


  React.useEffect(() => {
    fetchAll()
    // eslint-disable-next-line
  }, [props.registration])

  //   if (webSocketContext) {
  //     // console.log("xyshs")
  //     webSocketContext.onmessage = (message) => {
  //         const mes = JSON.parse(message.data);
  //         const cMes = mes.msg;
  //         console.log(mes);
  //         if(mes.action === "receive_team_status_status"){
  //             console.log("hurray")
  //             // getData()
  //             fetchAll()
  //         }
  //         // if (mes.team_id === registration.team_id) {
  //         //     // console.log(cMes);
  //         //     // setChatMessages(chatMessages => [...chatMessages, cMes]);
  //         // }
  //     }
  // }



  const fetchAll = () => {
    try {
      if(registration.team_id !== null){
        fetch(process.env.REACT_APP_API_URL + `/api/event/get_team_details?id=${registration.team_id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method: 'GET',
        }).then(response => {
          response.json().then(value => {
            // console.log(value);
            setTeamDetails(value[0]);
  
            if (value[0].user_id === currentUser.user_id) {
              setAdmin(true);
            }
          })
        })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const handleDeleteButton = () => {
    // const d = new Date();
    var data = new FormData();
    data = JSON.stringify({
      team_id: teamDetails._id,
    });
    // console.log(data);
    fetch(process.env.REACT_APP_API_URL + `/api/event/delete_team`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
      body: data
    }).then((response) => {
      response.json().then(value => {
        props.getData();
        // console.log(value);
        // props.fetchAll()

      })
    })
  }

  const handleLeaveButton = () => {
    const d = new Date();
    var data = new FormData();
    data = JSON.stringify({
      team_id: teamDetails._id,
      event_id: event._id
    });
    // console.log(data);
    fetch(process.env.REACT_APP_API_URL + `/api/event/leave_team`, {
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
          // console.log(value);
          props.getData();
          // props.fetchAll()
          if (webSocketContext) {
            webSocketContext.send(JSON.stringify({
              action: "team_status_update_message",
              team_id: registration.team_id,
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
            webSocketContext.send(JSON.stringify({
              action: "team_status_update_status",
              team_id: registration.team_id,
              users: teamDetails.members,
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
      }
    })
  }

  const handleEditButton = () => {
    setEditDialogOpen(true);
  }

  const handleClose = () => {
    setEditDialogOpen(false);
    fetchAll()
  }



  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}>
      {value === index && (
        <React.Fragment>
          <div className={classes.grid}>
            <Grid container component="main" >
              <Grid item xs={12} md={6}>
                <Box className={classes.root0}>
                  <Box className={classes.adminDetails}>
                    <Box>
                      <Avatar className={classes.avatar} alt={teamDetails.team_name} src="abc.jpg"></Avatar>
                    </Box>
                    <Box>
                      <Box>
                        <Typography variant="h5">{teamDetails.team_name}</Typography>
                      </Box>
                      <Box>
                        <Typography color="textSecondary" variant="body2">{teamDetails.description}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" justifyContent="flex-end">
                  {!admin && <Button onClick={handleLeaveButton}>Leave</Button>}
                  {admin && <Button onClick={handleEditButton}>Edit</Button>}
                  {admin && <Button onClick={handleDeleteButton}>Delete</Button>}
                </Box>
              </Grid>
            </Grid>
            <Grid container component="main" >
              <Grid item xs={12} md={6}>
                <Typography color="textSecondary" style={{ marginTop: "7px" }}>Team Members</Typography>
                {teamDetails.members !== undefined && <List dense={true}>
                  {teamDetails.members.map((v) => {
                    return <TeamMemberListItem fetchAll={fetchAll} admin={admin} event={props.event} id={teamDetails} user_id={v}></TeamMemberListItem>
                  })}
                </List>}
              </Grid>
              <Grid item xs={12} md={6}>
                {admin && <Typography color="textSecondary" style={{ marginTop: "7px" }}>Team up Requests</Typography>}
                {admin && <List dense={true}>
                  {
                    teamDetails.received_requests.map(v => {
                      return <TeamMemberRequestListItem fetchAll={fetchAll} event={props.event} id={teamDetails} user_id={v}></TeamMemberRequestListItem>
                    })
                  }
                </List>}
              </Grid>
            </Grid>
            <TeamEditDialog open={editDialogOpen} handleClose={handleClose} team_id={teamDetails._id} title={teamDetails.team_name} desc={teamDetails.description}></TeamEditDialog>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
export default AboutEventPanel;

// {/* <ChatMessage adminId={event.user_id} message={value} ></ChatMessage> */}
