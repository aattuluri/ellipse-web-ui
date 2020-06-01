import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    paperRight: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main,
        padding: theme.spacing(5),
        borderRadius: 30,
    },
    paperLeft: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paperimage: {
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(),
        marginTop: theme.spacing(10),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '80%', // Fix IE 11 issue.
        marginTop: theme.spacing(10),
        // backgroundColor: theme.palette.secondary,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default useStyles;