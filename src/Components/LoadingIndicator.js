import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    progress: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const LoadingIndicator = (props) => {
    const classes = useStyles();

    return <div className={classes.progress}>
        <Fade
            in={props.loading}
            unmountOnExit>
            <CircularProgress />
        </Fade>
    </div>
}

export default LoadingIndicator