import React from 'react';
import Button from '@material-ui/core/Button';
import EventCard from '../Components/EventCard';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import '../main.scss'

import moment from 'moment'

const localizer = momentLocalizer(moment)



function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    icons: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        // color: theme.palette.grey[500],

    }
}));

function CalenderPanel(props) {
    const { children, value, url, index, ...other } = props;
    const [expanded, setExpanded] = React.useState(false);

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleClick = function () {
        setOpen(true);
    }

    const events = [
        {
            id: 0,
            title: 'All Day Event very long title',
            allDay: true,
            start: new Date(2015, 3, 0),
            end: new Date(2015, 3, 1),
        },
        {
            id: 1,
            title: 'Long Event',
            start: new Date(2015, 3, 7),
            end: new Date(2015, 3, 10),
        },

        {
            id: 2,
            title: 'DTS STARTS',
            start: new Date(2016, 2, 13, 0, 0, 0),
            end: new Date(2016, 2, 20, 0, 0, 0),
        },
    ]

    return (
        <div
            role="tabpanel"
            // hidden={value !== index}
            {...other}>
            {value === index && (
                <div style={{backgroundColor:"#1C1C1E"}}>
                    <Typography>Calender View</Typography>
                    
                    <FullCalendar eventBackgroundColor="#e7305b" events={[
                        { title: 'Dev Hack', date: '2020-06-17' },
                        { title: 'event 2', date: '2020-06-18T16:00:00' }
                    ]} defaultView='timeGridWeek' plugins={[timeGridPlugin]}  backgroundColor="black" ></FullCalendar>

                </div>

            )}
        </div>
    );
}

export default CalenderPanel;