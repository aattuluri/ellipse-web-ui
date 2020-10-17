import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import CertificateCard from './CertificateCard';
// const useStyles = makeStyles((theme) => ({
//     // backdrop: {
//     //     // zIndex: theme.zIndex.drawer + 1,
//     //     color: '#fff',
//     // },
//     icons: {
//         position: 'absolute',
//         right: theme.spacing(1),
//         top: theme.spacing(1),
//     }
// }));

function ProfilePostsTabPanel(props) {
    const { children, value, url, index, ...other } = props;
    const token = localStorage.getItem('token');
    
    const [registerdEvents,setRegisteredEvents] = React.useState([]);


    React.useEffect(()=>{
        fetch(process.env.REACT_APP_API_URL+`/api/user/get_certificates`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            method: 'GET',
          }).then(response => {
            response.json().then(value => {
            //   console.log(value);
              setRegisteredEvents(value);
            })
          })
    },[token])

    

    return (
        <div
            role="tabpanel"
            // hidden={value !== index}
            {...other}>
            {value === index && (
                <div >
                <Grid container component="main" alignItems="center" spacing={1}>
                {
                    registerdEvents.length === 0 && <Typography>No Posted Events</Typography>
                }
                {registerdEvents.map((event,index) => {
                    return(<Grid item xs={12} sm={12} md={6} key={index}>
                    <CertificateCard event={event}></CertificateCard>
                    </Grid>) 
                })}
                    
                </Grid>
                </div>
            )}
        </div>
    );
}

export default ProfilePostsTabPanel;
