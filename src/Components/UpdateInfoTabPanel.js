import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import AuthContext from '../AuthContext';
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
    button: {
        margin: theme.spacing(0.5),
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
    }
}));

function UpdateInfoTabPanel(props) {
    const classes = useStyles();
    const { children, value, url, index, ...other } = props;
    // const [open, setOpen] = React.useState(false);
    const user = React.useContext(AuthContext);
    // const url = user.imageUrl;
    // const token = localStorage.getItem('token');
    // function handleEditButton() {
    //     setOpen(true);
    // }
    // function handleClose() {
    //     setOpen(false);
    // }

    function handleChange(event) {
        // if (event.target.files[0]) {
        //   setImage(event.target.files[0]);
        //   setImageAsFile(imageFile => (image))
        //   const url = URL.createObjectURL(event.target.files[0]);
        //   const fileType = event.target.files[0].type;
        //   setImageurl(url)
        //   setImageType(fileType.substr(fileType.indexOf('/') + 1));
        // }

    }
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <div className={classes.root}>
                    <Grid container component="main" direction="column"
                        alignItems="center"
                        justify="center" spacing={2}>
                        <Grid item xs={12} md={12} alignContent="center" alignItems="center">
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
                                <Avatar className={classes.large} sizes="100" alt="" src={user.imageUrl}></Avatar>
                            </Badge>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                autoComplete="fullName"
                                name="fullName"
                                value={user.name}
                                style={{ minWidth: "300px", marginBottom: "10px" }}
                                id="fullName"
                                label="Full Name"
                                autoFocus
                            />
                            
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <TextField
                                id="email"
                                value={user.email}
                                style={{ minWidth: "300px", marginBottom: "10px" }}
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <TextField
                                id="email"
                                value={user.email}
                                style={{ minWidth: "300px", marginBottom: "10px" }}
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
}

export default UpdateInfoTabPanel;