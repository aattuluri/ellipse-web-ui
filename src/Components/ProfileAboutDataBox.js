import React from 'react';

//Materail imports
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import EmailIcon from '@material-ui/icons/Email';
import WcIcon from '@material-ui/icons/Wc';
import SchoolIcon from '@material-ui/icons/School';
import InfoIcon from '@material-ui/icons/Info';
import WorkIcon from '@material-ui/icons/Work';
import PersonIcon from '@material-ui/icons/Person';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';


const useStyles = makeStyles((theme) => ({
    root3: {
        display: "flex",
        justifyContent: "flex-start",
        paddingLeft: theme.spacing(4),
    },
    content: {
        marginTop: theme.spacing(1),
        paddingTop: theme.spacing(1)
    },
    avatar: {
        margin: theme.spacing(1.5),
        padding: theme.spacing(1)
    }

}));

function ProfileDataBox(props) {
    const classes = useStyles();
    const [icon,setIcon] = React.useState(<EmailIcon></EmailIcon>)
    React.useEffect(()=>{
        switch(props.name){
            case 'Username':
                setIcon(<PersonPinCircleIcon></PersonPinCircleIcon>)
                break;
            case 'Name':
                setIcon(<PersonIcon></PersonIcon>)
                break;
            case 'College':
                setIcon(<SchoolIcon></SchoolIcon>)
                break;
            case 'Gender':
                setIcon(<WcIcon></WcIcon>)
                break;
            case 'Bio':
                setIcon(<InfoIcon></InfoIcon>)
                break;
            case 'Designation':
                setIcon(<WorkIcon></WorkIcon>)
                break;
            case 'Email':
                setIcon(<EmailIcon></EmailIcon>)
                break;
            default:
                setIcon(<InfoIcon></InfoIcon>)
        }
    },[props.name])

    return (
        <Box className={classes.root3}>
            <Box className={classes.avatar}>
                <Avatar>
                    {icon}
                </Avatar>
            </Box>
            <Box className={classes.content}>
                <Box><Typography>{props.name}</Typography></Box>
                <Box><Typography variant="body2" color="textSecondary">{props.value}</Typography></Box>
            </Box>
        </Box>
    );
}

export default ProfileDataBox;

