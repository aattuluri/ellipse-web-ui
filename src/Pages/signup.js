import React from 'react';
import Copyright from '../Components/copyright';
import useStyles from '../Themes/SignupPageStyles';
import { withRouter } from 'react-router';

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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

//Firebase Imports 
import firebase from "firebase/app";
import firebaseApp from "../firebaseConfig";



const Signup = ({ history }) => {
  const classes = useStyles();
  async function handleSignUp(event) {
    event.preventDefault();
    const db = firebase.firestore();
    const { fullName, email, gender, college, designation, password, terms } = event.target.elements;
    try {
      if (terms.checked) {
        await firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value).then(function (user) {
            console.log(user.user.uid);
            db.collection("UserDetails").doc(user.user.uid).set({
              FullName: fullName.value,
              Email: email.value,
              College: college.value,
              Gender: gender.value,
              Uid: user.user.uid,
              Designation: designation.value
            }).then(function () {
              console.log("Document successfully written!");
              history.replace("/")
            })

          })
        console.log("success")
      }
      else {
        console.log("Terms and condition is not clicked")
      }

    } catch (error) {
      alert(error);
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />

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
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel htmlFor="outlined-age-native-simple">Gender</InputLabel>
                <Select
                  fullWidth
                  native
                  label="Age"
                  inputProps={{
                    name: 'gender',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel htmlFor="outlined-age-native-simple">You are</InputLabel>
                <Select
                  fullWidth
                  native
                  label="You are"
                  inputProps={{
                    name: 'designation',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value="Student">Student</option>
                  <option value="WorkingProfessional">Working Professional</option>
                  <option value="Club/Organisation">Club/Organisation</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel htmlFor="outlined-age-native-simple">Your College</InputLabel>
                <Select
                  fullWidth
                  native
                  label="College"
                  inputProps={{
                    name: 'college',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value="VIT University">VIT University</option>
                  <option value="GITAM University">GITAM University</option>
                  <option value="SRM University">SRM University</option>
                </Select>
              </FormControl>
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
                autoComplete="current-password"
              />
            </Grid>
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
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

      {/* </Grid> */}
      <Box mt={2}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(Signup);


