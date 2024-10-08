import React from 'react';
import Copyright from '../Components/copyright';
import { withRouter, Redirect } from "react-router";

//MaterialUI imports
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Badge from '@material-ui/core/Badge';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: theme.palette.secondary.main,
        padding: theme.spacing(3),
        borderRadius: 30,

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textArea: {
        width: theme.spacing(58),
        margin: theme.spacing(2),
        borderRadius: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.dark,
    },

}));

//function for alert
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UserInfo = ({ history }) => {
    const token = localStorage.getItem('token');
    const classes = useStyles();
    const [imageUrl, setImageurl] = React.useState("");
    const [image, setImage] = React.useState(null);
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
    const handleClose = async (event, reason) => {

        if (message === "successful") {
            const eventId = localStorage.getItem('eventid');
            if (eventId) {
                history.push(`/event/${eventId}`)
            }
            else {
                history.replace("/home")
            }

        }

        setState({ ...state, open: false });
    };

    if (!token) {
        return <Redirect to="/"></Redirect>
    }

    function handleChange(event) {
        if (event.target.files[0]) {
            setImage(event.target.files[0]);
            const url = URL.createObjectURL(event.target.files[0]);
            setImageurl(url);
        }
    }
    async function handleSignUp(event) {
        event.preventDefault();
        setLoading(true);
        const { gender, bio } = event.target.elements;

        try {
            var data = new FormData()
            const payload = {
                gender: gender.value,
                // college_id: collegeId.value,
                bio: bio.value,
            };
            data = JSON.stringify(payload);
            fetch(process.env.REACT_APP_API_URL + '/api/users/userdetails', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: data
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(val => {
                        if (image != null) {
                            var data2 = new FormData()
                            data2.append("image", image);
                            fetch(process.env.REACT_APP_API_URL + '/api/users/uploadImage', {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                },
                                method: 'POST',
                                body: data2
                            }).then(res => {
                                if (res.status === 200) {
                                    setLoading(false);
                                    setState({
                                        open: true,
                                        vertical: 'top',
                                        horizontal: 'center',
                                        message: "successful",
                                        type: "success",
                                        autoHide: 300
                                    })
                                }
                            })
                        }
                        else {

                            setLoading(false);
                            setState({
                                open: true,
                                vertical: 'top',
                                horizontal: 'center',
                                message: "successful",
                                type: "success",
                                autoHide: 300
                            })

                        }
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
                autoHide: 3000
            })
        }
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
                <Typography component="h1" variant="h3">
                    Welcome
                </Typography>
                <input id="contained-button-file" required type="file" accept="image/*" onChange={handleChange} style={{ display: "none" }}></input>
                <Badge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    badgeContent={<label htmlFor="contained-button-file">
                        <IconButton style={{ backgroundColor: "black" }} color="primary" aria-label="upload picture" component="span">
                            <EditIcon></EditIcon>
                        </IconButton>
                    </label>}>
                    <Avatar className={classes.avatar} sizes="100" alt="" src={imageUrl}></Avatar>
                </Badge>

                <form className={classes.form} onSubmit={handleSignUp}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                multiline={true}
                                rows="5"
                                variant='outlined'
                                placeholder="Bio"
                                autoComplete='off'
                                required
                                id="bio"
                                name="bio"
                                label="Bio"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
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
            <Box mt={2}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default withRouter(UserInfo);
