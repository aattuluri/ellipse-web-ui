import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
// import { Calendar, momentLocalizer } from 'react-big-calendar'
import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid'
import '../main.scss'
import EventsDialog from '../Components/EventsDialog'
// import moment from 'moment'

// const localizer = momentLocalizer(moment)



// function a11yProps(index) {
//     return {
//         id: `vertical-tab-${index}`,
//         'aria-controls': `vertical-tabpanel-${index}`,
//     };
// }

const useStyles = makeStyles((theme) => ({
    // backdrop: {
    //     // zIndex: theme.zIndex.drawer + 1,
    //     color: '#fff',
    // },
    icons: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        // color: theme.palette.grey[500],

    }
}));

function CalenderPanel(props) {
    const { children, value, url, index, ...other } = props;
    const user = JSON.parse(localStorage.getItem('user'));
    // const url = user.imageUrl;
    const token = localStorage.getItem('token');
    const classes = useStyles();
    const [allEvents, setAllEvents] = React.useState([]);
    const [events,setEvents] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedEvent,setSelectedEvent]= React.useState([]);
    // var events
    useEffect(() => {
        fetch(' https://ellipseserver1.herokuapp.com/api/events', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            response.json().then(value => {
                value.forEach(y =>{
                    console.log(y.start_time);
                    setEvents(events =>
                        [...events,{id:JSON.stringify(y), title: y.name, start: y.start_time,end: y.finish_time }]
                    )
                })
                setAllEvents(value);
            })
        })
        
    }, [])

    const handleClose = () => {
        setOpen(false);
    };
   

    function handleEventClick(info){
        console.log(JSON.parse(info.event.id).name);
        setSelectedEvent(JSON.parse(info.event.id))
        setOpen(true);
    }
    return (
        <div
            role="tabpanel"
            // hidden={value !== index}
            {...other}>
            {value === index && (
                <div>
                <Grid container component="main">

                    <Grid item xs={12} sm={12} md={4} lg={2} spacing={2}>
                        <Typography index={0}>Filters</Typography>
                        {/* <Calendar onChange={setCalenderValue} value={calenderValue} ></Calendar> */}

                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8} spacing={2} className={classes.flex_col_scroll}>
                        <FullCalendar 
                        eventBackgroundColor="#e7305b" 
                        events={events} 
                        eventClick={handleEventClick}
                        defaultView='dayGridMonth' plugins={[dayGridPlugin]} backgroundColor="black" ></FullCalendar>

                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={2} spacing={5}>
                        {/* <Paper className={classes.rpaper}>
                                <Button onClick={handlePostButtonClick} variant="contained" size="large" className={classes.postButton} >Post Event</Button>
                            </Paper> */}

                    </Grid>
                </Grid>
                <div>
                <EventsDialog 
                open={open} 
                event={selectedEvent} 
                handleClose={handleClose}
                name={selectedEvent.name}></EventsDialog>
                </div>
                </div>
                
                


            )}
        </div>
    );
}

export default CalenderPanel;


{/* <div style={{backgroundColor:"#1C1C1E"}}> 
            
            <Typography>Calender View</Typography>
           
           <FullCalendar eventBackgroundColor="#e7305b" events={[
               { title: 'Dev Hack', date: '2020-06-17' },
               { title: 'event 2', date: '2020-06-18T16:00:00' }
           ]} defaultView='timeGridWeek' plugins={[timeGridPlugin]}  backgroundColor="black" ></FullCalendar>

       </div> */}