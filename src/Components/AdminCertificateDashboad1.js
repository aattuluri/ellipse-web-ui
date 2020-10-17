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
import { Grid, Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';


//function for alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  paper: {
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
  }
}));

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: 'success',
    type: 'error',
    autoHide: 300
  });
  const [loading, setLoading] = React.useState(false);
  const { vertical, horizontal, open, message, type, autoHide } = state;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const token = localStorage.getItem('token');
  // const [regData, setRegData] = React.useState([]);
  const [headers, setHeaders] = React.useState([]);
  const [rowValues, setRowValues] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const event = props.event;


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rowValues.map((n) => n.Email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClose = async (event, reason) => {
    getParticipantsList()
    setState({ ...state, open: false });
  }


  const handleClick = (event, name) => {
    console.log(name);
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
            setHeaders((headers => [...headers, { id: item, label: item, minWidth: 170 }]))
          })
          value.forEach(d => {
            if (d.certificate_status === "not_generated") {
              setRowValues(rowValues => [...rowValues, d.data])
            }

          })
        }


      })
    })
  }, [token, event._id])
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const getParticipantsList = () =>{
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
          // const firstdata = value[0].data;
          // const columnNames = Object.keys(firstdata);
          value.forEach(d => {
            if (d.certificate_status === "not_generated") {
              setRowValues(rowValues => [...rowValues, d.data])
            }

          })
        }
      })
    })
  }



  function handleGenerateCertificateButton() {
    setLoading(true);
    console.log(selected)
    try {
      var data = new FormData();
      const d = { eventId: event._id, participants: selected }
      data = JSON.stringify(d);
      // console.log(data);
      fetch(process.env.REACT_APP_API_URL + `/api/event/generate_certificates`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'POST',
        body: data
      }).then(response => {
        // console.log(response);
        response.json().then(value => {
          // console.log(value);
          
          setLoading(false);
          setState({
            open: true,
            vertical: 'top',
            horizontal: 'center',
            message: 'Generated successfully',
            type: "success",
            autoHide: 4000
          });
        })
      })
    }
    catch (error) {
      setLoading(false);
      setState({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: error.message,
        type: "error",
        autoHide: 6000
      })

    }
  }


  return (

    <Grid container spacing={3}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={autoHide}
        onClose={handleClose}
        key={vertical + horizontal}>
        <Alert onClose={handleClose} severity={type}>{message}</Alert>
      </Snackbar>
      <Grid item xs={12} md={4} lg={9}>
        <Paper className={classes.buttonsPaper}>
          <Button
            variant="contained"
            onClick={handleGenerateCertificateButton}
            className={classes.button}>{loading ? <CircularProgress color="primary" size={24} /> : "Generate Certificates"}</Button>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
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
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
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
  );
}