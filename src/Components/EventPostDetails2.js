import React from 'react';


//MaterialUI imports
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
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
  const [imageName, setImageName] = React.useState("");
  const eventThemes = ["Hackathon", "Coding Contest", "Webinar"];
  const requirements = ["Laptop", "Basic HTML", "C++", "Machine Learning"];
  const [colleges, setColleges] = React.useState([]);
  const [collegesNames, setCollegesName] = React.useState([]);
  // const colleges = ["VIT University,Vellore", "GITAM University", "SRM University"];


  React.useEffect(() => {
    fetch('http://139.59.16.53:4000/api/colleges', {
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
  }, [token])


  function handleeventTagsChange(event, values) {
    props.setThemes(values);
  }
  function handleRequirementsChange(event, values) {
    props.setRequirements(values);
  }

  function handleChange(event) {
    if (event.target.files[0]) {
      props.setPoster(event.target.files[0]);
      const fileName = event.target.files[0].name;
      setImageName(fileName);
    }
  }
  function handleAddressTypeChange(evemt, value) {
    props.setAddressType(value);
  }

  function handleRegLinkChange(event) {
    props.setRegLink(event.target.value);
  }

  function handleRegFees(event) {
    props.setFees(event.target.value);
  }

  function handleCollegeChange(event, value) {
    console.log(value);
    props.setCollegeName(value);
    colleges.forEach(c => {
      if (c.name === value) {
        props.collegeId(c._id)
      }
    })
  }
  function handleVenueCollegeChange(event, value) {
    props.setVenueCollege(value);
  }

  function handleAboutChange(event) {
    props.setAbout(event.target.value);
  }
  function handleParticipantsTypeChange(event, value) {
    props.setParticipantsType(value)
  }
  function handleBuildingChange(event) {
    props.setBuilding(event.target.value);
  }
  function handleNext(event) {
    event.preventDefault();
    props.handleNext();
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
          <Grid item xs={12} lg={6}>
            <Autocomplete
              multiple
              id="themes"
              options={eventThemes.map((option) => option)}
              freeSolo
              value={props.eventThemes || []}
              onChange={handleeventTagsChange}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} label="Event Themes" placeholder="Event Themes" />
              )}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <input
              id="contained-button-file"
              required
              type="file"
              accept="image/*"
              onChange={handleChange}
              style={{ display: "none" }}>

            </input>

            <TextField
              autoComplete='off'
              required
              id="eventposter"
              name="eventposter"
              label="Event Poster"
              component="span"
              value={imageName}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <label htmlFor="contained-button-file">
                      <IconButton component="span" >
                        <CameraAltIcon></CameraAltIcon>
                      </IconButton>
                    </label>

                  </InputAdornment>
                ),
              }}
            />

          </Grid>
          {props.registrationMode !== "form" && <Grid item xs={12} lg={6}>
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
          </Grid>}

          {props.feeType === "Paid" && <Grid item xs={12} lg={6}>
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
          </Grid>}
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
                <TextField {...params} label="Requirements" placeholder="Requirements" />
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
            <RadioGroup aria-label="address" name="address" defaultValue="open" onChange={handleParticipantsTypeChange} style={{ display: "inline" }}>
              <FormControlLabel value="open" control={<Radio color="default" />} label="Open for all" />
              <FormControlLabel value="onlycollege" control={<Radio color="default" />} label={`Only ${props.college}`} />
            </RadioGroup>
          </Grid>
          {props.eventMode === "Offline" && <React.Fragment>
            <Grid item xs={12}>
              <FormLabel component="legend">Address</FormLabel>
              <RadioGroup aria-label="address" aria-disabled name="address" defaultValue="college" onChange={handleAddressTypeChange} style={{ display: "inline" }}>
                <FormControlLabel value="college" control={<Radio color="default" />} label="College/University" />
                <FormControlLabel disabled value="other" control={<Radio color="default" />} label="Others" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} lg={6}>
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
            </Grid>

          </React.Fragment>}
          {props.registrationMode !== "form" && <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="primary" name="terms" />}
              label="I accept the terms and conditions"
            />
          </Grid>
          }

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
          >{props.registrationMode !== "form" ? "POST" : "NEXT"}
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
}