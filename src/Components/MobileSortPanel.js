import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Typography} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AuthContext from '../AuthContext';




const useStyles = makeStyles((theme) => ({
    

    root: {
        background: theme.palette.secondary.main,
        position: 'sticky',
        top: theme.spacing(10),
        marginLeft: theme.spacing(1),

        // [theme.breakpoints.down('sm')]: {
        //     display: 'none',
        // },
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

}));

function MobileSortPanel(props) {
    const classes = useStyles();
    const {currentUser} = React.useContext(AuthContext);
    // const token = localStorage.getItem('token');
    // const [feeChecked, setFeeChecked] = React.useState([0]);
    // const [modeChecked, setFeeChecked] = React.useState([0]);
    const handleModeToggle = (value) => () => {
        const currentIndex = props.modeChecked.indexOf(value);
        const newChecked = [...props.modeChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        // console.log(checked);
        props.setModeChecked(newChecked);
    };
    const handleFeeToggle = (value) => () => {
        const currentIndex = props.feeChecked.indexOf(value);
        const newChecked = [...props.feeChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        // console.log(checked);
        props.setFeeChecked(newChecked);
    };

    return (
        <div>
            <Paper className={classes.root}>
                <Typography index={0}>Filters</Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        //   minDate={Date.now()}
                        fullWidth
                        required
                        variant="inline"
                        format="dd MMM yyyy"
                        margin="normal"
                        id="startDate"
                        label="From"
                        name="startDate"
                        defaultValue=''
                        value={props.sortStartDate}
                        onChange={props.handleSortDateChange}
                    />
                    <DatePicker
                        //   minDate={Date.now()}
                        fullWidth
                        required
                        variant="inline"
                        format="dd MMM yyyy"
                        margin="normal"
                        id="endDate"
                        label="To"
                        name="endDate"
                        defaultValue=''
                        value={props.sortEndDate}
                        onChange={props.handleEndSortDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                {/* <FormControl fullWidth >
                            <InputLabel htmlFor="outlined-age-native-simple">Sort By</InputLabel>
                            <Select
                                fullWidth
                                native
                                label="Event Mode"
                                onChange={handleSortEventModeChamge}
                                inputProps={{
                                    name: 'sortBy',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value="eventSortDate">Event Start Date</option>
                                <option value="recentlyAdded">Recently added</option>
                            </Select>
                        </FormControl> */}
                <Typography style={{ paddingTop: "10px" }}>Event Mode</Typography>
                <List >
                    {["online", "offline"].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;
                        return (
                            <ListItem key={value} role={undefined} dense button onClick={handleModeToggle(value)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        color="default"
                                        checked={props.modeChecked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={value} />
                            </ListItem>
                        );
                    })}
                </List>
                <Typography style={{ paddingTop: "10px" }}>Event Cost</Typography>
                <List className={classes.root}>
                    {["Free", "Paid"].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;
                        return (
                            <ListItem key={value} role={undefined} dense button onClick={handleFeeToggle(value)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        color="default"
                                        checked={props.feeChecked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={value} />

                            </ListItem>
                        );
                    })}
                </List>
                <Typography>College</Typography>
                <RadioGroup aria-label="address" name="address" defaultValue="All" onChange={props.handleSortCollegeChange} style={{ display: "inline" }}>
                    <List className={classes.root}>
                        {["All", `${currentUser.collegeName}`].map((value) => {
                           

                            return (
                                <ListItem key={value} role={undefined} dense button >
                                    <ListItemIcon>
                                        <FormControlLabel value={value} control={<Radio color="default" />} label={value} />
                                    </ListItemIcon>
                                    {/* <ListItemText id={labelId} primary={value} /> */}

                                </ListItem>
                            );
                        })}
                    </List>
                </RadioGroup>
                <Button className={classes.filterButton} onClick={props.handleSortApplyButton} variant="contained" > Apply </Button>
                <Button className={classes.filterButton} onClick={props.handlesortDiscardButton} variant="contained">Discard</Button>
            </Paper>


            <div>
            </div>
        </div>



    );
}

export default MobileSortPanel;

 