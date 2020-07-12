import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import EventCard from '../Components/EventCard';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router';
import List from '@material-ui/core/List';
import EventsDialog from '../Components/EventsDialog';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SortLeftPanel from '../Components/SortLeftPanel';
import MobileSortPanel from '../Components/MobileSortPanel';
import ImageDialog from '../Components/ImageDialog';
import EventsContext from '../EventsContext';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';


// function a11yProps(index) {
//     return {
//         id: `scrollable-auto-tab-${index}`,
//         'aria-controls': `scrollable-auto-tabpanel-${index}`,
//     };
// }


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

    },
    rpaper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.primary.light,
        margin: theme.spacing(1),
        position: 'sticky',
        top: theme.spacing(10),
        zIndex: 3,
        // borderRadius: theme.spacing(50)
    },
    postButton: {
        borderRadius: theme.spacing(50),
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    root: {
        background: theme.palette.primary.light,
        position: 'sticky',
        top: theme.spacing(10),
        marginLeft: theme.spacing(1),

        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        // bottom: 0,
        // zIndex: 3,
    },
    root2: {
        marginTop: theme.spacing(3),
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.secondary.main,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        minHeight: 300,
        borderRadius: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    filterTextField: {
        padding: theme.spacing(1),
        height: theme.spacing(5)
    },
    filterButton: {
        margin: theme.spacing(1),
        width: theme.spacing(10),
        borderRadius: theme.spacing(50)
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    mobileFilterButton: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    skeleton: {
        textDecorationColor: theme.palette.primary.dark,
    }

}));

function EventsTabPanel({ history }) {
    // const { children, value, url, index, ...other } = props;
    // const user = JSON.parse(localStorage.getItem('user'));
    // const url = user.imageUrl;
    // const token = localStorage.getItem('token');
    const user = React.useContext(AuthContext);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [imageDialogOpen, setImageDialogOpen] = React.useState(false);
    // const [allEvents, setAllEvents] = React.useState([]);
    const [selectedEvent, setSelectedEvent] = React.useState("");
    const [sortStartDate, setSortStartDate] = React.useState(null);
    const [sortEndDate, setSortEndDate] = React.useState(null);
    // const [sortType, setSortType] = React.useState(null);
    // const [sortEventMode, setSortEventMode] = React.useState(null);
    const [sortCollegeType, setSortCollegeType] = React.useState("");
    const [sortedEventsArray, setSortedEventsArray] = React.useState([]);
    const [isFiltered, setIsFiltered] = React.useState(false);
    const [feeSortChecked, setFeeSortChecked] = React.useState([0]);
    const [modeSortChecked, setModeSortChecked] = React.useState([0]);
    const [filterDialogOpen, setFilterDialogOpen] = React.useState(false);
    const allEvents = React.useContext(EventsContext);
    // setAllEvents(fEvents);
    const handleClose = () => {
        setOpen(false);
    };
    const handleClick = function (id) {
        console.log(id);
        setSelectedEvent(id);
        setOpen(true);
        // history.push('eventdetails')
    }
    const handlePostButtonClick = () => {
        history.push('/post')
    }
    useEffect(() => {
        // setAllEvents(fEvents);
        //     fetch('https://ellipseserver1.herokuapp.com/api/events', {
        //         headers: {
        //             'Authorization': `Bearer ${token}`,
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json'
        //         },
        //         method: 'GET'
        //     }).then(response => {
        //         response.json().then(value => {
        //             console.log(value);
        //             setAllEvents(value);
        //             setFinalEvents(value);
        //         })
        //     })
    }, [])

    // const [value, setValue] = React.useState(0);

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };
    const handleSortDateChange = (date) => {
        console.log(date);
        setSortStartDate(date);
    };
    const handleEndSortDateChange = (date) => {
        setSortEndDate(date);
    }

    // function handleSortEventModeChamge(event, value) {
    //     console.log(event);
    //     console.log(value);
    // }
    // console.log(allEvents);
    function handleSortCollegeChange(event, value) {
        console.log(value)
        setSortCollegeType(value);
    }
    async function handleSortApplyButton() {
        console.log(sortStartDate);
        console.log(modeSortChecked);
        console.log(sortCollegeType);
        if (sortStartDate != null && sortEndDate != null) {
            const dateRangeSortedEvents = sortByDateRange(sortStartDate, sortEndDate, allEvents);
            setSortedEventsArray(dateRangeSortedEvents);
            setIsFiltered(true);
            if (modeSortChecked.length > 1) {
                console.log(sortByMode(dateRangeSortedEvents));
                const typeSortedEvents = sortByMode(dateRangeSortedEvents);
                setSortedEventsArray(typeSortedEvents);
                setIsFiltered(true);
                if (feeSortChecked.length > 1) {
                    const feeSortedEvents = sortByCost(typeSortedEvents);
                    setSortedEventsArray(feeSortedEvents);
                    setIsFiltered(true);
                    if (sortCollegeType === user.collegeName) {
                        const collegeSortedEvents = sortByCollege(feeSortedEvents);
                        setSortedEventsArray(collegeSortedEvents);
                        setIsFiltered(true);
                    }
                }
            }
            else if (feeSortChecked.length > 1) {
                const feeSortedEvents = sortByCost(dateRangeSortedEvents);
                setSortedEventsArray(feeSortedEvents);
                setIsFiltered(true);
                if (sortCollegeType === user.collegeName) {
                    const collegeSortedEvents = sortByCollege(feeSortedEvents);
                    setSortedEventsArray(collegeSortedEvents);
                    setIsFiltered(true);
                }
            }
            else if (sortCollegeType === user.collegeName) {
                const collegeSortedEvents = sortByCollege(dateRangeSortedEvents);
                setSortedEventsArray(collegeSortedEvents);
                setIsFiltered(true);
            }
        }
        else if (sortStartDate != null) {
            const dateSortedEvents = await sortByDate(sortStartDate, allEvents)
            setSortedEventsArray(dateSortedEvents);
            setIsFiltered(true);
            if (modeSortChecked.length > 1) {
                console.log(sortByMode(dateSortedEvents));
                const typeSortedEvents = sortByMode(dateSortedEvents);
                setSortedEventsArray(typeSortedEvents);
                setIsFiltered(true);
                if (feeSortChecked.length > 1) {
                    const feeSortedEvents = sortByCost(dateSortedEvents);
                    setSortedEventsArray(feeSortedEvents);
                    setIsFiltered(true);
                    if (sortCollegeType === user.collegeName) {
                        const collegeSortedEvents = sortByCollege(feeSortedEvents);
                        setSortedEventsArray(collegeSortedEvents);
                        setIsFiltered(true);
                    }
                }
            }
            else if (feeSortChecked.length > 1) {
                const feeSortedEvents = sortByCost(dateSortedEvents);
                setSortedEventsArray(feeSortedEvents);
                setIsFiltered(true);
                if (sortCollegeType === user.collegeName) {
                    const collegeSortedEvents = sortByCollege(feeSortedEvents);
                    setSortedEventsArray(collegeSortedEvents);
                    setIsFiltered(true);
                }
            }
            else if (sortCollegeType === user.collegeName) {
                const collegeSortedEvents = sortByCollege(dateSortedEvents);
                setSortedEventsArray(collegeSortedEvents);
                setIsFiltered(true);
            }
        }
        else if (modeSortChecked.length > 1) {
            const typeSortedEvents = sortByMode(allEvents);
            console.log(sortByMode(allEvents));

            setSortedEventsArray(typeSortedEvents);
            setIsFiltered(true);
            if (feeSortChecked.length > 1) {
                const feeSortedEvents = sortByCost(typeSortedEvents);
                setSortedEventsArray(feeSortedEvents);
                setIsFiltered(true);
            }
        }
        else if (feeSortChecked.length > 1) {
            const feeSortedEvents = sortByCost(allEvents);
            setSortedEventsArray(feeSortedEvents);
            setIsFiltered(true);
        }
        else if (sortCollegeType === user.collegeName) {
            const collegeSortedEvents = sortByCollege(allEvents);
            setSortedEventsArray(collegeSortedEvents);
            setIsFiltered(true);
        }
    }

    function sortByDateRange(date1, date2, sEvents) {
        var sortedEvents = [];
        console.log(typeof (date1));
        console.log(typeof (date1));
        sEvents.forEach(sEvent => {
            const d = new Date(sEvent.start_time);
            if (date1.getTime() <= d.getTime() && d.getTime() <= date2.getTime()) {
                sortedEvents.push(sEvent);
            }
        })
        return sortedEvents;
    }

    function sortByDate(date, tEvents) {
        var sDEvents = [];
        tEvents.forEach(async sevent => {
            const x = `${date.getDate()}` + date.getMonth() + date.getFullYear();
            const d = new Date(sevent.start_time);
            const y = `${d.getDate()}` + d.getMonth() + d.getFullYear();
            console.log(y);
            if (x === y) {
                console.log(sevent);
                sDEvents.push(sevent);
            }
            console.log(sortedEventsArray);
        })
        console.log(sDEvents);
        return sDEvents;
    }
    function sortByMode(sEvents) {
        var sortedEvents = [];
        console.log(sEvents);
        console.log(modeSortChecked);
        sEvents.forEach(sevent => {
            // console.log(checked);
            console.log(sevent.eventMode);
            if (modeSortChecked.includes(sevent.eventMode)) {
                console.log("ddd");
                sortedEvents.push(sevent);
            }
        })
        console.log(sortedEvents);
        return sortedEvents;
    }

    function sortByCost(sEvents) {
        var sortedEvents = [];
        console.log(sEvents);
        sEvents.forEach(sevent => {
            // console.log(checked);
            console.log(sevent.eventMode);
            if (feeSortChecked.includes(sevent.feesType)) {
                console.log("ddd");
                sortedEvents.push(sevent);
            }
        })
        console.log(sortedEvents);
        return sortedEvents;
    }

    function sortByCollege(sEvents) {
        var sortedEvents = [];
        sEvents.forEach(sevent => {
            // console.log(checked);
            console.log(sevent.eventMode);
            if (user.collegeName === sevent.college) {
                console.log("ddd");
                sortedEvents.push(sevent);
            }
        })
        return sortedEvents;
    }

    function handlesortDiscardButton() {
        setSortedEventsArray([]);
        // setSortEventMode(null);
        setIsFiltered(false);
        // setChecked(null);
    }
    function handlefilterButtonClicked() {
        setFilterDialogOpen(true);
    }
    function handleFilterClose() {
        setFilterDialogOpen(false);
    }
    function handleImageDialogClose() {
        setImageDialogOpen(false);
    }
    function handleImageDialogOpen() {
        console.log("ndjc")
        setImageDialogOpen(true);
    }

    function handleRegistrationButton(event){
        setSelectedEvent(event);
        // history.push('/events')
        // return <Link to="/events"></Link>
    }

    return (
        <div>
            <Grid container component="main" >
                <Grid item xs={false} md={3} lg={2} style={{ padding: "10px" }} >
                    <Paper className={classes.root}>
                        <SortLeftPanel
                            handleSortDateChange={handleSortDateChange}
                            sortStartDate={sortStartDate}
                            handleEndSortDateChange={handleEndSortDateChange}
                            sortEndDate={sortEndDate}
                            handleSortCollegeChange={handleSortCollegeChange}
                            feeChecked={feeSortChecked}
                            modeChecked={modeSortChecked}
                            setFeeChecked={setFeeSortChecked}
                            setModeChecked={setModeSortChecked}
                            handleSortApplyButton={handleSortApplyButton}
                            handlesortDiscardButton={handlesortDiscardButton}>
                        </SortLeftPanel>
                    </Paper>
                    <Button className={classes.mobileFilterButton} variant="outlined" onClick={handlefilterButtonClicked} >Filters</Button>

                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={8}>
                    <Dialog
                        open={filterDialogOpen}
                        onClose={handleFilterClose}
                        fullWidth={true}
                        scroll="paper"
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                        maxWidth="sm" PaperProps={{
                            style: {
                                backgroundColor: "#1C1C1E",
                                boxShadow: 'none',
                            },
                        }}>
                        <DialogTitle>Filters</DialogTitle>
                        <DialogContent>
                            <MobileSortPanel
                                handleSortDateChange={handleSortDateChange}
                                sortStartDate={sortStartDate}
                                handleEndSortDateChange={handleEndSortDateChange}
                                sortEndDate={sortEndDate}
                                handleSortCollegeChange={handleSortCollegeChange}
                                feeChecked={feeSortChecked}
                                modeChecked={modeSortChecked}
                                setFeeChecked={setFeeSortChecked}
                                setModeChecked={setModeSortChecked}
                                handleSortApplyButton={handleSortApplyButton}
                                handlesortDiscardButton={handlesortDiscardButton}>
                            </MobileSortPanel>
                        </DialogContent>

                    </Dialog>
                    {allEvents.length === 0 && <div>
                        <Skeleton variant="rect" animation="wave" height={118} />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <br></br><br></br>
                        <Skeleton variant="rect" animation="wave" height={118} />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </div>}

                    {
                        isFiltered ? sortedEventsArray.map((event, index) => {
                            return (
                                <EventCard
                                    key={index}
                                    click={handleClick}
                                    url={user.imageUrl}
                                    name={event.name}
                                    startTime={event.start_time}
                                    endTime={event.finish_time}
                                    eventMode={event.eventMode}
                                    eventType={event.eventType}
                                    regEndTime={event.registrationEndTime}
                                    event={event}
                                    feeType={event.feesType}
                                    imageDialog={handleImageDialogOpen}
                                    handleReg={handleRegistrationButton}
                                    eventId={event}
                                >

                                </EventCard>)
                        }) : allEvents.map((event, index) => {
                            return (
                                <EventCard
                                    key={index}
                                    click={handleClick}
                                    url={user.imageUrl}
                                    name={event.name}
                                    startTime={event.start_time}
                                    endTime={event.finish_time}
                                    eventMode={event.eventMode}
                                    eventType={event.eventType}
                                    regEndTime={event.registrationEndTime}
                                    eventId={event}
                                    feeType={event.feesType}
                                    imageDialog={handleImageDialogOpen}
                                    handleReg={handleRegistrationButton}
                                    event={event}
                                >

                                </EventCard>)
                        })}
                    {/* <EventCard click={handleClick} url ={user.imageUrl}></EventCard>
                    <EventCard click={handleClick} url ={user.imageUrl}></EventCard>
                    <EventCard click={handleClick} url ={user.imageUrl}></EventCard>
                    <EventCard click={handleClick} url ={user.imageUrl}></EventCard>
                    <EventCard click={handleClick} url ={user.imageUrl}></EventCard>
                    <EventCard click={handleClick} url ={user.imageUrl}></EventCard> */}
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={2} >
                    <Fab color="primary" aria-label="add" className={classes.fab} onClick={handlePostButtonClick}>
                        <AddIcon />
                    </Fab>
                    <Paper className={classes.rpaper}>
                        <Button
                            onClick={handlePostButtonClick}
                            variant="contained"
                            fullWidth
                            size="large"
                            className={classes.postButton} >
                            Post Event
                        </Button>
                        <List className={classes.root2}>
                            {/* <Divider variant="inset" component="li" /> */}
                            <Typography>No Registered Events</Typography>



                        </List>

                    </Paper>


                </Grid>
            </Grid>
            <div>
                <EventsDialog
                    open={open}
                    event={selectedEvent}
                    handleClose={handleClose}
                >
                    imageDialog={handleImageDialogOpen}
                </EventsDialog>
                <ImageDialog
                    open={imageDialogOpen}
                    handleClose={handleImageDialogClose} url={user.imageUrl}>
                </ImageDialog>

            </div>
        </div>



    );
}

export default withRouter(EventsTabPanel);

 