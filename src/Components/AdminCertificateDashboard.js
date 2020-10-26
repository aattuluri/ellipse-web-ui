import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AdminCertificateDashboard1 from './AdminCertificateDashboad1';
import AdminCertificateDashboard2 from './AdminCertificateDashboard2';
import AdminCertificateDashboard3 from './AdminCertificateDashboard3';

const useStyles = makeStyles((theme) => ({
    root: {
        // height: '300px'
    },
    icons: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        // color: theme.palette.grey[500],
    },
    root2: {
        marginTop: theme.spacing(3),
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.light,
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1)
    },
}));

function ExplorePanel(props) {
    const classes = useStyles();
    const event = props.event;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <div className={classes.root}>

                <Paper className={classes.root2}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="on">
                        <Tab label="Dashboard"></Tab>
                        <Tab label="Pending" />
                        <Tab label="Generated" />
                    </Tabs>
                </Paper>
                {
                    value === 0 && <AdminCertificateDashboard3 event={event}></AdminCertificateDashboard3>
                }
                {
                    value === 1 && <AdminCertificateDashboard1 event={event}></AdminCertificateDashboard1>
                }
                {
                    value === 2 && <AdminCertificateDashboard2 event={event}></AdminCertificateDashboard2>
                }

            </div>
        </div>
    );
}

export default ExplorePanel;
