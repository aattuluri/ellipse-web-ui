import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function SnackbarAlert(props) {
    const vertical = "top";
    const horizontal = "center";
    return(
    <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={props.open}
        autoHideDuration={6000}
        onClose={props.handleClose}
        key={vertical + horizontal}
    >
        <Alert onClose={props.handleClose} severity="success">{props.message}</Alert>
    </Snackbar>);
}
export default SnackbarAlert;