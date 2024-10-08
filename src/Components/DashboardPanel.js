import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
// import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, IconButton } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import Checkbox from '@material-ui/core/Checkbox';
import AddAnnouncementForm from './AddAnnouncementForm';
import SendEmailForm from './SendEmailForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

import { CSVLink } from "react-csv";




const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
    // maxWidth: 880
    // width: '100%',
  },
  table: {
    width: '100%',
  },
  paper: {
    width: '100%',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    backgroundColor: theme.palette.secondary.main,
  },
  buttonsPaper: {
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(3),
    height: 140,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  fixedHeightPaper: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(3),
    height: 140,
  },
  button: {
    margin: theme.spacing(1),
    borderRadius: theme.spacing(5)
  },
  progress: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const token = localStorage.getItem('token');
  // const [regData, setRegData] = React.useState([]);
  const [headers, setHeaders] = React.useState([]);
  const [rowValues, setRowValues] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [announcementDialog, setAnnouncementDialog] = React.useState(false);
  const [sendEmailDialog, setSendEmailDialog] = React.useState(false);
  const [fileColumns, setFileColumns] = React.useState([]);
  const event = props.event;

  React.useEffect(() => {
    if(event.reg_mode === "form"){
      event.reg_fields.forEach(v => {
        if (v.field === "file") {
          setFileColumns([...fileColumns, v.title]);
        }
      })
    }
    
    // eslint-disable-next-line
  }, [event])

  // console.log(fileColumns);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rowValues.map((n) => n.Email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    setLoading(true);
    setHeaders([]);
    setRowValues([]);
    fetch(process.env.REACT_APP_API_URL + `/api/event/registeredEvents?id=${event._id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'GET',
    }).then(response => {
      response.json().then(value => {
        if (value.length > 0) {
          const firstdata = value[0].data;
          const columnNames = Object.keys(firstdata);
          columnNames.forEach(item => {
            setHeaders((headers => [...headers, { id: item, key: item, label: item, minWidth: 170 }]));
          })
          value.forEach(d => {
            setRowValues(rowValues => [...rowValues, d.data]);
          })
          setLoading(false);
        }
        else{
          setLoading(false);
        }
      })
    })
  }, [token, event])
  const isSelected = (name) => selected.indexOf(name) !== -1;

  function handleAddAnnouncement() {
    setAnnouncementDialog(true);
  }

  function handleAnnoucementClose() {
    setAnnouncementDialog(false);
  }

  // function handleSendEmail() {
  //   console.log(selected);
  //   setSendEmailDialog(true);
  // }
  function handleSendEmailClose() {
    setSendEmailDialog(false);
  }

 


  return (
    <React.Fragment>
      <div className={classes.progress}>
        <Fade
          in={loading}
          unmountOnExit>
          <CircularProgress />
        </Fade>
      </div>
      <Grid container spacing={3}>
        <SendEmailForm open={sendEmailDialog} emails={selected} handleClose={handleSendEmailClose}></SendEmailForm>
        <AddAnnouncementForm open={announcementDialog} id={event._id} handleClose={handleAnnoucementClose}></AddAnnouncementForm>
        <Grid item xs={12} md={4} lg={9}>
          <Paper className={classes.buttonsPaper}>
            <Button variant="contained" onClick={handleAddAnnouncement} className={classes.button}>Add Announcement</Button>
            {/* <Button variant="contained" onClick={()=>saveAsCsv({ fields, data, filename })} className={classes.button}>Add Announcement</Button> */}
            {/* <Button variant="contained" onClick={handleSendEmail} className={classes.button}>Send Emails to Selected</Button> */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3} >
          <Paper className={classes.fixedHeightPaper}>
            <Typography>Total Registrations</Typography>
            <Typography component="p" variant="h4">
              {rowValues.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TableContainer className={classes.container}>
              <Button variant="contained" className={classes.button}><CSVLink filename={event.name + '.csv'} headers={headers} data={rowValues} style={{ color: '#000000' }}>Download as csv</CSVLink></Button>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                  </TableRow>
                  <TableRow >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="default"
                        checked={rowValues.length > 0 && selected.length === rowValues.length}
                        onChange={handleSelectAllClick}
                        indeterminate={selected.length > 0 && selected.length < rowValues.length}
                        inputProps={{ 'aria-label': 'select all fields' }}
                      />
                    </TableCell>
                    {headers.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowValues.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const isItemSelected = isSelected(row.Email);
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.Email}
                        onClick={(event) => handleClick(event, row.Email)}
                        selected={isItemSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            color="default"
                            inputProps={{ 'aria-label': 'select all fields' }}
                          /></TableCell>
                        {headers.map((column) => {
                          if (fileColumns.includes(column.id)) {
                            return <TableCell key={column.id} align={column.align}>
                              <IconButton download target="_blank" href={process.env.REACT_APP_API_URL + `/api/event/registration/get_file?id=${row[column.id]}`} size="small" color="primary"><GetAppIcon></GetAppIcon></IconButton>
                            </TableCell>
                          } else {
                            const value = column.id === "Email" ? row[column.id].substr(0, 3) + '*****@' + row[column.id].split('@')[1] : row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rowValues.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}