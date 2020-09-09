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
        height: '80vh',
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(0, 1),
            paddingBottom: theme.spacing(2),
          },
    },
    paperLeft: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(3, 1),
          },
          [theme.breakpoints.up('md')]: {
            height: '80vh',
          },
          
    },
    paperimage: {
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(),
        marginTop: theme.spacing(8),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '90%', 
        margin: theme.spacing(5),
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(2),
          },
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    iPhoneImage: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
          },
    },
    title: {
        
        fontFamily: 'Gugi',
        // marginLeft: theme.spacing(1),
        color: theme.palette.primary.dark,
        fontWeight: 'bold'
      },
      hidden:{
        [theme.breakpoints.down('sm')]: {
            display: 'none'
          },
      }
}));

export default useStyles;