import React from 'react';


//MaterialUI imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';


//other component imports
import AddFieldDialog from '../Components/AddFieldDialog';
import AddRoundsDialog from '../Components/AddRoundsDialog';
import TermsandConditions from '../Components/EventPostTermsandConditions';


//css styles
const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(0),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
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


export default function EventPostForm(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [roundsDialogOpen, setRoundsDialogOpen] = React.useState(false);
    const [tandcOpen, setTandcOpen] = React.useState(false);
    const [prizeTitle, setPrizeTitle] = React.useState(null);
    const [prizeDesc, setPrizeDesc] = React.useState(null);
    const [prize, setPrize] = React.useState(null);
    const [prizes, setPrizes] = React.useState([]);
    const [socialMediaTitle, setSocialMediaTitle] = React.useState(null);
    const [socialMediaLink, setSocialMediaLink] = React.useState(null);
    const [socialMediaLinks, setSocialMediaLinks] = React.useState([]);

    React.useEffect(() => {
        setPrizes(props.prizes);
    }, [props.prizes])

    React.useEffect(() => {
        setSocialMediaLinks(props.socialMediaLinks);
    }, [props.socialMediaLinks])


    const handleClose = () => {
        setOpen(false);
        setRoundsDialogOpen(false);
    };

    const fields = {
        name: {
            'title': 'Name',
            'field': 'short_text',
            'req': true,
            'options': []
        },
        email: {
            'title': 'Email',
            'field': 'short_text',
            'req': true,
            'options': []
        },
        college: {
            'title': 'College',
            'field': 'short_text',
            'req': true,
            'options': []
        },
    }

    const [selectedFields, setSelectedFields] = React.useState([fields['name'], fields['email']]);

    const [state, setState] = React.useState({
        name: true,
        email: true,
        college: false,
    });

    React.useEffect(() => {
        if (props.fields.length > 2) {
            const arr = props.fields.filter(val => { return val.title === "College" });
            if (arr.length > 0) {
                setState({ ...state, college: true })
            }
            setSelectedFields(props.fields);
        }
        // eslint-disable-next-line
    }, [props.fields])

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

    const handleAddMoreButton = () => {
        setOpen(true);
    }

    function handleFieldAddButton(addingField, fName) {
        setSelectedFields(selectedFields => [...selectedFields, addingField[fName]]);
    }
    const handleDelete = (chipToDelete) => () => {
        if (chipToDelete.title === 'College') {
            setState({ ...state, college: false })
            setSelectedFields(selectedFields => selectedFields.filter((chip) => chip.title !== chipToDelete.title));
        }
        else if (chipToDelete.title !== 'Name' && chipToDelete.title !== 'Email') {
            setState({ ...state, [chipToDelete.title.toLowercase]: false })
            setSelectedFields(selectedFields => selectedFields.filter((chip) => chip.title !== chipToDelete.title));
        }
    };

    const handleRoundDelete = (chipToDelete) => () => {
        const rr = props.rounds;
        var uR = rr.filter((chip) => chip.title !== chipToDelete.title);
        var fR = [];
        uR.forEach((rou, index) => {
            fR.push({
                title: `Round ${index + 1}`,
                description: rou.description,
                start_date: rou.start_date,
                end_date: rou.end_date,
                link: rou.link,
                fields: rou.fields
            })
        });
        props.setRounds(fR);
    }

    const handlePostButton = async (e) => {
        e.preventDefault();
        if (props.regMode === "form") {
            await props.setFields(selectedFields);
            props.handlePost(selectedFields);
        }
        else {
            props.handlePost(null);
        }

    }

    const handleTermsClick = () => {
        setTandcOpen(true);
    }

    const handleAddRounds = (r) => {
        props.setRounds(rounds => [...rounds, r]);
    }

    const handlePrizeAddButton = () => {
        props.setPrizes(prizes => [...prizes, { title: prizeTitle, prize: prize, desc: prizeDesc }]);
        setPrizeTitle(null);
        setPrizeDesc(null);
        setPrize(null);
    }

    const handleSocialMediaAddButton = () => {
        props.setSocialMediaLinks(links => [...links, { title: socialMediaTitle, link: socialMediaLink }]);
        setSocialMediaTitle(null);
        setSocialMediaLink(null);
    }

    const handlePrizeDeleteButton = (index, data) => () => {
        var currentPrizes = props.prizes;
        currentPrizes.splice(index);
        props.setPrizes(currentPrizes);
    }

    const handleSocialMediaDeleteButton = (index, data) => () => {
        var currentLinks= props.socialMediaLinks;
        currentLinks.splice(index);
        props.setSocialMediaLinks(currentLinks);
    }

    const handlePrizeFieldChange = (title) => (event) => {
        if (title === "title") {
            setPrizeTitle(event.target.value)
        }
        else if (title === "desc") {
            setPrizeDesc(event.target.value);
        }
        else {
            setPrize(event.target.value);
        }
    }

    const handleSocialMediaFieldChange = (title) => (event) => {

        if (title === "Social Media") {
            setSocialMediaTitle(event.target.value);
        }
        else {
            setSocialMediaLink(event.target.value);
        }
    }

    const handleBack = () => {
        props.setFields(selectedFields);
        props.handleBack()
    }

    const handleRegistrationModeChange = (event) => {
        props.setRegMode(event.target.value);
    }

    function handleRegLinkChange(event) {
        props.setRegLink(event.target.value);
    }

    return (
        <React.Fragment>
            <form className={classes.form} onSubmit={handlePostButton}>
                <Grid container spacing={3}>

                    <AddFieldDialog
                        open={open}
                        handleClose={handleClose}
                        handleAdd={handleFieldAddButton}>
                    </AddFieldDialog>

                    <AddRoundsDialog
                        roundsCount={props.rounds.length}
                        open={roundsDialogOpen}
                        handleClose={handleClose}
                        handleAdd={handleAddRounds}>
                    </AddRoundsDialog>

                    <Grid item xs={12}>
                        <TextField
                            multiline={true}
                            helperText="Enter all rules and regulation including eligibility for participation"
                            rows="5"
                            variant='outlined'
                            placeholder="Enter all rules and regulation including eligibility for participation"
                            autoComplete='off'
                            onChange={(e) => { props.setRules(e.target.value) }}
                            value={props.rules}
                            id="rules"
                            name="rules"
                            label="Rules"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            multiline={true}
                            helperText="Enter your event themes like healthcare fintech"
                            rows="5"
                            variant='outlined'
                            placeholder="Enter your event themes like healthcare fintech"
                            autoComplete='off'
                            onChange={(e) => { props.setThemes(e.target.value) }}
                            value={props.themes}
                            id="themes"
                            name="themes"
                            label="Themes"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Prizes</FormLabel>
                            <Box display="flex" style={{ marginTop: "10px" }}>
                                <Box>
                                    <TextField onChange={handlePrizeFieldChange("title")} value={prizeTitle || ""} label="Prize Title" variant="outlined" style={{ marginRight: "5px" }}></TextField>
                                </Box>
                                <Box>
                                    <TextField onChange={handlePrizeFieldChange("prize")} value={prize || ""} label="Prize" variant="outlined"></TextField>
                                </Box>
                                <Box>
                                    <TextField onChange={handlePrizeFieldChange("desc")} value={prizeDesc || ""} label="Prize Description" variant="outlined"></TextField>
                                </Box>
                                <Box>
                                    <IconButton onClick={handlePrizeAddButton}>Add</IconButton>
                                </Box>
                            </Box>
                        </FormControl>
                    </Grid>
                    <Grid>
                        <Paper component="ul" className={classes.root}>
                            {prizes.map((data, index) => {
                                return (
                                    <li key={data.key}>
                                        <Chip
                                            label={data.title}
                                            onDelete={handlePrizeDeleteButton(index, data)}
                                            className={classes.chip}
                                        />
                                    </li>
                                );
                            })}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Social Media Links</FormLabel>
                            <Box display="flex" style={{ marginTop: "10px" }}>
                                <Box>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="outlined-age-native-simple">Social Media</InputLabel>
                                        <Select
                                            variant="outlined"
                                            style={{ width: "200px", marginRight: "5px" }}
                                            // fullWidth
                                            native
                                            label="Registration"
                                            inputProps={{
                                                name: 'registrationMode',
                                                id: 'registaration mode',
                                            }}
                                            value={socialMediaTitle || ""}
                                            onChange={handleSocialMediaFieldChange("Social Media")}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value="Instagram">Instagram</option>
                                            <option value="Facebook">Facebook</option>
                                            <option value="Youtube">Youtube</option>
                                            <option value="Twitter">Twitter</option>
                                            <option value="Github">Github</option>
                                            <option value="Website">Website</option>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <TextField onChange={handleSocialMediaFieldChange("link")} value={socialMediaLink || ""} label="Link" variant="outlined"></TextField>
                                </Box>
                                <Box>
                                    <IconButton onClick={handleSocialMediaAddButton}>Add</IconButton>
                                </Box>
                            </Box>
                        </FormControl>
                    </Grid>

                    <Grid>
                        <Paper component="ul" className={classes.root}>
                            {socialMediaLinks.map((data, index) => {
                                return (
                                    <li key={data.key}>
                                        <Chip
                                            label={data.title}
                                            onDelete={handleSocialMediaDeleteButton(index, data)}
                                            className={classes.chip}
                                        />
                                    </li>
                                );
                            })}
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel htmlFor="outlined-age-native-simple">Registration</InputLabel>
                            <Select
                                fullWidth
                                native
                                label="Registration"
                                inputProps={{
                                    name: 'registrationMode',
                                    id: 'registaration mode',
                                }}
                                value={props.regMode || ""}
                                onChange={handleRegistrationModeChange}
                            >
                                <option aria-label="None" value="" />
                                <option value="form">Our Platform(Ellipse)</option>
                                <option value="link">Other</option>
                            </Select>
                        </FormControl>
                    </Grid>

                    {props.regMode === "link" && <Grid item xs={12}>
                        <TextField
                            autoComplete='off'
                            required
                            id="regLink"
                            name="regLink"
                            label="Registration Link"
                            fullWidth
                            value={props.regLink || ""}
                            onChange={handleRegLinkChange}
                        />
                    </Grid>}

                    {props.regMode === "form" && <React.Fragment>
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
                                </FormGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                color="default"
                                onClick={handleAddMoreButton}>
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
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Rounds(Optional)</FormLabel>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                color="default"
                                onClick={() => { setRoundsDialogOpen(true) }}>
                                Add Rounds
                        </Button>
                        </Grid>

                        <Grid>
                            <Paper component="ul" className={classes.root}>
                                {props.rounds.map((data) => {
                                    return (
                                        <li key={data.key}>
                                            <Chip
                                                label={data.title}
                                                onDelete={handleRoundDelete(data)}
                                                className={classes.chip}
                                            />
                                        </li>
                                    );
                                })}
                            </Paper>
                        </Grid>
                    </React.Fragment>}

                    <Grid item xs={12}>
                        <Typography>By posting the event.I accept the
                        <Button color="primary" onClick={handleTermsClick}>
                                Terms and Conditions
                        </Button>
                        </Typography>
                    </Grid>
                </Grid>

                <div className={classes.buttons}>
                    <Button onClick={handleBack} className={classes.button}>
                        Back
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}>
                        Post
                    </Button>
                </div>
            </form>
            <TermsandConditions open={tandcOpen} setOpen={setTandcOpen}></TermsandConditions>
        </React.Fragment>
    );
}