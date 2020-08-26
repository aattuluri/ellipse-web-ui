import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { makeStyles } from '@material-ui/core/styles';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormLabel from '@material-ui/core/FormLabel';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import Chip from '@material-ui/core/Chip';
import { Grid } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';



// const useStyles = makeStyles((theme) => ({
//     dialog:{
//         backgroundColor: theme.palette.secondary.main
//     }
// }));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function SendEmailForm(props) {

    const token = localStorage.getItem('token');
    const [title, setTitle] = React.useState(null);
    const [content, setContent] = React.useState(null);

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
    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleContentChange(event) {
        setContent(event.target.value);
    }

    function handleAddButton() {
        try {
            var data = new FormData();
            const d = { 
                event_id: props.id, 
                title: title, 
                content: content,
                emails: props.emails}
            data = JSON.stringify(d);
            console.log(data);
            fetch(process.env.REACT_APP_API_URL+`/api/event/sendemail`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: data
            }).then(response => {
                response.json().then(value => {
                    setLoading(false);
                    setState({
                        open: true,
                        vertical: 'top',
                        horizontal: 'center',
                        message: 'Added successfully',
                        type: "success",
                        autoHide: 2000
                    });
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
                type: "error",
                autoHide: 6000
            })

        }
        props.handleClose()

    }
    const handleClose = async (event, reason) => {
        setState({ ...state, open: false });
    };



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
                    backgroundColor: "#1C1C1E",
                    // boxShadow: 'none',
                },
            }} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Content for your Email</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                label="Title"
                                name="title"
                                fullWidth
                                value={title}
                                required
                                onChange={handleTitleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                multiline={true}
                                rows="5"
                                variant='outlined'
                                placeholder="Enter everything about your event in detail"
                                autoComplete='off'
                                required
                                id="content"
                                name="content"
                                label="Content"
                                fullWidth
                                onChange={handleContentChange}
                                value={content || ""}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddButton} disabled={loading} color="primary">
                        {loading ? <CircularProgress color="primary" size={24} /> : "Send"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
