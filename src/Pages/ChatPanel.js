import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) => ({
    root: {
        // height: '300px'
        
    },
    root2: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.secondary.main
    },
    icons: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        // color: theme.palette.grey[500],

    }
}));

function ChatPanel(props) {
    // const { children, value, url, index, ...other } = props;
    // const user = JSON.parse(localStorage.getItem('user'));
    // const token = localStorage.getItem('token');
    const classes = useStyles();



    return (
        <div
            // role="tabpanel"
            // hidden={value !== index}
            // {...other}
            >
            {/* {value === index && ( */}
                <div className={classes.root}>
                    <Grid container component="main" spacing={2}>
                        <Grid item xs={12} sm={12} md={4} lg={1}></Grid>
                        <Grid item xs={12} sm={12} md={4} lg={2}>
                            <List dense className={classes.root2}>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15,16].map((value) => {
                                    const labelId = `checkbox-list-secondary-label-${value}`;
                                    return (
                                        <ListItem key={value} button>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={`Avatar n°${value + 1}`}
                                                    src={`/static/images/avatar/${value + 1}.jpg`}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                                            <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
                                            {/* <ListItemSecondaryAction>
                                            <KeyboardArrowRightIcon></KeyboardArrowRightIcon> */}
                                                {/* <Checkbox
                                                    edge="end"
                                                    onChange={handleToggle(value)}
                                                    checked={checked.indexOf(value) !== -1}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                /> */}
                                            {/* </ListItemSecondaryAction> */}
                                        </ListItem>
                                    );
                                })}
                            </List>

                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                        </Grid>
                    </Grid>
                </div>
            {/* )} */}
        </div>
    );
}

export default ChatPanel;
