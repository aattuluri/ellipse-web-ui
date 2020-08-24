import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(5),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // backgroundColor: theme.palette.secondary.main,
      padding: theme.spacing(3),
      borderRadius: 30,
  
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(7),
      [theme.breakpoints.down('md')]: {
        top: theme.spacing(12),
      }
    }
  }));

  export default useStyles;