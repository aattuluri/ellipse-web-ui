import { fade, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.5em',
      height: '0.5em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 1px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#ad9d9d',
      outline: '1px solid slategrey'
    }
  },
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
    elevation: "0"
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
    fontFamily: 'Gugi',
    // marginLeft: theme.spacing(1),
    color: theme.palette.primary.dark,
    fontWeight: 'bold'
  },
  mobileTitle:{
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    
  },
  titleButton: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-block',
    },
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    textTransform: 'none'
  },
  mobileTitleButton: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'inline-block',
      width: 'fit-content'
    },
    margin: theme.spacing(0),
    padding: theme.spacing(0)
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    width: '230px',
    [theme.breakpoints.up('md')]: {
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
      marginLeft: theme.spacing(15),
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