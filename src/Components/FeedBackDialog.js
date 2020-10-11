import React from 'react';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTheme } from '@material-ui/core/styles';

//function for alert
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function EventReportDialog(props) {
    // const classes = useStyles();
    const theme = useTheme();
    const token = localStorage.getItem('token');
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

        setState({ ...state, open: false });
    };
    // const [title, setTitle] = React.useState(null);
    const [desc, setDesc] = React.useState(null);
    

    // function handleTitleChange(event) {
    //     setTitle(event.target.value);
    // }

    function handleDescChange(event) {
        setDesc(event.target.value);
    }

    function handleAddButton() {
        setLoading(true)
        try {
            var data = new FormData()
            const payload = {
                description: desc
            };
            data = JSON.stringify(payload);
            fetch(process.env.REACT_APP_API_URL+'/api/event/send_feedback', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: data
            }).then(result => {
                result.json().then((res) => {
                    if (res.message === "success") {
                        setLoading(false)
                        props.handleClose()
                        setState({
                            open: true,
                            vertical: 'top',
                            horizontal: 'center',
                            message: 'Successfull',
                            type: "success",
                            autoHide: 3000
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


    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={autoHide}
                onClose={handleClose}
                key={vertical + horizontal}
            >
                <Alert onClose={handleClose} severity={type}>{message}</Alert>
            </Snackbar>
            <Dialog open={props.open} fullWidth={true} PaperProps={{
                style: {
                    backgroundColor: theme.palette.secondary.main,
                    boxShadow: 'none',
                },
            }} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">FeedBack)</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                id="desc"
                                label="Issue Description"
                                name="desc"
                                fullWidth
                                value={desc || ""}
                                required
                                onChange={handleDescChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddButton} color="primary">
                        {loading ? <CircularProgress color="primary" size={24} /> : "Send"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
