import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { fade, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import WebSocketContext from '../WebSocketContext';
import AuthContext from '../AuthContext';
import Autocomplete from '@material-ui/lab/Autocomplete';

import TeamMemberListItem from './TeamMemberListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0),
  },

  button: {
    margin: theme.spacing(1),
    borderRadius: theme.spacing(2),
    maxWidth: "260px"
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
  root1: {
    display: "flex",
    justifyContent: "flex-start",
    borderRadius: theme.spacing(3),
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: "rgb(0, 189, 170,0.2)",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(1)
  },
  avatar2: {
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(1)
  },
  grid: {
    borderRadius: theme.spacing(3),
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    backgroundColor: "rgb(0, 189, 170,0.2)",
    maxWidth: '99%'

  },
  progress: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  search: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    maxWidth: "300px",
    padding: theme.spacing(0.5)
  }

}));

function AboutEventPanel(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: 'success',
    type: 'error',
    autoHide: 6000,
  });
  const { children, value, url, index, ...other } = props;
  // const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const event = props.event;
  const [teams, setTeams] = React.useState([]);
  const [sortedTeams, setSortedTeams] = React.useState(null);
  const [sentRequests, setSentRequests] = React.useState([]);
  const [showMembers, setShowMembers] = React.useState(false);
  const [teamIndex, setTeamIndex] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { currentUser } = React.useContext(AuthContext);

  const { webSocketContext } = React.useContext(WebSocketContext);
  const { vertical, horizontal, open, message, type, autoHide } = state;

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [])

  function handleClose() {
    if (message === "Successful.Stay tunned with notifications and announcements") {
      props.fetchAll();
    }
    setState({ ...state, open: false });
  }

  const getData = () => {
    setLoading(true);
    try {
      fetch(process.env.REACT_APP_API_URL + `/api/event/get_all_teams?id=${event._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'GET',
      }).then(response => {
        response.json().then(value => {
          // console.log(value);
          setTeams(value);
          setLoading(false);
        })
      })
    }
    catch (e) {
      console.log(e);
    }
    try {
      fetch(process.env.REACT_APP_API_URL + `/api/event/get_user_registration?id=${event._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'GET',
      }).then(response => {
        response.json().then(value => {
          setSentRequests(value[0].sent_requests);
        })
      })
    }
    catch (e) {
      console.log(e);
    }
  }

  const handleRequestButton = (id, team) => () => {
    const d = new Date();
    var data = new FormData();
    data = JSON.stringify({
      event_id: event._id,
      team_id: id,
    });
    fetch(process.env.REACT_APP_API_URL + `/api/event/user_teamup_request`, {
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
          // getData()
          // setUpdated(true);
          setSortedTeams(null);
          if (webSocketContext) {
            webSocketContext.send(JSON.stringify({
              action: "team_status_update_message",
              team_id: id,
              msg: {
                'id': currentUser.user_id + Date.now(),
                'user_id': currentUser.user_id,
                'user_name': currentUser.name,
                'user_pic': currentUser.profile_pic,
                'message_type': 'team_status_update_message',
                'message': currentUser.name + " has requested to join the team",
                'date': d.toISOString()
              }
            }));
            webSocketContext.send(JSON.stringify({
              action: "team_status_update_status",
              team_id: id,
              users: team.members,
              msg: {
                'id': currentUser.user_id + Date.now(),
                'user_id': currentUser.user_id,
                'user_name': currentUser.name,
                'user_pic': currentUser.profile_pic,
                'message_type': 'team_status_update_message',
                'message': currentUser.name + " has requested to join the team",
                'date': d.toISOString()
              }
            }));
            getData();
          }
        })
      }
    })
  }

  const handleWithdrawButton = (id, team) => () => {
    // console.log(id);
    // console.log(team);
    var data = new FormData();
    data = JSON.stringify({
      event_id: event._id,
      team_id: id,
    });
    fetch(process.env.REACT_APP_API_URL + `/api/event/user_teamwithdraw_request`, {
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
          // setUpdated(true);
          const d = new Date();

          if (webSocketContext) {
            webSocketContext.send(JSON.stringify({
              action: "team_status_update_message",
              team_id: id,
              msg: {
                'id': currentUser.user_id + Date.now(),
                'user_id': currentUser.user_id,
                'user_name': currentUser.name,
                'user_pic': currentUser.profile_pic,
                'message_type': 'team_status_update_message',
                'message': currentUser.name + " has withdrawn the team join request",
                'date': d.toISOString()
              }
            }));
            webSocketContext.send(JSON.stringify({
              action: "team_status_update_status",
              team_id: id,
              users: team.members,
              msg: {
                'id': currentUser.user_id + Date.now(),
                'user_id': currentUser.user_id,
                'user_name': currentUser.name,
                'user_pic': currentUser.profile_pic,
                'message_type': 'team_status_update_message',
                'message': currentUser.name + " has withdrawen the team join request",
                'date': d.toISOString()
              }
            }));
            getData();
          }
        })
      }

    })
  }

  const handleViewMembersClick = (v) => () => {

    if (showMembers) {

      if (teamIndex !== {}) {
        if (teamIndex === v) {
          setShowMembers(false);
          setTeamIndex({});
        }
        else {
          setTeamIndex(v)
        }
      }
      else {
        setShowMembers(false);
        setTeamIndex({});
      }

    }
    else {
      setShowMembers(true);
      setTeamIndex(v);
    }
  }

  const handleTeamSearch = (e, value) => {
    // console.log(value);
    setSortedTeams(value);
    // teams.
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}>
      {value === index && (
        <div className={classes.root}>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            autoHideDuration={autoHide}
            onClose={handleClose}
            key={vertical + horizontal}
          >
            <Alert onClose={handleClose} severity={type}>{message}</Alert>
          </Snackbar>
          <div className={classes.progress}>
            <Fade
              in={loading}
              unmountOnExit>
              <CircularProgress />
            </Fade>
          </div>
          {sentRequests.length !== 0 && <Typography variant="body2" color="textSecondary">Sent Requests</Typography>}
          {
            sentRequests.map((v) => {
              const searchedTeam = teams.find(t => t._id === v);
              if (searchedTeam) {
                return <Grid container component="main" className={classes.grid}>
                  <Grid item xs={12} md={6}>
                    <Box className={classes.root0}>
                      <Box className={classes.adminDetails}>
                        <Box>
                          <Avatar className={classes.avatar} alt={searchedTeam.team_name}>{searchedTeam.team_name[0]}</Avatar>
                        </Box>
                        <Box>
                          <Box>
                            <Typography variant="h5">{searchedTeam.team_name}</Typography>
                          </Box>
                          <Box>
                            <Typography color="textSecondary" variant="body2">{searchedTeam.description}</Typography>
                            {showMembers && searchedTeam === teamIndex && <div>
                              {
                                searchedTeam.members.map((value, index) => {
                                  return <TeamMemberListItem admin={false} event={props.event} id={searchedTeam} user_id={value}></TeamMemberListItem>
                                })
                              }
                            </div>}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box display="flex" justifyContent="flex-end">
                      <Button disabled={loading} onClick={handleViewMembersClick(searchedTeam)}>{(showMembers && searchedTeam === teamIndex) ? "Hide Members" : "View Members"}</Button>
                      <Button disabled={loading} onClick={handleWithdrawButton(searchedTeam._id, searchedTeam)}>Withdraw</Button>
                    </Box>
                  </Grid>
                </Grid>
              }
              else {
                return null
              }
            })
          }
          <Typography variant="body2" color="textSecondary">All Teams</Typography>
          <Box display="flex" justifyContent="flex-end">

            <Autocomplete
              id="search"
              placeholder="Search.."
              options={teams}
              fullWidth
              variant="filled"
              className={classes.search}
              getOptionLabel={(option) => option.team_name}
              onChange={handleTeamSearch}

              renderInput={(params) => <TextField {...params} placeholder="Search.."
                className={classes.inputInput} />}
            />
          </Box>

          {!loading && teams.length === 0 && <Typography>No Teams Found Create one</Typography>}
          {sortedTeams === null ? <div>
            {
              teams.map(v => {
                if (!sentRequests.includes(v._id)) {
                  return <Grid container component="main" className={classes.grid}>
                    <Grid item xs={12} md={6}>
                      <Box className={classes.root0}>
                        <Box className={classes.adminDetails}>
                          <Box>
                            <Avatar className={classes.avatar} alt={v.team_name}>{v.team_name[0]}</Avatar>
                          </Box>
                          <Box>
                            <Box>
                              <Typography variant="h5">{v.team_name}</Typography>
                            </Box>
                            <Box>
                              <Typography color="textSecondary" variant="body2">{v.description}</Typography>
                              {showMembers && v === teamIndex && <div>
                                {
                                  v.members.map((value, index) => {
                                    return <TeamMemberListItem admin={false} event={props.event} id={v} user_id={value}></TeamMemberListItem>
                                  })
                                }
                              </div>}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box display="flex" justifyContent="flex-end">
                        <Button disabled={loading} onClick={handleViewMembersClick(v)}>{(showMembers && v === teamIndex) ? "Hide Members" : "View Members"}</Button>
                        <Button disabled={loading} onClick={handleRequestButton(v._id, v)}>Request</Button>
                      </Box>
                    </Grid>
                  </Grid>
                }
                else {
                  return null
                }
              })
            }
          </div> : <div>{!sentRequests.includes(sortedTeams._id) && <Grid container component="main" className={classes.grid}>
            <Grid item xs={12} md={6}>
              <Box className={classes.root0}>
                <Box className={classes.adminDetails}>
                  <Box>
                    <Avatar className={classes.avatar} alt={sortedTeams.team_name}>{sortedTeams.team_name[0]}</Avatar>
                  </Box>
                  <Box>
                    <Box>
                      <Typography variant="h5">{sortedTeams.team_name}</Typography>
                    </Box>
                    <Box>
                      <Typography color="textSecondary" variant="body2">{sortedTeams.description}</Typography>
                      {showMembers && sortedTeams === teamIndex && <div>
                        {
                          sortedTeams.members.map((value, index) => {
                            return <TeamMemberListItem admin={false} event={props.event} id={sortedTeams} user_id={value}></TeamMemberListItem>
                          })
                        }
                      </div>}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="flex-end">
                <Button disabled={loading} onClick={handleViewMembersClick(sortedTeams)}>{(showMembers && sortedTeams === teamIndex) ? "Hide Members" : "View Members"}</Button>
                <Button disabled={loading} onClick={handleRequestButton(sortedTeams._id, sortedTeams)}>Request</Button>
              </Box>
            </Grid>
          </Grid>}</div>}
        </div>
      )}
    </div>
  );
}

export default AboutEventPanel;
