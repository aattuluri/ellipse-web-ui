import React from 'react';


//MaterialUI imports
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import AddFieldDialog from '../Components/AddFieldDialog';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';



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

    const fields = {
        name: {
            'title': 'Name',
            'field': 'short_text',
            'options': []
        },
        email: {
            'title': 'Email',
            'field': 'short_text',
            'options': []
        },
        college: {
            'title': 'College',
            'field': 'short_text',
            'options': []
        },

    }
    const [selectedFields, setSelectedFields] = React.useState([fields['name'], fields['email']]);
    const [state, setState] = React.useState({
        name: true,
        email: true,
        college: false,
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        const sName = event.target.name;
        if (event.target.checked) {
            setSelectedFields(selectedFields => [...selectedFields, fields[sName]]);
        }
        else if (!event.target.checked) {
            setSelectedFields(selectedFields => selectedFields.filter((chip) => chip.title !== sName));
        }

    };
    const { name, email, college } = state;
    // console.log(selectedFields);
    function handleAddMoreButton() {
        setOpen(true);
    }
    function handleFieldAddButton(addingField, fName) {
        setSelectedFields(selectedFields => [...selectedFields, addingField[fName]]);
    }
    const handleDelete = (chipToDelete) => () => {
        // console.log(chipToDelete.title)
        if (chipToDelete.title === 'College') {
            setState({ ...state, college: false })
            setSelectedFields(selectedFields => selectedFields.filter((chip) => chip.title !== chipToDelete.title));
        }
        else if (chipToDelete.title !== 'Name' && chipToDelete.title !== 'Email') {
            setState({ ...state, [chipToDelete.title.toLowercase]: false })
            setSelectedFields(selectedFields => selectedFields.filter((chip) => chip.title !== chipToDelete.title));
        }

    };

    async function handlePostButton(e) {
        e.preventDefault();
        await props.setFields(selectedFields);
        props.handlePost(selectedFields);
    }

    return (
        <React.Fragment>

            <form className={classes.form} onSubmit={handlePostButton}>
                <Grid container spacing={3}>
                    <AddFieldDialog
                        open={open}
                        handleClose={handleClose}
                        handleAdd={handleFieldAddButton}></AddFieldDialog>
                    <Grid item xs={12}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Fields for your Registration Form</FormLabel>
                            <FormGroup className={classes.formgroup}>
                                <FormControlLabel
                                    control={<Checkbox disabled color="primary" checked={name} onChange={handleChange} name="name" />}
                                    label="Name"
                                />
                                <FormControlLabel
                                    control={<Checkbox disabled color="primary" checked={email} onChange={handleChange} name="email" />}
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

                                            label={data.title}
                                            onDelete={handleDelete(data)}
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