import React from 'react';


//MaterialUI imports
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    borderRadius: 30,

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function AddressForm(props) {

  const token = localStorage.getItem('token');
  const classes = useStyles();
  // const [imageName, setImageName] = React.useState("");
  // const eventThemes = ["Hackathon", "Coding Contest", "Webinar"];
  // const requirements = ["Laptop", "Basic HTML", "C++", "Machine Learning"];
  const [colleges, setColleges] = React.useState([]);
  const [collegesNames, setCollegesName] = React.useState([]);
  const [eventTags, setEventTags] = React.useState([]);
  const [requirements, setRequirements] = React.useState([]);
  // const colleges = ["VIT University,Vellore", "GITAM University", "SRM University"];



  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/api/colleges', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'GET',
    }).then(response => {
      response.json().then(value => {
        setColleges(value);
        value.forEach((v) => {
          setCollegesName((collegesNames) => [...collegesNames, v.name])
        })
      })
    })
    fetch(process.env.REACT_APP_API_URL + '/api/event/get_event_keywords', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'GET',
    }).then(response => {
      response.json().then(value => {
        // setColleges(value);
        value.forEach((v) => {
          if (v.type === "EventTags") {
            setEventTags((eventTags) => [...eventTags, v.title]);
          }
          else if (v.type === "EventRequirements") {
            setRequirements((r) => [...r, v.title]);
          }
        })
      })
    })
  }, [token])


  function handleeventTagsChange(event, values) {
    props.setThemes(values);
  }
  function handleRequirementsChange(event, values) {
    props.setRequirements(values);
  }

  function handleAddressTypeChange(evemt, value) {
    props.setAddressType(value);
  }

  

  

  function handleCollegeChange(event, value) {
    props.setCollegeName(value);
    colleges.forEach(c => {
      if (c.name === value) {
        props.setCollegeId(c._id)
      }
    })
  }
  // function handleVenueCollegeChange(event, value) {
  //   props.setVenueCollege(value);
  // }

  function handleAboutChange(event) {
    props.setAbout(event.target.value);
  }
  function handleParticipantsTypeChange(event, value) {
    props.setParticipantsType(value)
  }
  function handleBuildingChange(event) {
    props.setBuilding(event.target.value);
  }
  function handlePlatformChange(event) {
    props.setPlatformDetails(event.target.value)
  }
  function handleNext(event) {
    event.preventDefault();
    props.handleNext();
  }

  function handleTeamChange(event, value) {
    if (value === "team") {
      props.setIsTeam(true);
    }
    else {
      props.setIsTeam(false);
    }
  }

  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={handleNext}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              multiline={true}
              rows="5"
              variant='outlined'
              placeholder="Enter everything about your event in detail"
              autoComplete='off'
              required
              id="about"
              name="about"
              label="About"
              fullWidth
              onChange={handleAboutChange}
              value={props.about || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="themes"
              options={eventTags.map((option) => option)}
              freeSolo
              value={props.eventThemes || []}
              onChange={handleeventTagsChange}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} label="Event Tags" placeholder="Event Tags" />
              )}
            />
          </Grid>
          {/* {props.registrationMode !== "form" && <Grid item xs={12} lg={6}>
            <TextField
              autoComplete='off'
              required
              id="regLink"
              name="regLink"
              label="Registration Link"
              fullWidth
              value={props.regLink || ""}
              onChange={handleRegLinkChange}
            />
          </Grid>} */}

          {/* {props.feeType === "Paid" && <Grid item xs={12} lg={6}>
            <TextField
              autoComplete='off'
              required
              id="regFees"
              name="regFees"
              label="Registration Fees"
              fullWidth
              value={props.regFees || ""}
              onChange={handleRegFees}
            />
          </Grid>} */}
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="tags-filled"
              options={requirements.map((option) => option)}
              freeSolo
              value={props.requirements || []}
              onChange={handleRequirementsChange}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} label="Prerequisites" placeholder="Requirements" />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              id="combo-box-demo"
              options={collegesNames}
              value={props.college || []}
              getOptionLabel={(option) => option}
              onChange={handleCollegeChange}
              renderInput={(params) => <TextField fullWidth required {...params} label="College" />}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">Participation</FormLabel>
            <RadioGroup aria-label="participation" name="participation" value={props.participantsType} onChange={handleParticipantsTypeChange} style={{ display: "inline" }}>
              <FormControlLabel value="open" control={<Radio color="default" />} label="Open for all" />
              <FormControlLabel value="onlycollege" control={<Radio color="default" />} label={`Only ${props.college}`} />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <FormLabel required component="legend">Participation Type</FormLabel>
            <RadioGroup required aria-label="participation_type" name="participation_type" value={props.isTeam ? "team" : "individual"} onChange={handleTeamChange} style={{ display: "inline" }}>
              <FormControlLabel value="individual" control={<Radio color="default" />} label="Individual" />
              <FormControlLabel value="team" control={<Radio color="default" />} label="Team" />
            </RadioGroup>
          </Grid>
          {props.isTeam && <Grid item xs={12} lg={6}>
            <TextField
              autoComplete='off'
              required
              type="number"
              id="maxTeam"
              name="minTeam"
              label="Minimum Team Members"
              fullWidth
              value={props.minTeamSize || ""}
              onChange={(e) => { props.setMinTeamSize(e.target.value) }}
            />
          </Grid>}
          {props.isTeam && <Grid item xs={12} lg={6}>
            <TextField
              autoComplete='off'
              required
              type="number"
              id="maxTeam"
              name="maxTeam"
              label="Maximum Team Members"
              fullWidth
              value={props.maxTeamSize || ""}
              onChange={(e) => { props.setMaxTeamSize(e.target.value) }}
            />
          </Grid>}
          {props.eventMode === "Online" && <Grid item xs={12}>
            <TextField
              multiline={true}
              helperText="Enter links of your and you can also add or edit later in event edit"
              rows="5"
              variant='outlined'
              placeholder="Enter details about your online platform"
              autoComplete='off'
              // required
              id="platform"
              name="platform"
              label="Platform"
              fullWidth
              onChange={handlePlatformChange}
              value={props.platformDetails || ""}
            />
          </Grid>}
          {props.eventMode === "Offline" && <React.Fragment>
            <Grid item xs={12}>
              <FormLabel component="legend">Venue</FormLabel>
              <RadioGroup aria-label="address" aria-disabled name="address" defaultValue="college" onChange={handleAddressTypeChange} style={{ display: "inline" }}>
                <FormControlLabel value="College" control={<Radio color="default" />} label="College/University" />
                <FormControlLabel value="Other" control={<Radio color="default" />} label="Others" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline={true}
                helperText="Enter links of your and you can also add or edit later in event edit"
                rows="5"
                variant='outlined'
                placeholder="Room No,Building,College,State,Pincode"
                autoComplete='off'
                onChange={handleBuildingChange}
                value={props.building}
                id="building"
                name="building"
                label="Venue"
                fullWidth
              />
            </Grid>
            {/* <Grid item xs={12} lg={6}>
              <TextField
                autoComplete='off'
                onChange={handleBuildingChange}
                value={props.building}
                id="building"
                name="building"
                label="Room No & Building"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                id="combo-box-demo"
                options={collegesNames}
                getOptionLabel={(option) => option}
                value={props.venueCollege}
                onChange={handleVenueCollegeChange}
                renderInput={(params) => <TextField fullWidth required {...params} label="Venue College" />}
              />
            </Grid> */}
          </React.Fragment>}
        </Grid>
        <div className={classes.buttons}>
          <Button onClick={props.handleBack} className={classes.button}>
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >{"NEXT"}
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
}