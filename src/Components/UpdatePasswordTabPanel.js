import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import AuthContext from '../AuthContext';
//function for alert
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }



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
    const user = React.useContext(AuthContext);
    const token = localStorage.getItem('token');
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: 'success',
        type: 'error'
    });
    const [loading, setLoading] = React.useState(false);
    const { vertical, horizontal, open, message, type } = state;
    const [cPassword,setCPassword] = React.useState(null);
    const [nPassword,setNPassword] = React.useState(null);


    const handleClose = async (event, reason) => {
        setCPassword(null);
        setNPassword(null);

        setState({ ...state, open: false });
    };

    function handleCurrentPasswordChange(event){
        setCPassword(event.target.value);
    }
    function handleNewPasswordChange(event){
        setNPassword(event.target.value);
    }

    function handleUpdatePassword(event) {
        setLoading(true);
        event.preventDefault();
        // const { cPassword, nPassword } = event.target.elements;
        console.log(cPassword);
        console.log(nPassword);
        try{
            var data = new FormData()
        const payload = {
          email: user.email,
          cPassword: cPassword,
          nPassword: nPassword
        };
        data = JSON.stringify(payload);
        console.log(data);
        fetch('http://139.59.16.53:4000/api/users/updatepassword', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method: 'POST',
          body: data
        }).then(response =>{
            if (response.status === 200){
                response.json().then(result =>{
                    setLoading(false);
                    setState({
                        open: true,
                        vertical: 'top',
                        horizontal: 'center',
                        message: result.message,
                        type: "success"
                      })
                })
            }
            else if (response.status === 401){
                response.json().then(result =>{
                    setLoading(false);
                    setState({
                        open: true,
                        vertical: 'top',
                        horizontal: 'center',
                        message:result.error,
                        type: "error"
                      })
                })
                
            }
           
        })



            
        }
        catch (error) {
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
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        key={vertical + horizontal}
                    ><Alert onClose={handleClose} severity={type}>{message}</Alert>
                    </Snackbar>
                    
                    <div className={classes.paper}>
                        <form className={classes.form} onSubmit={handleUpdatePassword}>
                            <Grid container spacing={2} justify="center" >
                            

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="cPassword"
                                        label="Current Password"
                                        type="password"
                                        id="cPassword"
                                        value={cPassword}
                                        onChange={handleCurrentPasswordChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="nPassword"
                                        label="New Password"
                                        type="password"
                                        id="nPassword"
                                        value={nPassword}
                                        onChange={handleNewPasswordChange}
                                    />
                                </Grid>


                            </Grid>
                            <Button
                                className={classes.button}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={loading}
                            // className={classes.submit}
                            >
                                {loading ? <CircularProgress color="primary" size={24} /> : "Update Password"}
                            </Button>
                        </form>

                    </div>
                </Container>

            )}
        </div>
    );
}

export default UpdatePasswordTabPanel;