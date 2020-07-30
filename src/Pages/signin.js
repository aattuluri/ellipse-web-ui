import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from '../Themes/SigninPageStyles'
import AppleBadge from '../Components/Images/AppleBadge.png';
import GoogleBadge from '../Components/Images/google-play-badge.png';
import iPhone from '../Components/Images/iPhone 11 Pro Max@2x.png';
import Copyright from "../Components/copyright";
// import { AuthContext } from "../Auth";
import { withRouter, Redirect } from "react-router";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';


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
  const { vertical, horizontal, open, message, type,autoHide } = state;
  // const [user,setUser] = React.useState(null);
  const [token,setToken] = React.useState(null);
  const [isUserVerified,setIsUserVerified] = React.useState(null);
  const handleClose = async (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (message === "Signedin successfully") {
      localStorage.setItem('token', token);
      // localStorage.setItem('user', user);

      // console.log(JSON.parse(user).collegeName);
      if(isUserVerified){
        
          history.push('/home');
        
      }
      else{
        history.push('/otpverification')
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
      console.log(data);
      fetch('http://139.59.16.53:4000/api/users/login', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'POST',
        body: data
      }).then((response) => {
        console.log(response);
        if(response.status === 200){
          // console.log
          response.json().then((value) => {
            setToken(value.token);
            setIsUserVerified(value.isVerified);
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
        else{
          setLoading(false);
          setState({ 
            open: true,
            vertical: 'top', 
            horizontal: 'center', 
            message: "invalid credentials", 
            type: "error",autoHide:6000 })
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
        autoHide:6000 })
    }
  }
  const lToken = localStorage.getItem('token');
  if(lToken){
    return <Redirect to="/home" />;
  }
 


  return (
    <Grid container component="main" className={classes.root}>
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
      <Grid item xs={12} sm={12} md={7} elevation={6} >
        <div className={classes.paperLeft}>
          <Typography component="h1" variant="h3">
            Ellipse
          </Typography>
          <Typography component="h1" variant="h6">
            Kill time for what matters
          </Typography><br></br>
          {/* <div className={classes.iphoneImage}> */}
          <img src={iPhone} className={classes.iPhoneImage} alt="iphone" height="500px" width="300px" align="center"></img><br></br>
          <div className={classes.paperimage}>
            <Grid item xs={12} sm={12} md={12} className={classes.iPhoneImage} elevation={12}>

              <img src={GoogleBadge} alt="playstore" height="100px" width="250px"></img><br></br>
            </Grid>
            <Grid item xs={12} sm={12} className={classes.iPhoneImage} md={12} elevation={12} square >
              <img src={AppleBadge} alt="appstore" height="70px" width="220px"></img>
            </Grid>
          </div>
          {/* </div> */}
          
        </div>
      </Grid>

      <Grid item xs={12} sm={12} md={5} elevation={6} square>
        <div className={classes.paperRight} >

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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <div className={classes.wrapper}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                className={classes.submit}
              >
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

            <Box mt={5}>
              <Copyright />
            </Box>
          </form>

        </div>
      </Grid>
    </Grid>
  );
}
export default withRouter(Signin);


 // const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  // if (currentUser) {
  //   console.log(currentUser);
  //   return <Redirect to="/home" />;
  // }
  // useEffect(() => {
  // localStorage.removeItem('user');
  // const token = localStorage.getItem('token');
  // const currentUser = localStorage.getItem('user');

  //   if(currentUser){
  //     console.log(JSON.parse(currentUser));
  //   }
  //   // 
  //   // console.log(currentUser.email)
  // console.log(token);
  // console.log(localStorage.getItem('user'))
  // if(token){
  //   console.log(token);
  //   return <Redirect to="/home" />;
  // }
  // }, []);