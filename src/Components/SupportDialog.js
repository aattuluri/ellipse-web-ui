import React from 'react';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';



export default function EventReportDialog(props) {
    // const classes = useStyles();
    const theme = useTheme();


    const [title, setTitle] = React.useState(null);
    const [desc, setDesc] = React.useState(null);


    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleDescChange(event) {
        setDesc(event.target.value);
    }
    // console.log(title);
    // console.log(desc);

    return (
        <div>
            <Dialog open={props.open} fullWidth={true} PaperProps={{
                style: {
                    backgroundColor: theme.palette.secondary.main,
                    boxShadow: 'none',
                },
            }} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Support</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                id="name"
                                label="Full Name"
                                name="name"
                                fullWidth
                                value={title || ""}
                                // required
                                onChange={handleTitleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                id="desc"
                                label="Issue Description"
                                name="desc"
                                fullWidth
                                value={desc || ""}
                                // required
                                onChange={handleDescChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Link href={`mailto:support@ellipseapp.com?subject=${title}&body=${desc}`} target="_blank" rel="noopener noreferrer" variant="body2">
                        SEND
                    </Link>
                    
                </DialogActions>
            </Dialog>
        </div>
    );
}
