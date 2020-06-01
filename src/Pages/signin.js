import React, { useContext } from 'react';
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
import firebaseApp from "../firebaseConfig";
import Copyright from "../Components/copyright";
import { AuthContext } from "../Auth";
import { withRouter, Redirect } from "react-router";



const Signin = ({ history }) => {
  const classes = useStyles();
  async function handleSignin(event) {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      console.log("started")
      await firebaseApp
        .auth()
        .signInWithEmailAndPassword(email.value, password.value).then((user) => {
          console.log(user);
          history.push('/home')
        })
      console.log("success")
    } catch (error) {
      alert(error);
    }
  }
  const { currentUser } = useContext(AuthContext);
  console.log("b")
  console.log(currentUser);
  if (currentUser) {
    console.log(currentUser);

    return <Redirect to="/UserDetails" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={7} elevation={6} square>
        <div className={classes.paperLeft}>
          <Typography component="h1" variant="h3">
            Ellipse
          </Typography>
          <Typography component="h1" variant="h6">
            Kill time for what matters
          </Typography><br></br>
          <img src={iPhone} height="500px" width="300px" align="center"></img><br></br>
          <div className={classes.paperimage}>
            <Grid item xs={12} sm={12} md={12} elevation={6} square>

              <img src={GoogleBadge} height="100px" width="250px"></img><br></br>
            </Grid>
            <Grid item xs={12} sm={12} md={12} elevation={6} square >
              <img src={AppleBadge} height="70px" width="220px"></img>
            </Grid>
          </div>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
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