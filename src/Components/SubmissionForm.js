import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import useStyles from '../Themes/SignupPageStyles';

//MaterialUI imports
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Backdrop from '@material-ui/core/Backdrop';
import FormLabel from '@material-ui/core/FormLabel';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import Box from '@material-ui/core/Box';


//other components imports
import AuthContext from '../AuthContext';


//function for alert
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function SubmissionForm(props) {
    const classes = useStyles();
    const token = localStorage.getItem('token');
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: 'success',
        type: 'error',
        autoHide: 6000,
    });

    const [userMessage, setUserMessage] = React.useState(false);
    const [access, setAccess] = React.useState(true);
    const [editAccess, setEditAccess] = React.useState(false);

    const [formValues, setFormValues] = React.useState(null);
    const [uploadFiles, setUploadFiles] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [normalFields, setNormalFields] = React.useState([]);
    const [dropDownFields, setDropDownFields] = React.useState([]);
    const [checkboxFields, setCheckBoxFields] = React.useState([]);
    const [radioFields, setRadioFields] = React.useState([]);
    const [dateFields, setDateFields] = React.useState([]);
    const [longDescFields, setLongDescFields] = React.useState([]);
    const [linkFields, setLinkFields] = React.useState([]);
    const [fileUploadFields, setFileUploadFields] = React.useState([]);

    const { vertical, horizontal, open, message, type, autoHide } = state;
    const [backDropOpen, setBackDropOpen] = React.useState(true);
    const event = props.event;
    const colleges = ["VIT University,Vellore", "GITAM University, Bengaluru", "SRM University"];

    const { currentUser } = React.useContext(AuthContext);

    const currentRound = props.round;
    const currentDate = new Date();
    const roundStartDate = new Date(currentRound.start_date);
    const roundEndDate = new Date(currentRound.end_date);

    React.useEffect(() => {
        if (roundStartDate >= currentDate) {
            setAccess(false);
            setUserMessage("Round Not yet started");
        }
        else if (roundEndDate <= currentDate) {
            setAccess(false);
            setUserMessage("Round Ended");
        }
        // eslint-disable-next-line
    }, [event, currentUser])

    React.useEffect(() => {
        if (!props.individual && props.team) {
            if (props.team.members.length < event.team_size.min_team_size) {
                setAccess(false);
                setUserMessage("Form team with minimum of two members to make submission");
            }
            if (props.team.submissions[props.index].is_submitted) {
                setAccess(false);
                setUserMessage("submission Already made");
                setEditAccess(true);
                const submission_form = props.team.submissions[props.index].submission_form;
                const keys = Object.keys(submission_form);
                keys.forEach((sub, index) => {
                    setFormValues(formValues => ({ ...formValues, [sub]: submission_form[sub] }))
                })
            }
        }
        else if (props.registration) {
            if (props.registration.submissions[props.index].is_submitted) {
                setAccess(false);
                setUserMessage("submission Already made");
                setEditAccess(true);
                const submission_form = props.registration.submissions[props.index].submission_form;
                const keys = Object.keys(submission_form);
                keys.forEach((sub, index) => {
                    setFormValues(formValues => ({ ...formValues, [sub]: submission_form[sub] }))
                })
            }
        }
        // eslint-disable-next-line
    }, [props])


    React.useEffect(() => {
        const allFields = props.fields;
        if (allFields != null) {
            allFields.forEach(f => {
                if (f.title === "Name") {
                    setFormValues(formValues => ({ ...formValues, [f.title]: currentUser.name }))
                }
                else if (f.title === "Email") {
                    setFormValues(formValues => ({ ...formValues, [f.title]: currentUser.email }));
                }
                else if (f.title === "College") {
                    setFormValues(formValues => ({ ...formValues, [f.title]: currentUser.college_name }));
                }
                else {
                    setFormValues(formValues => ({ ...formValues, [f.title]: null }));
                }
                if (f.field === "checkbox") {

                }

            })
            // const filteredFields = allFields.filter(f => f.field !== "checkbox")
            setNormalFields(allFields.filter(f => f.field === "short_text"));
            setLongDescFields(allFields.filter((f) => f.field === "paragraph"));
            setCheckBoxFields(allFields.filter((f) => f.field === "checkboxes"));
            setRadioFields(allFields.filter(f => f.field === "radiobuttons"));
            setDateFields(allFields.filter((f) => f.field === "date"));
            setDropDownFields(allFields.filter(f => f.field === "dropdown"));
            setLinkFields(allFields.filter(f => f.field === "link"));
            setFileUploadFields(allFields.filter(f => f.field === "file"));

        }
        setBackDropOpen(false);
    }, [token, currentUser, props.fields])

    function handleClose() {
        if (message === "Successful.Stay tunned with notifications and announcements") {
            props.fetchAll();
        }
        setState({ ...state, open: false });
    }

    function handleChange(event) {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    }
    const handleChange2 = (name) => (event, values) => {
        setFormValues({ ...formValues, [name]: values });

    }
    const handleChange3 = (name) => (event) => {

        if (event.target.checked) {
            var array = [];
            if (formValues[name]) {
                array = formValues[name];
                array.push(event.target.name);
            }
            else {
                array.push(event.target.name);
            }
            setFormValues({ ...formValues, [name]: array });
        }
        else {
            const array = formValues[name];
            var index = array.indexOf(event.target.name);
            array.splice(index, 1);
            setFormValues({ ...formValues, [name]: array });
        }
    }

    const handleDateChange = (name) => (date) => {
        setFormValues({ ...formValues, [name]: date })
    };

    const handleLondDescChange = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value })
    }

    function handleradioChange(event, value) {
        setFormValues({ ...formValues, [event.target.name]: value });
    }

    function handleEventRegistration(e) {
        e.preventDefault();
        setLoading(true);
        var uploadedFilesIds = [];
        const formkeys = Object.keys(formValues);
        const fileFormKeys = Object.keys(uploadFiles);
        var count = 0;
        formkeys.forEach((v, index) => {
            const cField = props.fields.filter((value) => { return value.title === v });
            if (formValues[v] === null || formValues[v] === '') {
                if (fileFormKeys.includes(v)) {

                }
                else {
                    if (cField[0].req) {
                        count = count + 1;
                        setLoading(false);
                        setState({
                            open: true,
                            vertical: 'top',
                            horizontal: 'center',
                            message: 'Please fill in all required fields',
                            type: "error",
                            autoHide: 4000
                        });
                    }
                }
            }
        })
        if (fileFormKeys) {
            fileFormKeys.forEach(f => {
                const cField = props.fields.filter((value) => { return value.title === f });
                if (uploadFiles[f] === null) {
                    if (cField[0].req) {
                        count = count + 1;
                        setLoading(false);
                        setState({
                            open: true,
                            vertical: 'top',
                            horizontal: 'center',
                            message: 'Please fill in all fields',
                            type: "error",
                            autoHide: 4000
                        });
                    }
                }
            })
        }

        var finalValues = formValues;
        if (count === 0) {
            try {
                if (fileFormKeys.length > 0) {
                    fileFormKeys.forEach((key, index) => {
                        var data1 = new FormData();
                        data1.append('uploaded_file', uploadFiles[key]);
                        fetch(process.env.REACT_APP_API_URL + `/api/event/register/upload_file?id=${event._id}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                            method: 'POST',
                            body: data1
                        }).then((response) => {
                            if (response.status === 200) {
                                response.json().then(value => {
                                    setFormValues({ ...formValues, [key]: value.file_name })
                                    finalValues[key] = value.file_name
                                    uploadedFilesIds.push({ [key]: value.file_name });
                                    if (uploadedFilesIds.length === fileFormKeys.length) {
                                        var data = new FormData();
                                        const d = props.individual ? { event_id: event._id, reg_id: props.registration._id, submission: finalValues, is_teamed: false, event_round: currentRound.title } : { event_id: event._id, submission: finalValues, team_id: props.team_id, is_teamed: true, event_round: currentRound.title }
                                        data = JSON.stringify(d);
                                        fetch(process.env.REACT_APP_API_URL + `/api/event/team/add_submission`, {
                                            headers: {
                                                'Authorization': `Bearer ${token}`,
                                                'Content-Type': 'application/json',
                                                'Accept': 'application/json'
                                            },
                                            method: 'POST',
                                            body: data
                                        }).then(response => {
                                            if (response.status === 200) {
                                                response.json().then(value => {
                                                    setLoading(false);
                                                    setState({
                                                        open: true,
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                        message: 'Successful.Stay tunned with notifications and announcements',
                                                        type: "success",
                                                        autoHide: 4000
                                                    });
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    })
                }
                else {
                    var data = new FormData();
                    const d = props.individual ? { event_id: event._id, reg_id: props.registration._id, submission: finalValues, is_teamed: false, event_round: currentRound.title } : { event_id: event._id, submission: finalValues, team_id: props.team_id, is_teamed: true, event_round: currentRound.title }
                    data = JSON.stringify(d);
                    fetch(process.env.REACT_APP_API_URL + `/api/event/team/add_submission`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        method: 'POST',
                        body: data
                    }).then(response => {
                        if (response.status === 200) {
                            response.json().then(value => {
                                setLoading(false);
                                setState({
                                    open: true,
                                    vertical: 'top',
                                    horizontal: 'center',
                                    message: 'Successful.Stay tunned with notifications and announcements',
                                    type: "success",
                                    autoHide: 4000
                                });
                            })
                        }
                        else {
                            setLoading(false);
                            setState({
                                open: true,
                                vertical: 'top',
                                horizontal: 'center',
                                message: "something went wrong try again",
                                type: "error",
                                autoHide: 5000
                            })
                        }

                    })
                }
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
        }
    }

    function handleFileSelect(event) {
        if (event.target.files[0]) {
            setUploadFiles({ ...uploadFiles, [event.target.name]: event.target.files[0] });
        }
    }

    return (
        <div>
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
            <Backdrop className={classes.backdrop} open={backDropOpen}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <form style={{ margin: "20px" }}>

                <Grid container component="main" spacing={2}>
                    {normalFields.map((field, index) => {
                        if (field.title === "College") {
                            return (
                                <Grid item xs={12}>
                                    <Autocomplete
                                        fullWidth
                                        id={field.title}
                                        options={colleges}
                                        getOptionLabel={(option) => option}
                                        onChange={handleChange}
                                        value={formValues[field.title]}
                                        disabled
                                        renderInput={(params) => <TextField name={field.title} fullWidth required {...params} label={field.title} />}
                                    />
                                    <Box display="flex" justifyContent="flex-end">
                                        <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                                    </Box>
                                </Grid>)
                        }
                        else if (field.title === "Email") {
                            return (
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete='off'
                                        name={field.title}
                                        disabled
                                        // variant="outlined"
                                        // required
                                        fullWidth
                                        id={field.title}
                                        onChange={handleChange}
                                        value={formValues[field.title]}
                                        label={field.title}
                                        autoFocus
                                    />
                                    <Box display="flex" justifyContent="flex-end">
                                        <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                                    </Box>
                                </Grid>)
                        }
                        else {
                            return (
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete='off'
                                        name={field.title}
                                        // variant="outlined"
                                        margin="dense"
                                        required={field.req}
                                        fullWidth
                                        id={field.title}
                                        onChange={handleChange}
                                        value={formValues[field.title] || ""}
                                        label={field.title}
                                        autoFocus
                                    />
                                    <Box display="flex" justifyContent="flex-end">
                                        <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                                    </Box>
                                </Grid>)
                        }

                    })}
                    {
                        longDescFields.map((field, index) => {
                            return (
                                <Grid item xs={12}>
                                    <TextField
                                        multiline={true}
                                        rows="5"
                                        variant='outlined'
                                        placeholder={field.title}
                                        autoComplete='off'
                                        required={field.req}
                                        id={field.title}
                                        name={field.title}
                                        label={field.title}
                                        fullWidth
                                        onChange={handleLondDescChange}
                                        value={formValues[field.title] || ""}
                                    />
                                    <Box display="flex" justifyContent="flex-end">
                                        <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                                    </Box>
                                </Grid>
                            )
                        })
                    }
                    {checkboxFields.map((field, index) => {
                        return (
                            <Grid item xs={12}>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel required={field.req} component="legend">{field.title}</FormLabel>
                                    <FormGroup class={classes.formgroup}>
                                        {field.options.map((option) => {
                                            return <FormControlLabel
                                                control={<Checkbox color="primary" checked={formValues[field.title] !== null && formValues[field.title].includes(option)} onChange={handleChange3(field.title)} name={option} />}
                                                label={option}
                                            />
                                        })}
                                    </FormGroup>
                                </FormControl>
                                <Box display="flex" justifyContent="flex-end">
                                    <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                                </Box>
                            </Grid>
                        )
                    })}
                    {dropDownFields.map((field, index) => {
                        return (
                            <Grid item xs={12}>
                                <Autocomplete
                                    id={field.title}
                                    options={field.options.map((option) => option)}
                                    value={formValues[field.title]}
                                    onChange={handleChange2(field.title)}
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <TextField required={field.req} {...params} name={field.name} label={field.title} placeholder={field.name} />
                                    )}
                                />
                                <Box display="flex" justifyContent="flex-end">
                                    <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                                </Box>
                            </Grid>
                        )
                    })}
                    {radioFields.map((field, index) => {
                        return (
                            <Grid item xs={12}>
                                <FormLabel required={field.req} component="legend">{field.title}</FormLabel>
                                <RadioGroup required={field.req} aria-label="address" name={field.title} defaultValue={field.options[0]} value={formValues[field.title]} onChange={handleradioChange} style={{ display: "inline" }}>
                                    {field.options.map((option) => {
                                        return <FormControlLabel required={field.req} value={option} control={<Radio color="default" />} label={option} />
                                    })}
                                </RadioGroup>
                                <Box display="flex" justifyContent="flex-end">
                                    <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                                </Box>
                            </Grid>
                        )
                    })}
                    {
                        dateFields.map((field, index) => {
                            return (
                                <Grid item xs={12}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DateTimePicker
                                            // minDate={Date.now()}
                                            fullWidth
                                            required={field.req}
                                            variant="dialog"
                                            format="dd MMM yyyy hh:mm a zzz"
                                            margin="normal"
                                            id={field.title}
                                            label={field.title}
                                            name={field.title}
                                            // defaultValue={Date.now()}
                                            value={formValues[field.title]}
                                            onChange={handleDateChange(field.title)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <Box display="flex" justifyContent="flex-end">
                                        <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                                    </Box>
                                </Grid>
                            )
                        })
                    }

                    {
                        linkFields.map((field, index) => {
                            return (
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete='off'
                                        name={field.title}
                                        required={field.req}
                                        fullWidth
                                        id={field.title}
                                        onChange={handleChange}
                                        value={formValues[field.title] || ""}
                                        label={field.title}
                                        autoFocus
                                    />
                                    <Box display="flex" justifyContent="flex-end">
                                        <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                                    </Box>
                                </Grid>)
                        })
                    }
                    {
                        fileUploadFields.map((field, index) => {
                            if (editAccess) {
                                return <Grid item xs={12}>
                                    <Typography>{field.title}</Typography>
                                    <IconButton download target="_blank" href={process.env.REACT_APP_API_URL + `/api/event/registration/get_file?id=${formValues[field.title]}`} size="small" color="primary"><GetAppIcon></GetAppIcon></IconButton>
                                    <input id={index} name={field.title} required={field.req} type="file" onChange={handleFileSelect} style={{ "marginTop": "10px" }} ></input>
                                    <Box display="flex" justifyContent="flex-end">
                                        <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                                    </Box>
                                </Grid>
                            }
                            else {
                                return <Grid item xs={12}>
                                    <Typography>{field.title}</Typography>
                                    <input id={index} name={field.title} required={field.req} type="file" onChange={handleFileSelect} style={{ "marginTop": "10px" }} ></input>
                                    <Box display="flex" justifyContent="flex-end">
                                        <Typography color="textSecondary" variant="body2">{field.req && "*required"}</Typography>
                                    </Box>
                                </Grid>
                            }
                        })
                    }
                </Grid>
                {access && <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    className={classes.submit}
                    onClick={handleEventRegistration}
                >
                    {loading ? <CircularProgress color="primary" size={24} /> : "Submit"}
                </Button>}
                {
                    !access && <Typography style={{ margin: "20px 0px 10px 0px" }}>{userMessage}</Typography>
                }
                {editAccess && <Button
                    onClick={handleEventRegistration}
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    className={classes.submit}
                >
                    {loading ? <CircularProgress color="primary" size={24} /> : "Edit"}
                </Button>}
            </form>
        </div>
    )
}
export default SubmissionForm;