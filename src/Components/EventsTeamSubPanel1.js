import React from 'react';
import { Typography, Box, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import TeamMemberListItem from './TeamMemberListItem';
import TeamMemberRequestListItem from './TeamMemberRequestListItem';

import AuthContext from '../AuthContext';
import TeamEditDialog from './EditTeamDialog';


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
    backgroundColor: "rgb(0, 189, 170,0.1)",
    maxWidth: '99%',
    marginTop: theme.spacing(2)

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

  React.useEffect(() => {
    fetchAll()
    // eslint-disable-next-line
  }, [])

  const fetchAll = () => {
    try {
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
    catch (e) {
      console.log(e);
    }
  }

  const handleDeleteButton = () => {
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
        // console.log(value);
        // props.fetchAll()
      })
    })
  }

  const handleLeaveButton = () => {
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
      response.json().then(value => {
        console.log(value);
        // props.fetchAll()
      })
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
        <div className={classes.grid}>
          <Grid container component="main" >
            <Grid item xs={12} md={6}>
              <Box className={classes.root0}>
                <Box className={classes.adminDetails}>
                  <Box>
                    <Avatar className={classes.avatar} alt={teamDetails.team_name}>S</Avatar>
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
      )}
    </div>
  );
}
export default AboutEventPanel;
