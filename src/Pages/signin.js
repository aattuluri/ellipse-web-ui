import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from '../Themes/SigninPageStyles'
// import AppleBadge from '../Components/Images/AppleBadge.png';
import GoogleBadge from '../Components/Images/google-play-badge.png'
// import iPhone from '../Components/Images/iPhone 11 Pro Max@2x.png';
import Copyright from "../Components/copyright";
import { withRouter, Redirect } from "react-router";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import PhoneImage from '../Components/Images/logo300.svg';
// import HomePageCarousel from '../Components/HomePageCarousel';
// import FavoriteIcon from '@material-ui/icons/Favorite';


//function for alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}






const Signin = ({ history }) => {
  const classes = useStyles();
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
  // const [user,setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [isUserVerified, setIsUserVerified] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const abortController = new AbortController();



  const handleClose = async (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (message === "Signedin successfully") {
      localStorage.setItem('token', token);
      if (isUserVerified) {
        localStorage.setItem('token', token);
        const eventId = localStorage.getItem('eventid');
        if (eventId) {
          abortController.abort()
          history.push(`/event/${eventId}`)
        }
        else {
          abortController.abort()
          history.push('/home');
        }

      }
      else {
        try {
          var data2 = new FormData();
          const payload2 = {
            email: email
          };
          data2 = JSON.stringify(payload2)
          fetch(process.env.REACT_APP_API_URL + '/api/users/sendverificationemail', {
            signal: abortController.signal,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: data2
          }).then((result) => {
            // console.log(result);
            result.json().then((res) => {
              if (res.message === "success") {
                abortController.abort()
                localStorage.setItem('token', token);
                history.push('/otpverification')
                setState({
                  open: true,
                  vertical: 'top',
                  horizontal: 'center',
                  message: 'Signedin successfully',
                  type: "success",
                  autoHide: 300
                });
              }
            })

          })
        } catch (error) {
          setLoading(false);
          setState({
            open: true,
            vertical: 'top',
            horizontal: 'center',
            message: error.message,
            type: "error",
            autoHide: 3000
          })
        }

      }

    }
    setState({ ...state, open: false });
  };
  async function handleSignin(event) {
    event.preventDefault();
    setLoading(true);
    const { email, password } = event.target.elements;
    try {
      var data = new FormData()
      const payload = {
        email: email.value,
        password: password.value
      };
      data = JSON.stringify(payload);
      // console.log(data);
      fetch(process.env.REACT_APP_API_URL + '/api/users/login', {
        signal: abortController.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'POST',
        body: data
      }).then((response) => {
        // console.log(response);
        if (response.status === 200) {
          // console.log
          response.json().then((value) => {
            setToken(value.token);
            setIsUserVerified(value.isVerified);
            setEmail(value.useremail);
            // setUser(JSON.stringify(value.userDetails));

            setLoading(false);
            setState({
              open: true,
              vertical: 'top',
              horizontal: 'center',
              message: 'Signedin successfully',
              type: "success",
              autoHide: 200
            });
          })
        }
        else {
          setLoading(false);
          setState({
            open: true,
            vertical: 'top',
            horizontal: 'center',
            message: "invalid credentials",
            type: "error", autoHide: 6000
          })
        }

      })
    } catch (error) {

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
  const lToken = localStorage.getItem('token');
  if (lToken) {
    return <Redirect to="/home" />;
  }



  return (
    <React.Fragment>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={autoHide}
          onClose={handleClose}
          key={vertical + horizontal}>
          <Alert onClose={handleClose} severity={type}>{message}</Alert>
        </Snackbar>
        <Grid item xs={12} sm={12} md={7} elevation={6} >
          <Box display="flex" flexDirection="column" justifyContent="flex-start" m={1} p={1} className={classes.paperLeft}>
            <img src={PhoneImage} alt="logo" height="500px" width="500px" className={classes.image}></img>
            <Typography className={classes.title} component="h1" variant="h2">
              Ellipse
          </Typography>
            <Typography component="h1" variant="h6">
              Kill time for what matters
          </Typography><br></br>
            <a rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.guna0027.ellipse" target="_blank">
              <img className={classes.hidden} src={GoogleBadge} alt="playstore"></img><br></br>
            </a>

          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={5} elevation={6}>
          <Box display="flex" flexDirection="column" justifyContent="center" m={1} p={1} className={classes.paperRight}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
          </Typography>
            <form className={classes.form} onSubmit={handleSignin}>
              <TextField
                name="email"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
              />
              <TextField
                name="password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <div className={classes.wrapper}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  className={classes.submit}>
                  {loading ? <CircularProgress color="primary" size={24} /> : "Sign In"}

                </Button>
              </div>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotpassword" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
            <Box display="flex" flexDirection="column" justifyContent="flex-end">
              <Copyright></Copyright>
            </Box>
          </Box>
        </Grid>
        {/* <Grid item xs={12}>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Box display="flex" justifyContent="center">
              <HomePageCarousel></HomePageCarousel>
            </Box>
          </Box>
          <Box className={classes.footer} height="200px" display="flex" flexDirection="column" justifyContent="center">
            <Box display="flex" justifyContent="center">
              <Typography>Made with <FavoriteIcon fontSize="inherit" color="primary"></FavoriteIcon> for Students and Organizations</Typography><br></br>
            </Box>
            <Box display="flex" justifyContent="center">
              <Typography>Contact us at <Link href="mailto:support@ellipseapp.com" variant="body2">
                {"support@ellipseapp.com"}
              </Link></Typography>
            </Box>
            <Box display="flex" justifyContent="center">
              <Copyright></Copyright>
            </Box>
            <Box display="flex" justifyContent="center">
              <Link href="/Privacy_Policy.pdf" variant="body2">
                {"Privacy Policy"}
              </Link>
            </Box>
          </Box>
        </Grid> */}
      </Grid>

    </React.Fragment>
  );
}
export default withRouter(Signin);