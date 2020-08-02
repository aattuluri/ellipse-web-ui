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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import { Grid } from '@material-ui/core';



// const useStyles = makeStyles((theme) => ({
//     dialog:{
//         backgroundColor: theme.palette.secondary.main
//     }
// }));


export default function EventReportDialog(props) {
    // const classes = useStyles();
    
    const [title, setTitle] = React.useState(null);
    const [desc, setDesc] = React.useState(null);
    const event = props.event;

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleDescChange(event){
        setDesc(event.target.value);
    }

    function handleAddButton() {
        // if (type !== "radiobutton" && type !== "checkbox" && type !== "dropdown") {
        //     props.handleAdd({ [name]: { 'name': name, 'type': type } }, name);
        // }
        // else {
        //     props.handleAdd({ [name]: { 'name': name, 'type': type, 'options': selectedOptions } }, name);
        // }
        // props.handleClose()

    }


    return (
        <div>
            <Dialog open={props.open} fullWidth={true} PaperProps={{
                style: {
                    backgroundColor: "#1C1C1E",
                    boxShadow: 'none',
                },
            }} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Report({event.name})</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                label="Issue Title"
                                name="title"
                                fullWidth
                                value={title}
                                required
                                onChange={handleTitleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                id="desc"
                                label="Issue Description"
                                name="desc"
                                fullWidth
                                value={desc}
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
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
