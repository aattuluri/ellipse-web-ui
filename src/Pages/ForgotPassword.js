import React from "react";
import Copyright from '../Components/copyright';
import useStyles from '../Themes/SignupPageStyles';
import { withRouter } from 'react-router';

//MaterialUI imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';


//function for alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const ForgotPassword = ({ history }) => {
  const classes = useStyles();
  // const token = localStorage.getItem('token');
  const [email, setEmail] = React.useState(null);
  const [otp, setOtp] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: 'success',
    type: 'error',
    autoHide: 300
  });
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const { vertical, horizontal, open, message, type, autoHide } = state;
  // const [sendOTPButtonDisabled, setSendOTPButtonDisabled] = React.useState(false);

  // React.useEffect(() => {
  //   const loadScriptByURL = (id, url, callback) => {
  //     const isScriptExist = document.getElementById(id);

  //     if (!isScriptExist) {
  //       var script = document.createElement("script");
  //       script.type = "text/javascript";
  //       script.src = url;
  //       script.id = id;
  //       script.onload = function () {
  //         if (callback) callback();
  //       };
  //       document.body.appendChild(script);
  //     }

  //     if (isScriptExist && callback) callback();
  //   }

  //   // load the script by passing the URL
  //   loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_SITE_KEY}`, function () {
  //     console.log("Script loaded!");
  //     window.grecaptcha.ready(function () {
  //       window.grecaptcha.execute('6LcEVOoZAAAAAOjNV_wZFJ7YQMBs4IwKyH-LdU2P', { action: 'submit' }).then(recaptcha_token => {
  //         // Add your logic to submit to your backend server here.
  //         // console.log(recaptcha_token);
  //         fetch(process.env.REACT_APP_API_URL +'/api/verify_recaptcha', {
  //           method: 'POST',
  //           headers: {
  //             "Content-Type": "application/json"
  //           },
  //           body: JSON.stringify({
  //             // "name": name,
  //             // "email": email,
  //             "recaptcha_token": recaptcha_token
  //           })
  //         }).then(res => {
  //           if(res.status === 200){
  //             res.json().then(result => {
  //               // console.log(result)
  //               if (result.success) {
  //                 if (result.score < 0.5) {
  //                   setSendOTPButtonDisabled(true);
  //                 }
  //               }
  //             })
  //           }
            
  //         });
  //       });
  //     });
  //   });
  // }, []);


  async function handlePasswordReset(event) {
    event.preventDefault();
    setLoading(true);
    try {
      var data2 = new FormData();
      const payload2 = {
        email: email
      };
      data2 = JSON.stringify(payload2)
      fetch(process.env.REACT_APP_API_URL + '/api/users/sendverificationemail', {
        headers: {
          // 'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: data2
      }).then((result) => {
        console.log(result);
        result.json().then((res) => {
          if (res.message === "success") {
            setLoading(false)
            // history.push('/resetforgotpassword')
            setState({
              open: true,
              vertical: 'top',
              horizontal: 'center',
              message: 'Enter the OTP sent to your registered email address',
              type: "success",
              autoHide: 2000
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


  async function handleForgotPassword(event) {
    event.preventDefault();
    setLoading2(true);
    // const { email,} = event.target.elements;
    try {
      var data2 = new FormData();
      const payload2 = {
        email: email,
        otp: otp,
        nPassword: password
      };
      data2 = JSON.stringify(payload2)
      fetch(process.env.REACT_APP_API_URL + '/api/users/forgotpassword', {
        headers: {
          // 'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: data2
      }).then((result) => {
        console.log(result);
        result.json().then((res) => {
          if (res.message === "success") {

            // history.push('/resetforgotpassword')
            setLoading2(false);
            setState({
              open: true,
              vertical: 'top',
              horizontal: 'center',
              message: 'Succesful! Login to continue',
              type: "success",
              autoHide: 300
            });
          }
        })

      })

    } catch (error) {
      setLoading2(false);
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


  function handleClose() {
    if (message === "Succesful! Login to continue") {
      history.replace("/");
    }
    setState({ ...state, open: false });
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
          Enter your email to receive OTP
        </Typography>
        <form className={classes.form} onSubmit={handlePasswordReset}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.submit}>
            {loading ? <CircularProgress color="primary" size={24} /> : "Send OTP"}
          </Button>
        </form>
        <form className={classes.form} onSubmit={handleForgotPassword}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="otp"
                label="OTP"
                name="otp"
                value={otp}
                onChange={e => setOtp(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="New Password"
                name="password"
                value={password}
                type="password"
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading2}
            className={classes.submit}>
            {loading2 ? <CircularProgress color="primary" size={24} /> : "Reset Password"}
          </Button>


        </form>
        <Grid container justify="center">
          <Grid item>
            <Link href="/" variant="body2">
              Instead? Sign in
              </Link>
          </Grid>
        </Grid>
      </div>

      {/* </Grid> */}
      <Box mt={2}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(ForgotPassword);
