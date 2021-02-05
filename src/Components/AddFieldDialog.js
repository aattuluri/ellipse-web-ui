import React from 'react';

//Materail impports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import { Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
// import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';





export default function FormDialog(props) {
  const theme = useTheme();
  const [name, setName] = React.useState(null);
  const [type, setType] = React.useState(null);
  // const [variant,setVariant] = React.useState(null);
  const [required,setRequired] = React.useState(true);
  const fieldOptions = [];
  const [selectedOptions, setSelectedOptions] = React.useState(['option1', 'option2']);
  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleTypeChange(event) {
    setType(event.target.value);
  }
  function handleOptionsChange(event, values) {
    setSelectedOptions(values);
  }
  function handleAddButton() {
    if (name != null && type != null) {
      // console.log(type)
      if (type !== "radiobuttons" && type !== "checkboxes" && type !== "dropdown") {
        props.handleAdd({ [name]: { 'title': name, 'field': type,req: required, 'options': [] } }, name);
      }
      else {
        props.handleAdd({ [name]: { 'title': name, 'field': type,req: required, 'options': selectedOptions } }, name);
      }
      setName(null);
      setType(null);
      setSelectedOptions(['option1', 'option2']);
      props.handleClose()
    }
  }

  function handleradioChange(event, value) {
    // setVariant(value)
    if(value === "required"){
      setRequired(true);
    }
    else{
      setRequired(false);
    }
}


  return (
    <div>
      <Dialog open={props.open} fullWidth={true} PaperProps={{
        style: {
          backgroundColor: theme.palette.secondary.main,
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
                  value={type}
                  onChange={handleTypeChange}
                >
                  <option aria-label="None" value="" />
                  <option value="short_text">Short Text</option>
                  <option value="paragraph">Long Description</option>
                  <option value="dropdown">Drop Down</option>
                  <option value="date">Date & Time</option>
                  <option value="radiobuttons">Radio Button</option>
                  <option value="checkboxes">Check Box</option>
                  <option value="link">Link</option>
                  <option value="file_upload">File Upload</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {/* <FormLabel required component="legend">{field.title}</FormLabel> */}
              <RadioGroup required aria-label="variant" name="variant" defaultValue="required" onChange={handleradioChange} style={{ display: "inline" }}>
                <FormControlLabel value="required" control={<Radio color="default" />} label="Required" />
                <FormControlLabel value="optional" control={<Radio color="default" />} label="Optional" />
              </RadioGroup>
            </Grid>
            {(type === "radiobuttons" || type === "checkboxes" || type === "dropdown") &&
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
          </Grid>
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
