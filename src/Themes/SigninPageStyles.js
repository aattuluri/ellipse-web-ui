import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100vh',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
      },
    paperRight: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main,
        padding: theme.spacing(0),
        paddingBottom: theme.spacing(4),
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
        width: '90%', 
        margin: theme.spacing(5),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default useStyles;