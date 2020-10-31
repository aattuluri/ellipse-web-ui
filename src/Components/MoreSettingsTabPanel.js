import React from 'react';
// import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
// import AuthContext from '../AuthContext';
//function for alert
// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }



const useStyles = makeStyles((theme) => ({

    avatar: {
        backgroundColor: theme.palette.primary.main,
    },
    button: {
        marginTop: theme.spacing(4),

    },
    large: {
        width: theme.spacing(17),
        height: theme.spacing(17),
    },
    tab: {
        flexGrow: 1,
        // maxWidth: 800,
        background: theme.palette.secondary.main,
        alignItems: 'center',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

function UpdatePasswordTabPanel(props) {
    const classes = useStyles();
    const { children, value, url, index, ...other } = props;
    // const [open, setOpen] = React.useState(false);
    // const { currentUser } = React.useContext(AuthContext);
    const token = localStorage.getItem('token');
    const [loading, setLoading] = React.useState(false);




    function handleLogoutAll(event) {
        setLoading(true);
        event.preventDefault();
        try {
            fetch(process.env.REACT_APP_API_URL + '/api/users/logoutall', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then((result) => {
                if (result.status === 200) {
                    result.json().then((data) => {
                        if (data.message === "success") {
                            setLoading(false);
                            localStorage.removeItem('token');
                            localStorage.removeItem('tabIndex');
                            props.history.replace("/")
                        }
                    })
                }
                else {

                }
            })
        }
        catch (error) {
            setLoading(false);
        }
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Button
                            onClick={handleLogoutAll}
                            className={classes.button}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress color="primary" size={24} /> : "Logout of All Devices"}
                        </Button>

                    </div>
                </Container>

            )}
        </div>
    );
}

export default UpdatePasswordTabPanel;