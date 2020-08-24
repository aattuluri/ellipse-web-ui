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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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


export default function AnnouncementForm(props) {

  const token = localStorage.getItem('token');
  const [title,setTitle] = React.useState(null);
  const [desc,setDesc] = React.useState(null);
  const [visibility,setVisibility] = React.useState("All");
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: 'success',
    type: 'error',
    autoHide: 300
  });
  const [loading, setLoading] = React.useState(false);
  const { vertical, horizontal, open, message, type,autoHide } = state;
  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleDescChange(event) {
    setDesc(event.target.value);
    // if(event.target.value == "radio")
  }


  function handleVisibilityChange(event,value){
    console.log(value);
    setVisibility(value);
  }
  function handleAddButton() {
    console.log(visibility);
    var visible_all = true;
    if(visibility !== "All"){
      visible_all = false;
    }
    try {
      var data = new FormData();
      const d = { event_id: props.id, title: title,description: desc,visible_all: visible_all }
      data = JSON.stringify(d);
      console.log(data);
      fetch(`http://139.59.16.53:4000/api/event/add_announcement`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'POST',
        body: data
      }).then(response => {
        console.log(response);
        response.json().then(value => {
          console.log(value);
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
    // console.log(token);

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
        <DialogTitle id="form-dialog-title">Add Announcement</DialogTitle>
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
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                name="description"
                fullWidth
                value={desc}
                required
                onChange={handleDescChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend">Announcement visibility</FormLabel>
              <RadioGroup aria-label="address" name="address" value={visibility} onChange={handleVisibilityChange} style={{ display: "inline" }}>
                <FormControlLabel value="All" control={<Radio color="default" />} label="All" />
                <FormControlLabel value="Registered Users" control={<Radio color="default" />} label="Registered Users" />
              </RadioGroup>
        </Grid>
          </Grid>

          {/* <Grid item xs={12} sm={6}> */}


          {/* </Grid> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddButton} disabled={loading} color="primary">
          {loading ? <CircularProgress color="primary" size={24} /> : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
