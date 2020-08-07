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
import { Grid, Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import AddAnnouncementForm from './AddAnnouncementForm';



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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const token = localStorage.getItem('token');
  // const [regData, setRegData] = React.useState([]);
  const [headers, setHeaders] = React.useState([]);
  const [rowValues, setRowValues] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [announcementDialog,setAnnouncementDialog] = React.useState(false);
  const event = props.event;


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rowValues.map((n) => n.name);
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
    fetch(`http://139.59.16.53:4000/api/event/registeredEvents?id=${event._id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'GET',
    }).then(response => {
      response.json().then(value => {
        // console.log(value);
        // setRegData(value.data);
        if(value.length > 0){
          const firstdata = value[0].data;
        const columnNames = Object.keys(firstdata);
        columnNames.forEach(item => {
          setHeaders((headers => [...headers, { id: item, label: item, minWidth: 170 }]))
        })
        value.forEach(d => {
          setRowValues(rowValues => [...rowValues, d.data])
        })
        }
        

      })
    })
  }, [token,event._id])
  const isSelected = (name) => selected.indexOf(name) !== -1;

  function handleAddAnnouncement(){
    setAnnouncementDialog(true);
  }

  function handleAnnoucementClose(){
    setAnnouncementDialog(false);
  }
  

  return (

    <Grid container spacing={3}>
    <AddAnnouncementForm open={announcementDialog} id={event._id} handleClose={handleAnnoucementClose}></AddAnnouncementForm>
      <Grid item xs={12} md={4} lg={9}>
        <Paper className={classes.buttonsPaper}>
          <Button variant="outlined" onClick={handleAddAnnouncement} className={classes.button}>Add Announcement</Button>
          <Button variant="contained" className={classes.button}>Send Emails to Selected</Button>
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
                  const isItemSelected = isSelected(row.name);
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.name}
                      onClick={(event) => handleClick(event, row.name)}
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