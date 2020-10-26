import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
    }
}));

export default function ImgMediaCard(props) {
    const classes = useStyles();
    const event = props.event;
    const token = localStorage.getItem('token');
    const [eventName,setEventName] = React.useState("");

    React.useEffect(()=>{
        fetch(process.env.REACT_APP_API_URL+`/api/event/get_event_name?eventId=${event.event_id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            method: 'GET',
          }).then(response => {
            response.json().then(value => {
              setEventName(value)
            })
          })
    },[event,token])

    
    function handleShareClick() {
        
    }

    return (
        <Card className={classes.root}>
            {/* <CardActionArea> */}
            {/* <CardMedia
                component="img"
                height="180"
                image={process.env.REACT_APP_API_URL + `/api/image?id=${event.poster_url}`}
            /> */}
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {eventName}
                </Typography>
            </CardContent>

            <CardActions>
                <Button disabled={event.certificate_status.toUpperCase() === "GENERATED"? false : true} download target="_blank" href={process.env.REACT_APP_API_URL + `/api/user/certificate?id=${event.certificate_url}`} size="small" color="primary" onClick={handleShareClick}>
                    Download
                </Button>
                <Typography align="right" variant="body2" color="textSecondary" component="p">
                    {event.certificate_status.toUpperCase()}
                </Typography>
            </CardActions>
        </Card>
    );
}