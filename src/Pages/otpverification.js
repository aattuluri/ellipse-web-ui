import React from 'react';
import Copyright from '../Components/copyright';
import useStyles from '../Themes/SignupPageStyles';
import { withRouter, Redirect } from "react-router";

//MaterialUI imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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

const OTPver = ({ history }) => {
    const classes = useStyles();
    const token = localStorage.getItem("token");
    // const [token, setToken] = React.useState("");
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
    const [seconds, setSeconds] = React.useState(30);
    const [resendEnabled, setresetEnabled] = React.useState(false)

    React.useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            setresetEnabled(true)
        }
        // eslint-disable-next-line
    }, [seconds]);

    function handleClose() {
        // console.log("message")
        if (message === "Success! redirecting to Ellipse Home") {
            history.replace("/home")
        }
        setState({ ...state, open: false });
    }

    if (!token) {
        return <Redirect to="/"></Redirect>
    }

    function handleVerification(event) {
        event.preventDefault();
        setLoading(true);
        const { otp } = event.target.elements;
        try {
            var data = new FormData();
            const payload = {
                otp: otp.value
            };
            // data.append(JSON.stringify(payload));
            data = JSON.stringify(payload);

            fetch(process.env.REACT_APP_API_URL + '/api/users/verifyotp', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: data

            }
            ).then((result) => {
                result.json().then(val => {
                    // console.log(val.message);
                    if (val.message === "verified") {
                        setLoading(false);
                        setState({
                            open: true,
                            vertical: 'top',
                            horizontal: 'center',
                            message: "Success! redirecting to Ellipse Home",
                            type: 'success',
                            autoHide: 300
                        })

                    }
                    else if (val.message === "Not verified") {
                        setLoading(false);
                        setState({
                            open: true,
                            vertical: 'top',
                            horizontal: 'center',
                            message: "Invalid OTP, please check and try again",
                            type: 'error',
                            autoHide: 5000
                        })
                    }
                    else {
                        setLoading(false);
                        setState({
                            open: true,
                            vertical: 'top',
                            horizontal: 'center',
                            message: "Something went wrong try again",
                            type: 'error',
                            autoHide: 5000
                        })
                    }
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
                type: 'error'
            })
        }



    }


    function handleResendOTP() {
        try {
            var data2 = new FormData();
            const payload2 = {
                //   email: value[0].email
            };
            data2 = JSON.stringify(payload2)
            fetch(process.env.REACT_APP_API_URL + '/api/users/sendverificationemailwithauth', {
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
                        setState({
                            open: true,
                            vertical: 'top',
                            horizontal: 'center',
                            message: "Password sent succcessfully",
                            type: 'success',
                            autoHide: 300
                        })
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
                type: 'error'
            })
        }
    }

    function handlesigninButton() {
        history.push('/signin')
        localStorage.removeItem('token');
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
                    Email Verification
                </Typography>
                <form className={classes.form} onSubmit={handleVerification}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="otp"
                            label="Enter OTP"
                            name="otp"
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        className={classes.submit}
                    >
                        {loading ? <CircularProgress color="primary" size={24} /> : "Continue"}
                    </Button>
                    <Grid container>

                        <Grid item>
                            <Button disabled={!resendEnabled} onClick={handleResendOTP}>Resend OTP in {seconds}</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={handlesigninButton}>Signin to Different account</Button>
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

export default withRouter(OTPver);
