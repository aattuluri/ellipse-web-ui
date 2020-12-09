import React from 'react';
import { Button, TextField, Typography, Box, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
// import PeopleIcon from '@material-ui/icons/People';
import Grid from '@material-ui/core/Grid';
// import Autocomplete from '@material-ui/lab/Autocomplete';


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

  }

}));

function AboutEventPanel(props) {
  const classes = useStyles();
  const { children, value, url, index, ...other } = props;
  // const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const event = props.event;
  const [teams, setTeams] = React.useState([]);
  const [sentRequests, setSentRequests] = React.useState([]);

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [])

  const getData = () =>{
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
          console.log(value);
          setTeams(value);
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
          console.log(value[0].sent_requests)
          setSentRequests(value[0].sent_requests);
        })
      })
    }
    catch (e) {
      console.log(e);
    }
  }

  const handleRequestButton = (id) => () => {
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
      response.json().then(value => {
        // console.log(value);
        getData()
        // setUpdated(true);
      })
    })
  }

  const handleWithdrawButton = (id) => () => {
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
      response.json().then(value => {
        // console.log(value);
        // setUpdated(true);
        getData();
      })
    })
  }
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}>
      {value === index && (
        <div className={classes.root}>
          <TextField variant="outlined" label="Team id" fullWidth margin="dense"></TextField>
          <Box display="flex" justifyContent="center">
            <Button fullWidth color="primary" className={classes.button} variant="contained">Join</Button>
          </Box>
          <Typography >Sent Requests</Typography>
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
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box display="flex" justifyContent="flex-end">
                      <Button>View Members</Button>
                      <Button onClick={handleWithdrawButton(searchedTeam._id)}>Withdraw</Button>
                    </Box>
                  </Grid>
                </Grid>
              }
              else {
                return null
              }

            })
          }
          {/* <Typography>No Sent Request</Typography> */}
          <Typography>All Teams</Typography>
          {/* <TextField label="Search(Team Name)" variant="filled" style={{height:"40px"}}></TextField> */}
          {/* <Autocomplete
                freeSolo
                id="search"
                placeholder="search.."
                // options={allEvents}
                // getOptionLabel={(option) => option.name}
                // onChange={handleSearchChange}
                renderInput={(params) => <TextField {...params} placeholder="search.."
                  className={classes.inputInput} />}
              /> */}
          {/* <div style={{margin:'0px',padding:'0px',height:'350px', overflowY:'auto'}}> */}
          <div>
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
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box display="flex" justifyContent="flex-end">
                        <Button>View Members</Button>
                        <Button onClick={handleRequestButton(v._id)}>Request</Button>
                      </Box>
                    </Grid>
                  </Grid>
                }
                else{
                  return null
                }

              })
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default AboutEventPanel;
