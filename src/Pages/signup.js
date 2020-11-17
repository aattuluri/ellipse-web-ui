import React from 'react';
import Copyright from '../Components/copyright';
import useStyles from '../Themes/SignupPageStyles';
import { withRouter, Redirect } from "react-router";

//MaterialUI imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { detect } from 'detect-browser';
import SupportDialog from '../Components/SupportDialog';

//function for alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Signup = ({ history }) => {
  const classes = useStyles();
  const [token, setToken] = React.useState("");
  // const [currentUser, setCurrentUser] = React.useState(null);
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: 'success',
    type: 'error',
    autoHide: 300
  });
  const [loading, setLoading] = React.useState(false);
  const { vertical, horizontal, open, message, type, autoHide } = state;
  const [nameError, setNameError] = React.useState(false);
  const [usernameError, setUserNameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [signupButtonDisabled, setSignupButtonDisabled] = React.useState(false);
  const browser = detect();
  const [supportOpen, setSupportOpen] = React.useState(false);

  //timeout function
  function timeout(ms, promise) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('TIMEOUT'))
      }, ms)

      promise
        .then(value => {
          clearTimeout(timer)
          resolve(value)
        })
        .catch(reason => {
          setLoading(false);
          setState({
            open: true,
            vertical: 'top',
            horizontal: 'center',
            message: 'Something went wrong Try Again',
            type: "error",
            autoHide: 4000
          });
          clearTimeout(timer)
          reject(reason)
        })
    })
  }
  const handleClose = async (event, reason) => {

    if (message === "Signedup successfully") {
      localStorage.setItem('token', token);
      history.replace("/otpverification")
    }

    setState({ ...state, open: false });
  };
  async function handleSignUp(event) {

    event.preventDefault();
    setLoading(true);
    const { fullName, email, password, username, terms } = event.target.elements;
    try {
      if (terms.checked) {
        var data = new FormData()
        const payload = {
          name: fullName.value,
          email: email.value,
          password: password.value,
          username: username.value,
          type: 'browser',
          browser_name: browser.name,
          device_os: browser.os,
        };
        data = JSON.stringify(payload);
        timeout(25000, fetch(process.env.REACT_APP_API_URL + '/api/users/signup', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method: 'POST',
          body: data
        })).then((result) => {
          // console.log(result);
          if (result.status === 200) {
            result.json().then((val) => {
              setToken(val.token);
              var data2 = new FormData();
              const payload2 = {
                email: val.useremail
              };
              data2 = JSON.stringify(payload2)
              // console.log(token);
              const tok = val.token;
              fetch(process.env.REACT_APP_API_URL + '/api/users/sendverificationemail', {
                headers: {
                  'Authorization': `Bearer ${tok}`,
                  'Content-Type': 'application/json'
                },
                method: 'POST',
                body: data2
              }).then((result) => {
                // console.log(result);
                result.json().then((res) => {
                  if (res.message === "success") {
                    setState({
                      open: true,
                      vertical: 'top',
                      horizontal: 'center',
                      message: 'Signedup successfully',
                      type: "success",
                      autoHide: 300
                    });
                  }
                })

              })

            })
          }
          else if (result.status === 401) {
            setLoading(false);
            setState({
              open: true,
              vertical: 'top',
              horizontal: 'center',
              message: 'Email already registered',
              type: "error",
              autoHide: 3000
            });
          }
          else {
            setLoading(false);
            setState({
              open: true,
              vertical: 'top',
              horizontal: 'center',
              message: 'Something went wrong Try Again',
              type: "error",
              autoHide: 4000
            });
          }
        })
      }

      else {
        setLoading(false);
        setState({
          open: true,
          vertical: 'top',
          horizontal: 'center',
          message: 'Please agree to the terms and conditions',
          type: "error"
        });
      }

    } catch (error) {
      setLoading(false);
      setState({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: error.message,
        type: "error"
      })
    }
  }

  function handleUsernameChange(event) {
    const username = event.target.value;
    var data = new FormData();
    const payload = {
      username: username
    };
    data = JSON.stringify(payload);
    setUserNameError(false);
    setSignupButtonDisabled(false)
    fetch(process.env.REACT_APP_API_URL + '/api/check_username', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
      body: data
    }).then((result) => {
      result.json().then(value => {
        if (value.message === "user already exists") {
          setUserNameError(true);
          setSignupButtonDisabled(true);
        }
      })
    })
  }

  const lToken = localStorage.getItem('token');
  if (lToken) {
    return <Redirect to="/home" />;
  }

  const handleSupportButton = () => {
    setSupportOpen(true);
  }
  const handleSupportClose = () => {
    setSupportOpen(false);
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
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fullName"
                name="fullName"
                variant="outlined"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
                inputProps={{ pattern: "[a-zA-Z ]+" }}
                onInvalid={() => { setNameError(true) }}
                helperText={nameError && "Name should only contain alphabet and spaces"}
                onInput={() => { setNameError(false) }}
                error={nameError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                onChange={handleUsernameChange}
                name="username"
                error={usernameError}
                helperText={usernameError && "username already exists"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                inputProps={{ pattern: "^.{6,}$" }}
                onInvalid={() => { setPasswordError(true) }}
                helperText={passwordError && "Password should atleast be 6 characters"}
                onInput={() => { setPasswordError(false) }}
                error={passwordError}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="primary" name="terms" />}
                label={<Typography>By signing up I accept the <Link href='/Privacy_Policy.pdf'>Pivacy Policy and Terms of Service</Link></Typography>}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading || signupButtonDisabled}
            className={classes.submit}
          >
            {loading ? <CircularProgress color="primary" size={24} /> : "Sign Up"}
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Grid container justify="center">

            <Grid item>
              <Link onClick={handleSupportButton} variant="body2">
                {"Get Support"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={2}>
        <Copyright />
      </Box>
      <SupportDialog open={supportOpen} handleClose={handleSupportClose}></SupportDialog>
    </Container>
  );
}

export default withRouter(Signup);
