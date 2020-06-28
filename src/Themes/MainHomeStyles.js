import { fade, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    borderRadius: 30,
    marginBottom: theme.spacing(5)

  },
  root: {
    display: 'flex',
    flexGrow: 1,
    maxWidth: 800,
    background: theme.palette.secondary.main,
    alignItems: 'center',
  },
  grow: {
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    borderBottom: 'none',
    padding: theme.spacing(0.5, 0.5, 0.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
  sectionDesktop: {
    
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  tabs: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      flexDirection: 'row',
    },
  },
  mobiletab: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  tabPanel: {
    marginBottom: theme.spacing(3),
  },
  flex_section: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    // minHeight: 0
  },
  
  flex_col_scroll: {
    flexGrow: 1,
    overflow: 'auto',
    // minHeight: '100vh'
  },
  rpaper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.primary.light,
    margin: theme.spacing(2),
    // borderRadius: theme.spacing(50)
  },
  postButton: {
    borderRadius: theme.spacing(50)
  }
}));

export default useStyles;