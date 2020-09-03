import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import AuthContext from '../AuthContext';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center",
        // backgroundColor: theme.palette.primary.light,
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        alignContent: "center"

    },
    media: {
        // height: 250,
        // paddingTop: '56.25%', // 16:9
    },

    avatar: {
        backgroundColor: theme.palette.primary.main,
    },
    buttonDiv: {
        marginLeft: 'auto',
    },
   
    large: {
        width: theme.spacing(17),
        height: theme.spacing(17),
    },
    tab: {
        flexGrow: 1,
        // maxWidth: 800,
        background: theme.palette.secondary.main,
        alignItems: 'center',
    },
    button: {
        marginTop: theme.spacing(4),

    },
}));


//function for alert
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function UpdateInfoTabPanel(props) {
    const classes = useStyles();
    const { children, value, url, index, ...other } = props;
    // const [open, setOpen] = React.useState(false);
    const user = React.useContext(AuthContext);
    // const url = user.imageUrl;
    const token = localStorage.getItem('token');
    const [colleges, setColleges] = React.useState([]);
    const [image, setImage] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [userName, setUserName] = React.useState(null);
    const [bio, setBio] = React.useState(null);
    const [gender, setGender] = React.useState(null);
    const [designation, setDesignation] = React.useState(null);
    const [collegeName, setCollegeName] = React.useState(null);
    const [collegeId,setCollegeId] = React.useState(null);
    const [collegesName,setCollegesName] = React.useState([]);
    const [imageUrl,setImageurl] = React.useState(null);
    const [imageUpdated,setImageUpdated] = React.useState(false);
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: 'success',
        type: 'error',
        autoHide: 300
    });
    const [loading, setLoading] = React.useState(false);
    const { vertical, horizontal, open, message, type } = state;

    React.useEffect(() => {
        setEmail(user.email);
        setName(user.name);
        setUserName(user.username);
        setDesignation(user.designation);
        setCollegeName(user.college_name);
        setCollegeId(user.college_id);
        setBio(user.bio);
        setGender(user.gender);
        fetch(process.env.REACT_APP_API_URL+'/api/colleges', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET',
        }).then(response => {
            response.json().then(value => {
                setColleges(value);
                value.forEach((v)=>{
                    setCollegesName((collegesNames)=>[...collegesNames,v.name])
                  })
                // setCollegeNames()
            })
        })
        // eslint-disable-next-line
    }, [token])
    // console.log(user.college_name);

    const handleClose = async (event, reason) => {

        if (message === "successful") {
            // history.replace("/home")
        }

        setState({ ...state, open: false });
    };

    function handleChange(event) {
        if (event.target.files[0]) {
          setImage(event.target.files[0]);
        //   setImageAsFile(imageFile => (image))
          const url = URL.createObjectURL(event.target.files[0]);
        //   const fileType = event.target.files[0].type;
          setImageurl(url)
          setImageUpdated(true);
        //   setImageType(fileType.substr(fileType.indexOf('/') + 1));
        }

    }
    function handleName(event,value){
        setName(event.target.value);
    }
    function handleEmail(event,value){
        setEmail(value);
    }
    function handleGender(event,value){
        console.log(event.target.value);
        setGender(event.target.value);
    }
    function handleDesig(event,value){
        setDesignation(event.target.value);
    }
    function handleCollege(event,value){
        setCollegeName(value);
        colleges.forEach(c=>{
            if(c.name === value){
            //   props.collegeId(c._id)
            setCollegeId(c._id);
            }
          })
        
    }
    function handleUserName(event,value){
        setUserName(event.target.value);
    }
    function handleBio(event,value){
        setBio(value);
    }

    function handleUpdateButton(event){
        event.preventDefault();
        setLoading(true);
        // console.log(name);
        // console.log(userName)

        try {
            var data = new FormData()
            const payload = {
                name: name,
                email: email,
                username: userName,
                // college_name: collegeName,
                college_id: collegeId,
                designation : designation,
                gender: gender,
                // college_id: collegeId.value,
                bio: bio,
            };
            data = JSON.stringify(payload);
            // console.log(data);
            // http://139.59.16.53:4000/api
            fetch(process.env.REACT_APP_API_URL+'/api/users/updateprofile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: data
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(val => {
                        // console.log(val.message)
                        if (imageUpdated) {
                            var data2 = new FormData()
                            data2.append("image", image);
                            fetch(process.env.REACT_APP_API_URL+'/api/users/uploadImage', {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                },
                                method: 'POST',
                                body: data2
                            }).then(res => {
                                if (res.status === 200) {
                                    setLoading(false);
                                    setState({
                                        open: true,
                                        vertical: 'top',
                                        horizontal: 'center',
                                        message: "successful",
                                        type: "success",
                                        autoHide: 300
                                    })
                                }
                            })
                        }
                        else {

                            setLoading(false);
                            setState({
                                open: true,
                                vertical: 'top',
                                horizontal: 'center',
                                message: "successful",
                                type: "success",
                                autoHide: 300
                            })

                        }
                    })

                }
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
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <div className={classes.root}>
                <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                key={vertical + horizontal}
            >
                <Alert onClose={handleClose} severity={type}>{message}</Alert>
            </Snackbar>
                    <Grid container component="main" justify="center" spacing={2}>
                        <Grid item xs={12} md={12} alignContent="center" alignItems="center">
                            <Grid container component="main" justify="center" spacing={2}>
                                <input id="contained-button-file" required type="file" accept="image/*" onChange={handleChange} style={{ display: "none" }}></input>
                                <Badge
                                    overlap="circle"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    badgeContent={<label htmlFor="contained-button-file">
                                        <IconButton style={{ backgroundColor: "black" }} color="primary" aria-label="upload picture" component="span">
                                            <EditIcon></EditIcon>
                                        </IconButton>
                                    </label>}>
                                    <Avatar className={classes.large} sizes="100" alt="" src={imageUpdated ? imageUrl : process.env.REACT_APP_API_URL+`/api/image?id=${user.profile_pic}`}></Avatar>
                                </Badge>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                autoComplete="fullName"
                                name="fullName"
                                value={name || ""}
                                onChange={handleName}
                                id="fullName"
                                label="Full Name"
                                autoFocus
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                            disabled
                                id="email"
                                value={email}
                                onChange={handleEmail}
                                fullWidth
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                // variant="outlined"
                                fullWidth
                                required
                                id="username"
                                label="User Name"
                                name="username"
                                value={userName}
                                onChange={handleUserName}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                fullWidth
                                id="college"
                                options={collegesName}
                                getOptionLabel={(option) => option}
                                // onChange={handleChange}
                                value={collegeName}
                                onChange={handleCollege}
                                renderInput={(params) => <TextField name="college" fullWidth required {...params} label="College" />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                multiline={true}
                                rows="5"
                                variant='outlined'
                                placeholder="Bio"
                                autoComplete='off'
                                required
                                id="bio"
                                name="bio"
                                label="Bio"
                                fullWidth
                                value={bio}
                                onChange={handleBio}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel htmlFor="outlined-age-native-simple">Gender</InputLabel>
                                <Select
                                    value={gender}
                                    onChange={handleGender}
                                    fullWidth
                                    native
                                    label="Age"
                                    inputProps={{
                                        name: 'gender',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel htmlFor="outlined-age-native-simple">You are</InputLabel>
                                <Select
                                    value={designation}
                                    onChange={handleDesig}
                                    fullWidth
                                    native
                                    label="You are"
                                    inputProps={{
                                        name: 'designation',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value="Student">Student</option>
                                    <option value="WorkingProfessional">Working Professional</option>
                                    <option value="Club/Organisation">Club/Organisation</option>
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                    <Button
                        className={classes.button}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateButton}
                        disabled={loading}
                    // className={classes.submit}
                    >{loading ? <CircularProgress color="primary" size={24} /> : "Update Profile"}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default UpdateInfoTabPanel;