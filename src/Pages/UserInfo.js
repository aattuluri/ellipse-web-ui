import React, { useEffect } from 'react';
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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
//Firebase Imports 
import firebase from "firebase/app";
import firebaseApp from "../firebaseConfig";
// import

//function for alert
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UserInfo = ({ history }) => {
    const classes = useStyles();
    // const [currentUser, setCurrentUser] = React.useState(null);
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

        if (message === "successful") {
            history.replace("/home")
        }

        setState({ ...state, open: false });
    };
    async function handleSignUp(event) {
        event.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');
        const { gender, designation, college } = event.target.elements; 
        var data = new FormData
        const payload = {
            gender: gender.value,
            designation: designation.value,
            college: college.value
        };
        data = JSON.stringify(payload);

        try {
            fetch('http://localhost:4000/api/users/userdetails', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  method: 'POST',
                  body: data
            }).then(response =>{
                if(response.status == 200){
                    response.json().then(val =>{
                        fetch('http://localhost:4000/api/users/me', {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                              },
                              method: 'GET'
                        }).then(result => {
                            console.log(result);
                            result.json().then(value =>{
                                localStorage.setItem('user',JSON.stringify(value))
                                setLoading(false);
                        setState({
                            open: true,
                            vertical: 'top',
                            horizontal: 'center',
                            message: "successful",
                            type: "success"
                        })
                            })
                        })
                        
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
                    
                </form>
            </div>

            {/* </Grid> */}
            <Box mt={2}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default withRouter(UserInfo);


