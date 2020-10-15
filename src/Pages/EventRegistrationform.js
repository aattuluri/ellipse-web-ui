import React from 'react';
import Copyright from '../Components/copyright';
import useStyles from '../Themes/SignupPageStyles';
import { withRouter } from 'react-router';
// import axios from 'axios';

//MaterialUI imports
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Backdrop from '@material-ui/core/Backdrop';
import AuthContext from '../AuthContext';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FormLabel from '@material-ui/core/FormLabel';
import { MuiPickersUtilsProvider, DateTimePicker, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import { set } from 'date-fns';
// import AuthContext from '../AuthContext';


//function for alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Signup = (props) => {
  const classes = useStyles();
  const token = localStorage.getItem('token');
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: 'success',
    type: 'error',
    autoHide: 6000,
  });

  const [canRegister, setCanRegister] = React.useState(true);
  const [userMessage, setUserMessage] = React.useState(false);

  const [formValues, setFormValues] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  // const [fields, setFields] = React.useState([]);
  const [normalFields, setNormalFields] = React.useState([]);
  const [dropDownFields, setDropDownFields] = React.useState([]);
  const [checkboxFields, setCheckBoxFields] = React.useState([]);
  const [radioFields, setRadioFields] = React.useState([]);
  const [dateFields, setDateFields] = React.useState([]);
  const [longDescFields, setLongDescFields] = React.useState([]);
  const [linkFields, setLinkFields] = React.useState([]);

  const { vertical, horizontal, open, message, type, autoHide } = state;
  const id = props.match.params.eventId;
  const [backDropOpen, setBackDropOpen] = React.useState(true);
  const [event, setEvent] = React.useState({});
  const [checkedValues, setCheckedValues] = React.useState([]);
  const colleges = ["VIT University,Vellore", "GITAM University", "SRM University"];

  const user = React.useContext(AuthContext);

  React.useEffect(() => {
    if (user.designation === "Student" || user.designation === "Faculty") {
      // setUserType(true);
    }
    else {
      setCanRegister(false);
      setUserMessage("You are " + user.designation + " so you cannot register")
    }
    if (user.user_id === event.user_id) {
      setCanRegister(false)
      setUserMessage("You are event organizer so you cannot register")
    }
    const cDate = new Date();
    const eDate = new Date(event.registration_end_time);
    if (cDate > eDate) {
      setCanRegister(false)
      setUserMessage("Registration closed")

    }
  }, [event, user.designation, user.user_id])


  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/api/event?id=${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'GET',
    }).then(response => {
      console.log(response);
      response.json().then(value => {
        setEvent(value.event);
        // setFields(value.event.regFields);
        const allFields = value.event.reg_fields;
        console.log(allFields);
        if (allFields != null) {
          allFields.forEach(f => {
            if (f.title === "Name") {
              setFormValues(formValues => ({ ...formValues, [f.title]: user.name }))
            }
            else if (f.title === "Email") {
              setFormValues(formValues => ({ ...formValues, [f.title]: user.email }));
            }
            else if (f.title === "College") {
              setFormValues(formValues => ({ ...formValues, [f.title]: user.college_name }));
            }
            else {
              setFormValues(formValues => ({ ...formValues, [f.title]: null }));
            }
            if (f.field === "checkbox") {

            }

          })
          // const filteredFields = allFields.filter(f => f.field !== "checkbox")
          setNormalFields(allFields.filter(f => f.field === "short_text"));
          setLongDescFields(allFields.filter((f) => f.field === "paragraph"));
          setCheckBoxFields(allFields.filter((f) => f.field === "checkboxes"));
          setRadioFields(allFields.filter(f => f.field === "radiobuttons"));
          setDateFields(allFields.filter((f) => f.field === "date"));
          // setLongDescFields(allFields.filter((f) => f.field === "long_desc"));
          setDropDownFields(allFields.filter(f => f.field === "dropdown"));
          setLinkFields(allFields.filter(f => f.field === "link"));

        }
        setBackDropOpen(false);
      })
    })
  }, [token, id, user])

  function handleClose() {
    if (message === "Registered successfully") {
      props.history.push('/home')
      window.location.reload(false);
    }
    setState({ ...state, open: false });
  }

  function handleChange(event) {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  }
  const handleChange2 = (name) => (event, values) => {
    setFormValues({ ...formValues, [name]: values });

  }
  const handleChange3 = (name) => (event) => {
    if (event.target.checked) {
      setCheckedValues(checkedValues => [...checkedValues, { [name]: event.target.name }]);
      const array = [];
      checkedValues.forEach((v, i) => {
        if (v[name]) {
          array.push(v[name])
        }
      });
      array.push(event.target.name);
      setFormValues({ ...formValues, [name]: array });
    }
  }

  const handleDateChange = (name) => (date) => {
    // console.log(name);
    // console.log(date);
    setFormValues({ ...formValues, [name]: date })
  };

  const handleLondDescChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  function handleradioChange(event, value) {
    // console.log(event.target.name);
    // console.log(value);
    setFormValues({ ...formValues, [event.target.name]: value });
    // props.setFeeType(value)
  }

  function handleEventRegistration(e) {
    e.preventDefault();
    // setLoading(true);
    // console.log(checkedValues);
    console.log(formValues);
    const formkeys = Object.keys(formValues);
    formkeys.forEach(v => {
      if (formValues[v] === null) {
        setState({
          open: true,
          vertical: 'top',
          horizontal: 'center',
          message: 'Please fill in all fields',
          type: "error",
          autoHide: 4000
        });
      }
    })
    try {
      var data = new FormData();
      const d = { data: formValues }
      data = JSON.stringify(d);
      fetch(process.env.REACT_APP_API_URL + `/api/event/register?id=${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'POST',
        body: data
      }).then(response => {
        console.log(response);
        response.json().then(value => {
          console.log(value);

          setLoading(false);
          setState({
            open: true,
            vertical: 'top',
            horizontal: 'center',
            message: 'Registered successfully',
            type: "success",
            autoHide: 200
          });
        })
      })
    }
    catch (error) {
      setLoading(false);
      setState({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: error.message,
        type: "error",
        autoHide: 6000
      })

    }

  }

  function handleBack() {
    props.history.goBack();
  }



  return (

    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={autoHide}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={type}>{message}</Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={backDropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <IconButton aria-label="close" className={classes.closeButton} onClick={handleBack}>
        <CloseIcon fontSize="large" />
      </IconButton>
      {event != null &&
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {"Registration for " + event.name}
          </Typography>
          <form className={classes.form} onSubmit={handleEventRegistration}>

            <Grid container spacing={2}>
              {normalFields.map((field, index) => {
                if (field.title === "College") {
                  return (
                    <Grid item xs={12}>
                      <Autocomplete
                        fullWidth
                        id={field.title}
                        options={colleges}
                        getOptionLabel={(option) => option}
                        onChange={handleChange}
                        value={formValues[field.title]}
                        disabled
                        renderInput={(params) => <TextField name={field.title} fullWidth required {...params} label={field.title} />}
                      />
                    </Grid>)
                }
                else if (field.title === "Email") {
                  return (
                    <Grid item xs={12}>
                      <TextField
                        autoComplete='off'
                        name={field.title}
                        disabled
                        // variant="outlined"
                        required
                        fullWidth
                        id={field.title}
                        onChange={handleChange}
                        value={formValues[field.title]}
                        label={field.title}
                        autoFocus
                      />
                    </Grid>)
                }
                else {
                  return (
                    <Grid item xs={12}>
                      <TextField
                        autoComplete='off'
                        name={field.title}
                        // variant="outlined"
                        required
                        fullWidth
                        id={field.title}
                        onChange={handleChange}
                        value={formValues[field.title]}
                        label={field.title}
                        autoFocus
                      />
                    </Grid>)
                }

              })}
              {checkboxFields.map((field, index) => {
                return (
                  <Grid item xs={12}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">{field.title}</FormLabel>
                      <FormGroup class={classes.formgroup}>
                        {field.options.map((option) => {
                          return <FormControlLabel
                            control={<Checkbox color="primary" onChange={handleChange3(field.title)} name={option} />}
                            label={option}
                          />
                        })}
                      </FormGroup>
                    </FormControl>
                    {/* <Autocomplete
                      id={field.name}
                      multiple
                      // value={}
                      onChange={handleChange2(field.name)}
                      options={field.options.map((option) => option)}
                      getOptionLabel={(option) => option}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField {...params} name={field.name} label={field.name} placeholder={field.name} />
                      )}
                    /> */}
                  </Grid>
                )
              })}
              {dropDownFields.map((field, index) => {
                return (
                  <Grid item xs={12}>
                    <Autocomplete
                      id={field.title}
                      options={field.options.map((option) => option)}
                      // freeSolo
                      // onChange={handleeventTagsChange}
                      onChange={handleChange2(field.title)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField {...params} name={field.name} label={field.title} placeholder={field.name} />
                      )}
                    />
                  </Grid>
                )
              })}
              {radioFields.map((field, index) => {
                return (
                  <Grid item xs={12}>
                    <FormLabel required component="legend">{field.title}</FormLabel>
                    <RadioGroup required aria-label="address" name={field.title} value={formValues[field.title]} onChange={handleradioChange} style={{ display: "inline" }}>
                      {field.options.map((option) => {
                        return <FormControlLabel value={option} control={<Radio color="default" />} label={option} />
                      })}

                      {/* <FormControlLabel value="Paid" control={<Radio color="default" />} label="Paid" /> */}
                    </RadioGroup>
                  </Grid>
                )
              })}
              {
                dateFields.map((field, index) => {
                  return (
                    <Grid item xs={12}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                          // minDate={Date.now()}
                          fullWidth
                          required
                          variant="inline"
                          format="dd MMM yyyy hh:mm a zzz"
                          margin="normal"
                          id="startDate"
                          label="Start Date"
                          name="startDate"
                          value={formValues[field.title]}
                          onChange={handleDateChange(field.title)}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>

                    </Grid>
                  )
                })
              }
              {
                longDescFields.map((field, index) => {
                  return (
                    <Grid item xs={12}>
                      <TextField
                        multiline={true}
                        rows="5"
                        variant='outlined'
                        placeholder={field.title}
                        autoComplete='off'
                        required
                        id={field.title}
                        name={field.title}
                        label={field.title}
                        fullWidth
                        onChange={handleLondDescChange}
                      // value={props.about}
                      />
                    </Grid>
                  )
                })
              }
              {
                linkFields.map((field, index) => {
                  return (
                    <Grid item xs={12}>
                      <TextField
                        autoComplete='off'
                        name={field.title}
                        // variant="outlined"
                        required
                        fullWidth
                        id={field.title}
                        onChange={handleChange}
                        value={formValues[field.title]}
                        label={field.title}
                        autoFocus
                      />
                    </Grid>)
                })
              }

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="primary" name="terms" />}
                  label="I accept the terms and conditions"
                />
              </Grid>
            </Grid>
            {canRegister && <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.submit}
            >
              {loading ? <CircularProgress color="primary" size={24} /> : "Register"}
            </Button>}
            {
              !canRegister && <Typography>{userMessage}</Typography>
            }
          </form>
        </div>
      }

      {/* </Grid> */}
      <Box mt={2}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(Signup);


