import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../AuthContext';
import Box from '@material-ui/core/Box';
import ProfileAboutDataBox from './ProfileAboutDataBox';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.main
    },
    editIcon: {
        display: "flex",
        justifyContent: "flex-end",
    }
}));

function ProfilePostsTabPanel(props) {
    const classes = useStyles()
    const { children, value, url, index, ...other } = props;
    const {currentUser} = React.useContext(AuthContext);

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <div className={classes.root}>
                    <Box>
                        <Box className={classes.editIcon}>
                            <IconButton onClick={props.handleEditButton}><EditIcon></EditIcon></IconButton>
                        </Box>
                        <ProfileAboutDataBox name="Name" value={currentUser.name}></ProfileAboutDataBox>
                        <ProfileAboutDataBox name="Email" value={currentUser.email}></ProfileAboutDataBox>
                        <ProfileAboutDataBox name="Username" value={currentUser.username}></ProfileAboutDataBox>
                        <ProfileAboutDataBox name="College" value={currentUser.college_name}></ProfileAboutDataBox>
                        <ProfileAboutDataBox name="Designation" value={currentUser.designation}></ProfileAboutDataBox>
                        <ProfileAboutDataBox name="Gender" value={currentUser.gender}></ProfileAboutDataBox>
                        <ProfileAboutDataBox name="Bio" value={currentUser.bio}></ProfileAboutDataBox>
                    </Box>
                </div>
            )}
        </div>
    );
}

export default ProfilePostsTabPanel;
