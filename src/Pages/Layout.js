import React from 'react';
import NavigationBar from './NavigationBar';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    // backdrop: {
    //     // zIndex: theme.zIndex.drawer + 1,
    //     color: '#fff',
    // },
    root: {
        background: 'white',
        position: 'sticky',
        top: 0,
        bottom: 0, 
        zIndex: 5,
    },
}));

function Layout(props) {

    const classes = useStyles();


    return (
        <div>
        <Paper className={classes.root}>
        <NavigationBar></NavigationBar>
        </Paper>
            
            <div>
                {props.children}
            </div>
        </div>

    );
}
export default Layout;
