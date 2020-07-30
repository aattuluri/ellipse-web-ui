import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { makeStyles } from '@material-ui/core/styles';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import { Grid } from '@material-ui/core';



// const useStyles = makeStyles((theme) => ({
//     dialog:{
//         backgroundColor: theme.palette.secondary.main
//     }
// }));


export default function FormDialog(props) {
    // const classes = useStyles();
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
const [name,setName] = React.useState(null);
const [type,setType] = React.useState(null);
const fieldOptions = [];
const [selectedOptions,setSelectedOptions] = React.useState(['option1','option2']);
function handleNameChange(event){
    setName(event.target.value);
}
function handleTypeChange(event){
    setType(event.target.value);
    // if(event.target.value == "radio")
}
function handleOptionsChange(event,values){
    console.log(values);
    setSelectedOptions(values);
}
function handleAddButton(){
    if(type !== "radiobutton" && type !== "checkbox"){
        props.handleAdd({[name]:{'name':name,'type':type}},name);
    }
    else{
        props.handleAdd({[name]:{'name':name,'type':type,'options':selectedOptions}},name);
    }
    props.handleClose()
    
}


  return (
    <div>
      <Dialog open={props.open} fullWidth={true} PaperProps={{
                style: {
                    backgroundColor: "#1C1C1E",
                    boxShadow: 'none',
                },
            }} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Field</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} >
          <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Field Name"
            name="name"
            fullWidth
            value={name}
            required
            onChange={handleNameChange}
          />
          </Grid>
          <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel htmlFor="outlined-age-native-simple">Type</InputLabel>
            <Select
              fullWidth
              native
              label="Type"
              inputProps={{
                name: 'type',
                id: 'outlined-age-native-simple',
              }}
              value={props.eventMode}
              onChange={handleTypeChange}
            >
              <option aria-label="None" value="" />
              <option value="String">String</option>
              {/* <option value="Number">Number</option> */}
              {/* <option value="Bool">Bool</option> */}
              <option value="radiobutton">Radio Button</option>
              <option value="checkbox">Check Box</option>
            </Select>
          </FormControl>
          </Grid>
          { (type === "radiobutton" || type === "checkbox") &&
            <Grid item xs={12}>
          <Autocomplete
              multiple
              id="tags-filled"
              options={fieldOptions.map((option) => option)}
              freeSolo
              value={selectedOptions || []}
              onChange={handleOptionsChange}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} label="Options" placeholder="Options" helperText="you can choose multiple options for your checkboxes or radio buttons enter one option and press enter" />
              )}
            />
          </Grid>
          }
          
          <Grid item xs={12}>

          </Grid>
          </Grid>
          
          {/* <Grid item xs={12} sm={6}> */}
          
          
        {/* </Grid> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddButton} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
