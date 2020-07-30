import React from 'react';
import Grid from '@material-ui/core/Grid';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

//MaterialUI imports
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import Chip from '@material-ui/core/Chip';

import FormLabel from '@material-ui/core/FormLabel';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

import AddFieldDialog from '../Components/AddFieldDialog';
// import { keys } from '@material-ui/core/styles/createBreakpoints';

import Paper from '@material-ui/core/Paper';



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
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(0),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    formControl: {
        // marginTop: theme.spacing(3),
    },
    formgroup: {
        marginTop: theme.spacing(1),
    },
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

export default function AddressForm(props) {


    const classes = useStyles();
    // const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    //   const [state, setState] = React.useState({
    //     open: false,
    //     vertical: 'top',
    //     horizontal: 'center',
    //     message: 'success',
    //     type: 'error'
    //   });
    // const [fields, setFields] = React.useState([{
    //     'name': 'name',
    //     'type': 'String',
    // },
    // {
    //     'name': 'email',
    //     'type': 'String'
    // }, {
    //     'name': 'college',
    //     'type': 'String'
    // }])
    // const [fields, setFields] = React.useState({
    //     name: {
    //         'name': 'name',
    //         'type': 'String',
    //     },
    //     email: {
    //         'name': 'email',
    //         'type': 'String'
    //     },
    //     college: {
    //         'name': 'college',
    //         'type': 'String'
    //     },
        
    // })
    const fields = {
        name: {
            'name': 'name',
            'type': 'String',
        },
        email: {
            'name': 'email',
            'type': 'String'
        },
        college: {
            'name': 'college',
            'type': 'String'
        },
        
    }
    const [selectedFields, setSelectedFields] = React.useState([]);

    console.log(fields.name);
    const [state, setState] = React.useState({
        name: false,
        email: false,
        college: false,
    });
    const handleChange = (event) => {
        // setSelectedFields(selectedFields=>[...selectedFields,event.target.name])
        setState({ ...state, [event.target.name]: event.target.checked });
        // console.log(event.target.name);
        const sName = event.target.name;
        if(event.target.checked){
            setSelectedFields(selectedFields => [...selectedFields, fields[sName]]);
        }
        else if(!event.target.checked){
            setSelectedFields(selectedFields => selectedFields.filter((chip) => chip.name !== sName));
        }
        
    };
    const { name, email, college} = state;
    console.log(selectedFields);
    function handleAddMoreButton() {
        setOpen(true);
    }
    function handleFieldAddButton(addingField, fName) {
        setSelectedFields(selectedFields => [...selectedFields, addingField[fName]]);
    }
    const handleDelete = (chipToDelete) => () => {
        setState({...state,[chipToDelete.name]: false})
        setSelectedFields(selectedFields => selectedFields.filter((chip) => chip.name !== chipToDelete.name));
    };

    async function handlePostButton(e){
        e.preventDefault();
        console.log(selectedFields);
        await props.setFields(selectedFields);
        props.handlePost(selectedFields);
        // console.log(selectedFields);
    }

    return (
        <React.Fragment>

            <form className={classes.form} onSubmit={handlePostButton} encType="multipart/form-data">
                <Grid container spacing={3}>
                    <AddFieldDialog
                        open={open}
                        handleClose={handleClose}
                        handleAdd={handleFieldAddButton}></AddFieldDialog>
                    <Grid item xs={12}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Fields for your Registration Form</FormLabel>
                            <FormGroup  class={classes.formgroup}>
                                <FormControlLabel
                                    control={<Checkbox  color="primary" checked={name} onChange={handleChange} name="name" />}
                                    label="Name"
                                />
                                <FormControlLabel
                                    control={<Checkbox color="primary" checked={email} onChange={handleChange} name="email" />}
                                    label="Email"
                                />
                                <FormControlLabel
                                    control={<Checkbox color="primary" checked={college} onChange={handleChange} name="college" />}
                                    label="College"
                                />
                                {/* <FormControlLabel
                                    control={<Checkbox color="primary" checked={phno} onChange={handleChange} name="phno" />}
                                    label="Phone No"
                                />
                                <FormControlLabel
                                    control={<Checkbox color="primary" checked={github} onChange={handleChange} name="github" />}
                                    label="Github"
                                /> */}
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            color="default"
                            onClick={handleAddMoreButton}
                        >
                            Add More
                        </Button>
                    </Grid>
                    <Grid>
                    <Paper component="ul" className={classes.root}>
                        {selectedFields.map((data) => {
                            return (
                                <li key={data.key}>
                                    <Chip
                                        
                                        label={data.name}
                                        onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                                        className={classes.chip}
                                    />
                                </li>
                            );
                        })}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="primary" name="terms" />}
                            label="I accept the terms and conditions"
                        />
                    </Grid>
                </Grid>
                <div className={classes.buttons}>
                    <Button onClick={props.handleBack} className={classes.button}>
                        Back
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >Post
                    </Button>
                </div>
            </form>
        </React.Fragment>
    );
}