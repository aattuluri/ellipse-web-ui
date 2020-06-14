import React, { useEffect } from 'react';
import Copyright from '../Components/copyright';
import useStyles from '../Themes/SignupPageStyles';
import { withRouter } from 'react-router';
import axios from 'axios';

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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
//Firebase Imports 
import firebase from "firebase/app";
import firebaseApp from "../firebaseConfig";

//function for alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Signup = ({ history }) => {
  const classes = useStyles();
  const [token,setToken] = React.useState("");
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: 'success',
    type: 'error'
  });
  const [loading, setLoading] = React.useState(false);
  const { vertical, horizontal, open, message, type } = state;
  const handleClose = async (event, reason) => {
    fetch('https://ellipseserver1.herokuapp.com/api/users/​logout', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
          method: 'POST',
        }).then((result)=>{
          // console.log(result.json())
          result.json().then((data)=>{
            if(data.message === "success"){
              if (reason === 'clickaway') {
                return;
              }
          
              if (message === "Signedup successfully.Verify your email and login") {
                history.replace("/")
              }
            }
          })
        })
    setState({ ...state, open: false });
  };
  async function handleSignUp(event) {
    event.preventDefault();
    setLoading(true);
    const db = firebase.firestore();
    // const token = "";
    event.preventDefault();
    const { fullName, email, gender, college, designation, password, terms } = event.target.elements;
    try {
      if (terms.checked) {
        var data = new FormData
        const payload = {
          name: fullName.value,
          email: email.value,
          password: password.value
        };
        // data.append(JSON.stringify(payload));
        data = JSON.stringify(payload);
        console.log(data);
        fetch("​https://ellipseserver1.herokuapp.com/api/users/signup", {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: data
        }).then((result)=>{
          console.log(result);
          result.json().then((val)=>{
            console.log(val);
            setToken(val.token);
            setState({
                      open: true,
                      vertical: 'top',
                      horizontal: 'center',
                      message: 'Signedup successfully.Verify your email and login',
                      type: "success"
                    });
          })
          // setToken(result.json().token);
        })
        // AP0033036342020LL
        // await firebaseApp
        //   .auth()
        //   .createUserWithEmailAndPassword(email.value, password.value).then(function (user) {
        //     console.log(user.user.uid);
        //     db.collection("UserDetails").doc(user.user.uid).set({
        //       FullName: fullName.value,
        //       Email: email.value,
        //       College: college.value,
        //       Gender: gender.value,
        //       Uid: user.user.uid,
        //       Designation: designation.value
        //     }).then(function () {
        //       setState({
        //         open: true,
        //         vertical: 'top',
        //         horizontal: 'center',
        //         message: 'Signedup successfully.Verify your email and login',
        //         type: "success"
        //       });
        //     })
        //   })
      }
    
      else {
        setLoading(false);
        setState({
          open: true,
          vertical: 'top',
          horizontal: 'center',
          message: 'Please agress the terms and condiitons',
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

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
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
            disabled={loading}
            className={classes.submit}
          >
           {loading ? <CircularProgress color="primary" size={24}/>: "Sign Up" }
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


