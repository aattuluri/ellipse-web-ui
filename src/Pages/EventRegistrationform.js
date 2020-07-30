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


//function for alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Signup = (props) => {
  const classes = useStyles();
  const token = localStorage.getItem('token');
  const user = React.useContext(AuthContext);
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: 'success',
    type: 'error',
    autoHide: 6000,
  });
  const [formValues, setFormValues] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  // const [fields, setFields] = React.useState([]);
  const [normalFields, setNormalFields] = React.useState([]);
  const [checkboxFields, setCheckBoxFields] = React.useState([]);
  const [radioFields, setRadioFields] = React.useState([]);
  const { vertical, horizontal, open, message, type, autoHide } = state;
  const id = props.match.params.eventId;
  const [backDropOpen, setBackDropOpen] = React.useState(true);
  const [event, setEvent] = React.useState(null);
  const colleges = ["VIT University", "GITAM University", "SRM University"];
  React.useEffect(() => {
    fetch(`http://139.59.16.53:4000/api/event?id=${id}`, {
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
        const allFields = value.event.regFields;
        if (allFields != null) {
          allFields.forEach(f => {
            if (f.name === "name") {
              setFormValues(formValues => ({ ...formValues, [f.name]: user.name }))
            }
            else if (f.name === "email") {
              setFormValues(formValues => ({ ...formValues, [f.name]: user.email }));
            }
            else if (f.name === "college") {
              setFormValues(formValues => ({ ...formValues, [f.name]: user.collegeName }));
            }
            else {
              setFormValues(formValues => ({ ...formValues, [f.name]: null }));
            }

          })
          const filteredFields = allFields.filter(f => f.type !== "checkbox")
          setNormalFields(filteredFields.filter(f => f.type !== "radiobutton"))
          setCheckBoxFields(allFields.filter((f) => f.type === "checkbox"));
          setRadioFields(allFields.filter(f => f.type === "radiobutton"))
          // allFields
        }
        setBackDropOpen(false);
      })
    })
  }, [token, id])

  function handleClose() {
    if (message === "Registered successfully") {
      props.history.push('/home')
    }

  }

  function handleChange(event) {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  }
  const handleChange2 = (name) => (event, values) => {
    setFormValues({ ...formValues, [name]: values });

  }

  function handleEventRegistration(e) {
    e.preventDefault();
    setLoading(true);
    try {
      var data = new FormData();
      const d = { data: formValues }
      data = JSON.stringify(d);
      fetch(`http://139.59.16.53:4000/api/event/register?id=${id}`, {
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

  function handleBack(){
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
                if (field.name === "college") {
                  return (
                    <Grid item xs={12}>
                      <Autocomplete
                        fullWidth
                        id={field.name}
                        options={colleges}
                        getOptionLabel={(option) => option}
                        onChange={handleChange}
                        value={formValues[field.name]}
                        disabled
                        renderInput={(params) => <TextField name={field.name} fullWidth required {...params} label={field.name} />}
                      />
                    </Grid>)
                }
                else {
                  return (
                    <Grid item xs={12}>
                      <TextField
                        autoComplete='off'
                        name={field.name}
                        // variant="outlined"
                        required
                        fullWidth
                        id={field.name}
                        onChange={handleChange}
                        value={formValues[field.name]}
                        label={field.name}
                        autoFocus
                      />
                    </Grid>)
                }

              })}
              {checkboxFields.map((field, index) => {
                return (
                  <Grid item xs={12}>
                    <Autocomplete
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
                    />
                  </Grid>
                )
              })}
              {radioFields.map((field, index) => {
                return (
                  <Grid item xs={12}>
                    <Autocomplete
                      id={field.name}
                      options={field.options.map((option) => option)}
                      // freeSolo
                      // onChange={handleeventTagsChange}
                      onChange={handleChange2(field.name)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField {...params} name={field.name} label={field.name} placeholder={field.name} />
                      )}
                    />
                  </Grid>
                )
              })}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="primary" name="terms" />}
                  label="I accept the terms and conditions"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.submit}
            >
              {loading ? <CircularProgress color="primary" size={24} /> : "Register"}
            </Button>
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


