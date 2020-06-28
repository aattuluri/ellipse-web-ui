import React, { useState, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CircularProgress from '@material-ui/core/CircularProgress';


import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paperRight: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(4),
    // borderRadius: 30,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  textArea: {
    width: theme.spacing(50),
    margin: theme.spacing(2),
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.dark,
  },
  form: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.secondary.main,

  },
}));


const UserDetails = ({ history }) => {
  const classes = useStyles();
  const [imageUrl, setImageurl] = useState("");
  const [imageType, setImageType] = useState("");
  const [imageAsFile, setImageAsFile] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);
  // const { currentUser } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  const currentUser = localStorage.getItem('user');
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: 'success',
    type: 'error'
  });
  if (!currentUser) {
    console.log(currentUser);
    return <Redirect to="/" />;
  }
  const { vertical, horizontal, open, message, type } = state;
  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }


  function handleChange(event) {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
      setImageAsFile(imageFile => (image))
      const url = URL.createObjectURL(event.target.files[0]);
      const fileType = event.target.files[0].type;
      setImageurl(url)
      setImageType(fileType.substr(fileType.indexOf('/') + 1));
    }

  }
  const handleClose = async (event, reason) => {
    console.log(token);

    if (message === "successful") {
      history.replace("/home");
    }

    setState({ ...state, open: false });
  };

  function uploadData(event) {
    setLoading(true);
    event.preventDefault();
    const { bio } = event.target.elements;
    try {
      getBase64(image, (result) => {
        var data = new FormData();
        const payload = {
          image: result,
          bio: bio.value
        };
        data = JSON.stringify(payload);
        console.log(data);
        console.log(bio);
        fetch('https://ellipseserver1.herokuapp.com/api/users/userdetails2', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: data
        }).then(response => {
          if (response.status === 200) {
            console.log(response);
            response.json().then(val => {
              fetch('https://ellipseserver1.herokuapp.com/api/users/me', {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                method: 'GET'
              }).then(result => {
                console.log(result);
                result.json().then(value => {
                  localStorage.setItem('user', JSON.stringify(value))
                  setLoading(false);
                  setState({
                    open: true,
                    vertical: 'top',
                    horizontal: 'center',
                    message: "successful",
                    type: "success"
                  })
                })
              })

            })
          }
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
        type: "error"
      })
    }

  }
  function onSkipButtonClick(){
    history.replace('/home');
  }

  return (
    <div className={classes.paperRight}>
    <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={type}>{message}</Alert>
      </Snackbar>
      <h1>Welcome</h1>
      <Avatar className={classes.large} sizes="100" alt="" src={imageUrl} />
      <form onSubmit={uploadData} className={classes.form}>
      
      
      <input id="contained-button-file" required type="file" accept="image/*" onChange={handleChange} style={{display:"none"}}></input>
      <label htmlFor="contained-button-file">
      <Button
        variant="contained"
        color="default"
        component="span"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
        Upload
        
      </Button>
      </label>
        <TextareaAutosize name="bio" required aria-label="minimum height" rowsMin={7} className={classes.textArea} placeholder="Bio" /><br></br>
        <Button variant="contained" size="large" onClick={onSkipButtonClick}>Skip   </Button>
        <Button variant="contained" size="large" type="submit">
          {loading ? <CircularProgress color="primary" size={24} /> : "Save and continue"}
        </Button>
      </form>

    </div>
  )
}

export default withRouter(UserDetails);



    // history.replace("/home");
    // setLoading(true);
    // const {bio} = event.target.elements;
    // try {
    //   const db = firebase.firestore();
    //   const storageRef = firebase.storage().ref();
    //   const imageRef = storageRef.child(`ProfilePics/${currentUserUid}.${imageType}`);
    //   imageRef.put(imageAsFile).then(snapShot => {
    //     snapShot.ref.getDownloadURL().then(downloadURL => {
    //       db.collection("UserDetails").doc(currentUserUid).update({
    //         'ProfilrPicUrl': downloadURL,
    //         'Bio': bio.value,
    //       }).then(function(){
    //         setLoading(false);
    //         history.replace("/home");
    //       })
    //     });
    //   })
    // }
    // catch (error) {
    //   console.log(error);
    // }