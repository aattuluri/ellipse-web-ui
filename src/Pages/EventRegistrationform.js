import React from 'react';
import useStyles from '../Themes/SignupPageStyles';
import { withRouter } from 'react-router';
import DateFnsUtils from '@date-io/date-fns';

//MaterialUI imports
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
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
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Box from '@material-ui/core/Box';

//other component imports
import TermsandConditions from '../Components/EventRegisterTermsandConditions';
import EventsContext from '../EventsContext';
import ActiveEventsContext from '../ActiveEventsContext';
import SuccessPanel from '../Components/SuccessPanel';


//function for alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EventRegistrationForm = (props) => {
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
  const [uploadFiles, setUploadFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [normalFields, setNormalFields] = React.useState([]);
  const [dropDownFields, setDropDownFields] = React.useState([]);
  const [checkboxFields, setCheckBoxFields] = React.useState([]);
  const [radioFields, setRadioFields] = React.useState([]);
  const [dateFields, setDateFields] = React.useState([]);
  const [longDescFields, setLongDescFields] = React.useState([]);
  const [linkFields, setLinkFields] = React.useState([]);
  const [fileUploadFields, setFileUploadFields] = React.useState([]);

  const { vertical, horizontal, open, message, type, autoHide } = state;
  const id = props.match.params.eventId;
  const [backDropOpen, setBackDropOpen] = React.useState(true);
  const [event, setEvent] = React.useState({});
  const [checkedValues, setCheckedValues] = React.useState([]);
  const colleges = ["VIT University,Vellore", "GITAM University", "SRM University"];
  const [tandcOpen, setTandcOpen] = React.useState(false);
  const [showSuccessPanel, setShowSuccessPanel] = React.useState(false);

  const { currentUser } = React.useContext(AuthContext);
  const { setAllEvents } = React.useContext(EventsContext);
  const { setActiveEvents } = React.useContext(ActiveEventsContext);


  function handleTermsClick() {
    setTandcOpen(true);
  }

  React.useEffect(() => {
    if (currentUser.designation === "Student" || currentUser.designation === "Faculty") {
      // setUserType(true);
    }
    else {
      setCanRegister(false);
      setUserMessage(currentUser.designation + " cannot register")
    }
    if (event.status === 'pending') {
      setCanRegister(false)
      setUserMessage("Event is not accepted yet check back later");
    }
    if (currentUser.user_id === event.user_id) {
      setCanRegister(false)
      setUserMessage("An event organizer cannot register")
    }
    const cDate = new Date();
    const eDate = new Date(event.registration_end_time);
    if (cDate > eDate) {
      setCanRegister(false)
      setUserMessage("Registration is closed for this event")
    }

    if (event.o_allowed !== undefined) {
      if (!event.o_allowed) {
        if (event.college_name === currentUser.college_name) {

        } else {
          setCanRegister(false)
          setUserMessage("Only " + event.college_name + " can participate")
        }
      }
    }

  }, [event, currentUser])


  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/api/event?id=${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'GET',
    }).then(response => {
      response.json().then(value => {
        setEvent(value.event);
        const allFields = value.event.reg_fields;
        if (allFields != null) {
          allFields.forEach(f => {
            if (f.title === "Name") {
              setFormValues(formValues => ({ ...formValues, [f.title]: currentUser.name }))
            }
            else if (f.title === "Email") {
              setFormValues(formValues => ({ ...formValues, [f.title]: currentUser.email }));
            }
            else if (f.title === "College") {
              setFormValues(formValues => ({ ...formValues, [f.title]: currentUser.college_name }));
            }
            else {
              setFormValues(formValues => ({ ...formValues, [f.title]: null }));
            }
            if (f.field === "checkbox") {

            }

          })
          setNormalFields(allFields.filter(f => f.field === "short_text"));
          setLongDescFields(allFields.filter((f) => f.field === "paragraph"));
          setCheckBoxFields(allFields.filter((f) => f.field === "checkboxes"));
          setRadioFields(allFields.filter(f => f.field === "radiobuttons"));
          setDateFields(allFields.filter((f) => f.field === "date"));
          setDropDownFields(allFields.filter(f => f.field === "dropdown"));
          setLinkFields(allFields.filter(f => f.field === "link"));
          setFileUploadFields(allFields.filter(f => f.field === "file"));
        }
        setBackDropOpen(false);
      })
    })
  }, [token, id, currentUser])

  function handleClose() {
    if (message === "Registration successful.Stay tunned with notifications and announcements") {
      fetch(process.env.REACT_APP_API_URL + '/api/events', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'GET'
      }).then(response => {
        if (response.status === 200) {
          response.json().then(value => {
            value.sort((a, b) => {
              return new Date(a.start_time) - new Date(b.start_time);
            })
            setAllEvents(value);
            setActiveEvents(value.filter(e => {
              const cDate = new Date();
              const eDate = new Date(e.finish_time);
              return cDate < eDate && e.status !== "pending"
            }))
          })
        }
        else if (response.status === 401) {
          localStorage.removeItem('token');
        }

      })
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
    setFormValues({ ...formValues, [name]: date })
  };

  const handleLondDescChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  function handleradioChange(event, value) {
    setFormValues({ ...formValues, [event.target.name]: value });
  }

  function handleEventRegistration(e) {
    e.preventDefault();
    var uploadedFilesIds = [];
    const formkeys = Object.keys(formValues);
    const fileFormKeys = Object.keys(uploadFiles);
    var count = 0;
    formkeys.forEach(v => {
      const cField = event.reg_fields.filter((value) => { return value.title === v });
      if (formValues[v] === null) {
        if (v.includes(fileFormKeys)) {

        } else {
          if (cField[0].req) {
            count = count + 1;
            setState({
              open: true,
              vertical: 'top',
              horizontal: 'center',
              message: 'Please fill in all required fields',
              type: "error",
              autoHide: 4000
            });
          }

        }
      }
    })
    if (fileFormKeys) {
      fileFormKeys.forEach(f => {
        const cField = event.reg_fields.filter((value) => { return value.title === f });
        if (uploadFiles[f] === null) {
          if (cField[0].req) {
            count = count + 1;
            setState({
              open: true,
              vertical: 'top',
              horizontal: 'center',
              message: 'Please fill in all required fields',
              type: "error",
              autoHide: 4000
            });
          }

        }
      })
    }

    var finalValues = formValues;
    if (count === 0) {
      try {
        if (fileFormKeys.length > 0) {
          fileFormKeys.forEach((key, index) => {
            var data1 = new FormData();
            data1.append('uploaded_file', uploadFiles[key]);
            fetch(process.env.REACT_APP_API_URL + `/api/event/register/upload_file?id=${id}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
              method: 'POST',
              body: data1
            }).then((response) => {
              if (response.status === 200) {
                response.json().then(value => {
                  setFormValues({ ...formValues, [key]: value.file_name })
                  finalValues[key] = value.file_name
                  uploadedFilesIds.push({ [key]: value.file_name });
                  if (uploadedFilesIds.length === fileFormKeys.length) {
                    var data = new FormData();
                    const d = { data: finalValues }
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
                      if (response.status === 200) {
                        response.json().then(value => {
                          setLoading(false);
                          setShowSuccessPanel(true);
                          setState({
                            open: true,
                            vertical: 'top',
                            horizontal: 'center',
                            message: 'Registration successful.Stay tunned with notifications and announcements',
                            type: "success",
                            autoHide: 4000
                          });
                        })
                      }
                      else if (response.status === 201) {
                        response.json().then(value => {
                          setLoading(false);
                          setShowSuccessPanel(true);
                          setState({
                            open: true,
                            vertical: 'top',
                            horizontal: 'center',
                            message: 'Already Registered',
                            type: "error",
                            autoHide: 4000
                          });
                        })
                      }

                    })
                  }
                })
              }
            })
          })
        }
        else {
          var data = new FormData();
          const d = { data: finalValues }
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
            if (response.status === 200) {
              response.json().then(value => {
                setLoading(false);
                setShowSuccessPanel(true);
                setState({
                  open: true,
                  vertical: 'top',
                  horizontal: 'center',
                  message: 'Registration successful.Stay tunned with notifications and announcements',
                  type: "success",
                  autoHide: 4000
                });
              })
            }
            else if (response.status === 201) {
              response.json().then(value => {
                setLoading(false);
                setShowSuccessPanel(true);
                setState({
                  open: true,
                  vertical: 'top',
                  horizontal: 'center',
                  message: 'Already Registered',
                  type: "error",
                  autoHide: 4000
                });
              })
            }

          })
        }


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


  }

  function handleBack() {
    props.history.goBack();
  }

  function handleFileSelect(event) {
    if (event.target.files[0]) {
      setUploadFiles({ ...uploadFiles, [event.target.name]: event.target.files[0] });
    }

  }

  const handleEventScreenButton = () => {
    props.history.push(`/event/${event._id}`)
  }

  const handleHomeScreenButton = () => {
    props.history.push('/home')
  }



  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={autoHide}
        onClose={handleClose}
        key={vertical + horizontal}>
        <Alert onClose={handleClose} severity={type}>{message}</Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={backDropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <IconButton aria-label="close" className={classes.closeButton} onClick={handleBack}>
        <CloseIcon fontSize="large" />
      </IconButton>
      <div className={showSuccessPanel ? classes.paper : classes.hidden}>
        <SuccessPanel type="registrationSuccess" showSuccessPanel={showSuccessPanel} handleHomeScreenButton={handleHomeScreenButton} handleEventScreenButton={handleEventScreenButton}></SuccessPanel>
      </div>
      {event != null &&
        <div className={showSuccessPanel ? classes.hidden : classes.paper}>
          <Typography component="h1" variant="h5">
            {"Registration for " + event.name}
          </Typography>

          <form className={classes.form} onSubmit={handleEventRegistration} >

            <Grid container spacing={2} >
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
                      <Box display="flex" justifyContent="flex-end">
                        <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                      </Box>
                    </Grid>)
                }
                else if (field.title === "Email") {
                  return (
                    <Grid item xs={12}>
                      <TextField
                        autoComplete='off'
                        name={field.title}
                        disabled
                        required
                        fullWidth
                        id={field.title}
                        onChange={handleChange}
                        value={formValues[field.title]}
                        label={field.title}
                      />
                      <Box display="flex" justifyContent="flex-end">
                        <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                      </Box>
                    </Grid>)
                }
                else {
                  return (
                    <Grid item xs={12}>
                      <TextField
                        autoComplete='off'
                        name={field.title}
                        required={field.req}
                        fullWidth
                        id={field.title}
                        onChange={handleChange}
                        value={formValues[field.title]}
                        label={field.title}
                      />
                      <Box display="flex" justifyContent="flex-end">
                        <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                      </Box>
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
                    <Box display="flex" justifyContent="flex-end">
                      <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                    </Box>
                  </Grid>
                )
              })}
              {dropDownFields.map((field, index) => {
                return (
                  <Grid item xs={12}>
                    <Autocomplete
                      id={field.title}
                      options={field.options.map((option) => option)}
                      onChange={handleChange2(field.title)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField required={field.req} {...params} name={field.name} label={field.title} placeholder={field.name} />
                      )}
                    />
                    <Box display="flex" justifyContent="flex-end">
                      <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                    </Box>
                  </Grid>
                )
              })}
              {radioFields.map((field, index) => {
                return (
                  <Grid item xs={12}>
                    <FormLabel required={field.req} component="legend">{field.title}</FormLabel>
                    <RadioGroup required={field.req} aria-label="address" name={field.title} defaultValue={field.options[0]} value={formValues[field.title]} onChange={handleradioChange} style={{ display: "inline" }}>
                      {field.options.map((option) => {
                        return <FormControlLabel required={field.req} value={option} control={<Radio color="default" />} label={option} />
                      })}
                    </RadioGroup>
                    <Box display="flex" justifyContent="flex-end">
                      <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                    </Box>
                  </Grid>
                )
              })}
              {
                dateFields.map((field, index) => {
                  return (
                    <Grid item xs={12}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                          fullWidth
                          required={field.req}
                          variant="inline"
                          format="dd MMM yyyy hh:mm a zzz"
                          margin="normal"
                          id={field.title}
                          label={field.title}
                          name={field.title}
                          value={formValues[field.title]}
                          onChange={handleDateChange(field.title)}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                      <Box display="flex" justifyContent="flex-end">
                        <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                      </Box>
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
                        required={field.req}
                        id={field.title}
                        name={field.title}
                        label={field.title}
                        fullWidth
                        onChange={handleLondDescChange}
                      />
                      <Box display="flex" justifyContent="flex-end">
                        <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                      </Box>
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
                        required={field.req}
                        fullWidth
                        id={field.title}
                        onChange={handleChange}
                        value={formValues[field.title]}
                        label={field.title}
                      />
                      <Box display="flex" justifyContent="flex-end">
                        <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                      </Box>
                    </Grid>)
                })
              }
              {
                fileUploadFields.map((field, index) => {
                  return <Grid item xs={12}>
                    <Typography>{field.title}</Typography>
                    <input id="contained-button-file" name={field.title} required={field.req} type="file" onChange={handleFileSelect} ></input>
                    <Box display="flex" justifyContent="flex-end">
                      <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                    </Box>
                  </Grid>
                })
              }

              <Grid item xs={12}>
                <Typography>By registering for the event.I accept the <Button onClick={handleTermsClick} color="primary">Terms and Conditions</Button></Typography>
              </Grid>
            </Grid>
            {canRegister && !backDropOpen && <Button
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
      <TermsandConditions open={tandcOpen} setOpen={setTandcOpen}></TermsandConditions>
    </Container>
  );
}

export default withRouter(EventRegistrationForm);