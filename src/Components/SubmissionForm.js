import React from 'react';
import useStyles from '../Themes/SignupPageStyles';

//MaterialUI imports
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Backdrop from '@material-ui/core/Backdrop';
import AuthContext from '../AuthContext';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
import FormLabel from '@material-ui/core/FormLabel';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import { set } from 'date-fns';
// import AuthContext from '../AuthContext';
// import TermsandConditions from '../Components/EventRegisterTermsandConditions';
// import EventsContext from '../EventsContext';
// import ActiveEventsContext from '../ActiveEventsContext';

//function for alert
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function AboutEventPanel(props) {
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
    // const [fields, setFields] = React.useState([]);
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
    // const [event, setEvent] = React.useState({});
    const event = props.event;
    const [checkedValues, setCheckedValues] = React.useState([]);
    const colleges = ["VIT University,Vellore", "GITAM University", "SRM University"];
    // const [tandcOpen, setTandcOpen] = React.useState(false);

    const { currentUser } = React.useContext(AuthContext);

    const currentRound = props.round;
    const currentDate = new Date();
    const roundStartDate = new Date(currentRound.start_date);
    const [submission, setSubmission] = React.useState({});
    // const roundEndDate = new Date(currentRound.end_date);

    // function handleTermsClick() {
    //     setTandcOpen(true);
    // }

    React.useEffect(() => {
        if (roundStartDate >= currentDate) {
            setAccess(false);
            setUserMessage("Round Not yet started");
        }
        // eslint-disable-next-line
    }, [event, currentUser])

    React.useEffect(() => {
        if (!props.individual && props.team) {
            if (props.team.submissions[props.index].is_submitted) {
                setAccess(false);
                setUserMessage("submission Already made");
                setEditAccess(true);
                getSubmission(props.team.submissions[props.index].submission_id)
            }
        }
        else if (props.registration) {
            if (props.registration.submissions[props.index].is_submitted) {
                setAccess(false);
                setUserMessage("submission Already made");
                setEditAccess(true);
                getSubmission(props.registration.submissions[props.index].submission_id)
            }
        }
        // eslint-disable-next-line
    }, [props])

    const getSubmission = (id) => {
        try {
            fetch(process.env.REACT_APP_API_URL + `/api/event/get_submission?id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'GET',
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(value => {
                        const keys = Object.keys(value.submission);
                        setSubmission(value);
                        keys.forEach((sub, index) => {
                            setFormValues(formValues => ({ ...formValues, [sub]: value.submission[sub] }))
                        })
                    })
                }

            })
        }
        catch (e) {
            console.log(e);
        }
    }

    React.useEffect(() => {

        const allFields = props.fields;
        // console.log(allFields);
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
            // setLongDescFields(allFields.filter((f) => f.field === "long_desc"));
            setDropDownFields(allFields.filter(f => f.field === "dropdown"));
            setLinkFields(allFields.filter(f => f.field === "link"));
            setFileUploadFields(allFields.filter(f => f.field === "file_upload"));

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
            setCheckedValues(checkedValues => [...checkedValues, { [name]: event.target.name }]);
            const array = [];
            checkedValues.forEach((v, i) => {
                if (v[name]) {
                    array.push(v[name])
                }
            });
            array.push(event.target.name);
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
        // console.log(formkeys);
        // console.log(fileFormKeys);
        var count = 0;
        formkeys.forEach(v => {
            if (formValues[v] === null) {
                if (v.includes(fileFormKeys)) {

                } else {
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

                // break;
            }
        })
        if (fileFormKeys) {
            fileFormKeys.forEach(f => {
                if (uploadFiles[f] === null) {
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
                    // break;
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
                                        // console.log(uploadedFilesIds);
                                        // console.log(finalValues);
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
                                            // console.log(response);
                                            if (response.status === 200) {
                                                response.json().then(value => {
                                                    // console.log(value);

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
                        // console.log(response);
                        if (response.status === 200) {
                            response.json().then(value => {
                                // console.log(value);

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
        console.log(event.target.name)
        if (event.target.files[0]) {
            setUploadFiles({ ...uploadFiles, [event.target.name]: event.target.files[0] });
            // setImage(event.target.files[0]);
            // setImageAsFile(imageFile => (image))
            // const url = URL.createObjectURL(event.target.files[0]);
            // const fileType = event.target.files[0].type;
            // setImageurl(url);
            // setImageType(fileType.substr(fileType.indexOf('/') + 1));
        }
    }


    const handleEditButton = () => {
        setLoading(true);
        var uploadedFilesIds = [];
        const formkeys = Object.keys(formValues);
        const fileFormKeys = Object.keys(uploadFiles);
        // console.log(formkeys);
        // console.log(fileFormKeys);
        var count = 0;
        formkeys.forEach(v => {
            if (formValues[v] === null) {
                if (v.includes(fileFormKeys)) {

                } else {
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

                // break;
            }
        })
        if (fileFormKeys) {
            fileFormKeys.forEach(f => {
                if (uploadFiles[f] === null) {
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
                    // break;
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
                                        // console.log(uploadedFilesIds);
                                        // console.log(finalValues);
                                        var data = new FormData();
                                        const d = { sub_id: submission._id, submission: finalValues, is_teamed: true }
                                        data = JSON.stringify(d);
                                        fetch(process.env.REACT_APP_API_URL + `/api/event/team/edit_submission`, {
                                            headers: {
                                                'Authorization': `Bearer ${token}`,
                                                'Content-Type': 'application/json',
                                                'Accept': 'application/json'
                                            },
                                            method: 'POST',
                                            body: data
                                        }).then(response => {
                                            // console.log(response);
                                            if (response.status === 200) {
                                                response.json().then(value => {
                                                    // console.log(value);

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
                    const d = { sub_id: submission._id, submission: finalValues, is_teamed: true }
                    data = JSON.stringify(d);
                    fetch(process.env.REACT_APP_API_URL + `/api/event/team/edit_submission`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        method: 'POST',
                        body: data
                    }).then(response => {
                        // console.log(response);
                        if (response.status === 200) {
                            response.json().then(value => {
                                // console.log(value);

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
            <form className={classes.form} onSubmit={handleEventRegistration}>

                <Grid container spacing={2}>
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
                                        required
                                        fullWidth
                                        id={field.title}
                                        onChange={handleChange}
                                        value={formValues[field.title]}
                                        label={field.title}
                                        autoFocus
                                    />
                                </Grid>)
                        }
                        else {
                            return (
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete='off'
                                        name={field.title}
                                        // variant="outlined"
                                        required
                                        fullWidth
                                        id={field.title}
                                        onChange={handleChange}
                                        value={formValues[field.title] || ""}
                                        label={field.title}
                                        autoFocus
                                    />
                                </Grid>)
                        }

                    })}
                    {checkboxFields.map((field, index) => {
                        return (
                            <Grid item xs={12}>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">{field.title}</FormLabel>
                                    <FormGroup class={classes.formgroup}>
                                        {field.options.map((option) => {
                                            return <FormControlLabel
                                                control={<Checkbox color="primary" onChange={handleChange3(field.title)} name={option} />}
                                                label={option}
                                            />
                                        })}
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                        )
                    })}
                    {dropDownFields.map((field, index) => {
                        return (
                            <Grid item xs={12}>
                                <Autocomplete
                                    id={field.title}
                                    options={field.options.map((option) => option)}
                                    // freeSolo
                                    // onChange={handleeventTagsChange}
                                    onChange={handleChange2(field.title)}
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <TextField required {...params} name={field.name} label={field.title} placeholder={field.name} />
                                    )}
                                />
                            </Grid>
                        )
                    })}
                    {radioFields.map((field, index) => {
                        console.log(field.options[0])
                        return (
                            <Grid item xs={12}>
                                <FormLabel required component="legend">{field.title}</FormLabel>
                                <RadioGroup required aria-label="address" name={field.title} defaultValue={field.options[0]} value={formValues[field.title]} onChange={handleradioChange} style={{ display: "inline" }}>
                                    {field.options.map((option) => {
                                        return <FormControlLabel required value={option} control={<Radio color="default" />} label={option} />
                                    })}

                                    {/* <FormControlLabel value="Paid" control={<Radio color="default" />} label="Paid" /> */}
                                </RadioGroup>
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
                                            required
                                            variant="inline"
                                            format="dd MMM yyyy hh:mm a zzz"
                                            margin="normal"
                                            id={field.title}
                                            label={field.title}
                                            name={field.title}
                                            // defaultValue={Date.now()}
                                            value={formValues[field.title] || ""}
                                            onChange={handleDateChange(field.title)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>

                                </Grid>
                            )
                        })
                    }
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
                                        required
                                        id={field.title}
                                        name={field.title}
                                        label={field.title}
                                        fullWidth
                                        onChange={handleLondDescChange}
                                        value={formValues[field.title] || ""}
                                    // value={props.about}
                                    />
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
                                        // variant="outlined"
                                        required
                                        fullWidth
                                        id={field.title}
                                        onChange={handleChange}
                                        value={formValues[field.title] || ""}
                                        label={field.title}
                                        autoFocus
                                    />
                                </Grid>)
                        })
                    }
                    {
                        fileUploadFields.map((field, index) => {
                            return <Grid item xs={12}>
                                <Typography>{field.title}</Typography>
                                <input id="contained-button-file" name={field.title} required type="file" onChange={handleFileSelect} ></input>
                            </Grid>
                        })
                    }

                    {/* <Grid item xs={12}>
                        <Typography>By registering for the event.I accept the <Button onClick={handleTermsClick} color="primary">Terms and Conditions</Button></Typography>
                    </Grid> */}
                </Grid>
                {access && <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    className={classes.submit}
                >
                    {loading ? <CircularProgress color="primary" size={24} /> : "Submit"}
                </Button>}
                {
                    !access && <Typography>{userMessage}</Typography>
                }
                {editAccess && <Button
                    // type="submit"
                    onClick={handleEditButton}
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
export default AboutEventPanel;

