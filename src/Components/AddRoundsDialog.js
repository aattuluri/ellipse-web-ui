import React from 'react';

//Materail impports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { Grid, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { NextWeekOutlined } from '@material-ui/icons';

import AddFieldDialog from '../Components/AddFieldDialog';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker, } from '@material-ui/pickers';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));



export default function FormDialog(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [desc, setDesc] = React.useState('');
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [action, setAction] = React.useState('form');
    const [link, setLink] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [selectedFields, setSelectedFields] = React.useState([]);

    const handleClose = () => {
        setOpen(false);
    };


    function handleActionChange(event, value) {
        setAction(value);
    }

    function handleAddButton() {
        props.handleAdd({ 
            title: `Round ${props.roundsCount + 1}`, 
            description: desc,
            start_date: startDate,
            end_date: endDate, 
            action: action, 
            link: link, 
            fields: selectedFields })
        props.handleClose()
        setDesc('');
        setStartDate(null);
        setEndDate(null);
        setAction('form');
        setLink('');
        setSelectedFields([]);

    }

    function handleFieldAddButton(addingField, fName) {
        setSelectedFields(selectedFields => [...selectedFields, addingField[fName]]);
    }

    const handleDelete = (chipToDelete) => () => {
        setSelectedFields(selectedFields => selectedFields.filter((chip) => chip.title !== chipToDelete.title));
    };

    return (
        <div>
            <Dialog open={props.open} fullWidth={true} PaperProps={{
                style: {
                    backgroundColor: theme.palette.secondary.main,
                    boxShadow: 'none',
                },
            }} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Rounds</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} >
                        {/* <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name"
                                name="name"
                                fullWidth
                                disabled
                                value={name}
                                required
                                onChange={(e) => { setName(e.target.value) }}
                            />
                        </Grid> */}
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="desc"
                                label="Description"
                                name="desc"
                                fullWidth
                                value={desc}
                                required
                                onChange={(e) => { setDesc(e.target.value) }}
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} required >
                                <DateTimePicker
                                    inputProps={{ required: true }}
                                    minDate={Date.now()}
                                    fullWidth
                                    required
                                    variant="dialog"
                                    format="dd MMM yyyy hh:mm a zzz"
                                    margin="normal"
                                    id="startDate"
                                    label="Start Date"
                                    name="startDate"
                                    value={startDate}
                                    onChange={(date) => { setStartDate(date) }}
                                //   error={startDateError}
                                //   helperText={startDateError && "Fill this field"}
                                />
                            </MuiPickersUtilsProvider>

                        </Grid>
                        <Grid item xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker
                                    minDate={Date.now()}
                                    fullWidth
                                    required
                                    variant="dialog"
                                    format="dd MMM yyyy hh:mm a zzz"
                                    margin="normal"
                                    id="endDate"
                                    label="End Date"
                                    name="endDate"
                                    value={endDate}
                                    onChange={(date) => { setEndDate(date) }}
                                //   error={endDateError}
                                //   helperText={endDateError && "Fill this field"}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <FormLabel component="legend">Action</FormLabel>
                            <RadioGroup aria-label="address" name="address" value={action} onChange={handleActionChange} style={{ display: "inline" }}>
                                <FormControlLabel value="form" control={<Radio color="default" />} label="Create Form" />
                                {/* <FormControlLabel value="hackathon_template" control={<Radio color="default" />} label="Use Hackathon Template" /> */}
                                <FormControlLabel value="link" control={<Radio color="default" />} label="Provide Link" />
                            </RadioGroup>
                        </Grid>
                        {action === "link" && <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="platform_link"
                                label="Platform Link"
                                name="platform_link"
                                fullWidth
                                value={link}
                                required
                                onChange={(e) => { setLink(e.target.value) }}
                            />
                        </Grid>}
                        {action === 'form' && <Grid item xs={12}>
                            <Typography>Fields</Typography>
                            <Paper component="ul" className={classes.root}>
                                {selectedFields.map((data) => {
                                    return (
                                        <li key={data.key}>
                                            <Chip
                                                label={data.title}
                                                onDelete={handleDelete(data)}
                                                className={classes.chip}
                                            />
                                        </li>
                                    );
                                })}
                            </Paper>
                        </Grid>}
                        {action === "form" && <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                color="default"
                                onClick={() => { setOpen(true) }}>
                                Add Field
                        </Button>
                        </Grid>}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddButton} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <AddFieldDialog
                open={open}
                handleAdd={handleFieldAddButton}
                handleClose={handleClose}>
            </AddFieldDialog>
        </div>
    );
}
