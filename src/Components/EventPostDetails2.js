import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

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



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: theme.palette.secondary.main,
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


  const classes = useStyles();
  // const [loading, setLoading] = React.useState(false);
  // const [state, setState] = React.useState({
  //   open: false,
  //   vertical: 'top',
  //   horizontal: 'center',
  //   message: 'success',
  //   type: 'error'
  // });

  // const [eventThemes, setEventThemes] = React.useState(null);
  // const [selectedrequirements, setSelectedRequirements] = React.useState(null);
  // const [image, setImage] = React.useState(null);
  const [imageName, setImageName] = React.useState("");
  // const [addressType, setAddressType] = React.useState("");
  // const { vertical, horizontal, open, message, type } = state;
  const eventTypes = ["Hackathon", "Coding Contest", "Webinar"];
  const requirements = ["Laptop", "Basic HTML", "C++", "Machine Learning"];
  const colleges = ["VIT University", "GITAM University", "SRM University"];




  function handleeventTagsChange(event, values) {
    // setEventThemes(values);
    props.setThemes(values);
  }
  function handleRequirementsChange(event, values) {
    // setSelectedRequirements(values);
    props.setRequirements(values);
  }

  function handleChange(event) {
    if (event.target.files[0]) {
      // setImage(event.target.files[0]);
      props.setPoster(event.target.files[0]);
      const fileName = event.target.files[0].name;
      setImageName(fileName);
    }

  }
  function handleAddressTypeChange(evemt, value) {
    // setAddressType(value);
    props.setAdressType(value);
  }

  function handleRegLinkChange(event) {
    props.setRegLink(event.target.value);
  }

  function handleRegFees(event) {
    props.setFees(event.target.value);
  }

  function handleCollegeChange(event, value) {
    props.setCollegeName(value);
  }

  console.log(props.eventMode)



  return (
    <React.Fragment>

      <form className={classes.form} onSubmit={props.handleEventPost}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Autocomplete
              multiple
              id="tags-filled"
              options={eventTypes.map((option) => option)}
              freeSolo
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
          <Grid item xs={12} lg={6}>
            <TextField
              autoComplete='off'
              required
              id="regLink"
              name="regLink"
              label="Registration Link"
              fullWidth
              onChange={handleRegLinkChange}
            />
          </Grid>
          {props.feeType === "Paid" && <Grid item xs={12} lg={6}>
            <TextField
              autoComplete='off'
              required
              id="regFees"
              name="regFees"
              label="Registration Fees"
              fullWidth
              helperText={"Enter 0 if your event is free"}
              onChange={handleRegFees}
            />
          </Grid>}
          <Grid item xs={12} lg={6}>
            <TextField
              autoComplete='off'
              required
              id="organizer"
              name="organizer"
              label="Organizer"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Autocomplete
              multiple
              id="tags-filled"
              options={requirements.map((option) => option)}
              freeSolo
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
          <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                id="combo-box-demo"
                options={colleges}
                getOptionLabel={(option) => option}
                onChange={handleCollegeChange}
                renderInput={(params) => <TextField fullWidth required {...params} label="College" />}
              />
            </Grid>
          {props.eventMode === "offline" && <React.Fragment>
            <Grid item xs={12}>
              <FormLabel component="legend">Address</FormLabel>
              <RadioGroup aria-label="address" name="address" defaultValue="College/University" onChange={handleAddressTypeChange} style={{ display: "inline" }}>
                <FormControlLabel value="College/University" control={<Radio color="default" />} label="College/University" />
                <FormControlLabel value="Other" control={<Radio color="default" />} label="Others" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                autoComplete='off'
                // required
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
                options={colleges}
                getOptionLabel={(option) => option}
                onChange={handleCollegeChange}
                renderInput={(params) => <TextField fullWidth required {...params} label="Venue College" />}
              />
            </Grid>
          </React.Fragment>}

          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="primary" name="terms" />}
              label="I accept the terms and conditions"
            />
          </Grid>
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
          >Post
        </Button>
        </div>
      </form>
    </React.Fragment>
  );
}