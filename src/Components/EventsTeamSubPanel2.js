import React from 'react';
import { Box, Button, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center",
        // backgroundColor: theme.palette.primary.light,
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        alignContent: "center",
    },
    button: {
        margin: theme.spacing(1),
        borderRadius: theme.spacing(2),
        maxWidth: "260px"
    },

}));

function AboutEventPanel(props) {
    const classes = useStyles();
    const { children, value, url, index, ...other } = props;
    // const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const event = props.event;

    const handleCreateButton = (e) =>{
        e.preventDefault();
        const { name, desc } = e.target.elements;
        var data = new FormData();
        data = JSON.stringify({
            'team_name': name.value,
            'desc': desc.value,
            'event_id': event._id,
        });
        // console.log(data);
        fetch(process.env.REACT_APP_API_URL + `/api/event/create_team`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method: 'POST',
          body: data
        }).then((response)=>{
            response.json().then(value=>{
                // console.log(value);
                props.getData();
            })
        })
    }


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <div className={classes.root}>
                    <form onSubmit={handleCreateButton}>
                    <TextField variant="outlined" label="Team Name" required name="name" fullWidth margin="dense"></TextField>
                    <TextField variant="outlined" label="Description" required name="desc" fullWidth margin="dense"></TextField>
                    <Box display="flex" justifyContent="center">
                        <Button type="submit" fullWidth color="primary" className={classes.button} variant="contained">Create</Button>
                    </Box>
                    </form>
                    
                </div>
            )}
        </div>
    );
}

export default AboutEventPanel;
