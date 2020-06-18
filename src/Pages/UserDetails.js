import React, { useState,useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../firebaseConfig";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import firebaseApp from "../firebaseConfig";
import firebase from "firebase/app";
import { AuthContext } from "../Auth";
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

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
  // const { currentUser } = useContext(AuthContext);
  // if (!currentUser) {
  //   console.log(currentUser);
  //   return <Redirect to="/"/>;
  // }
  // const currentUserUid = firebaseApp.auth().currentUser.uid;
  function handleChange(event) {
    if (event.target.files[0]) {
      const image = event.target.files[0]
      setImageAsFile(imageFile => (image))
      const url = URL.createObjectURL(event.target.files[0]);
      const fileType = event.target.files[0].type;
      setImageurl(url)
      setImageType(fileType.substr(fileType.indexOf('/') + 1));
    }
  }
  // function sk

  function uploadData(event) {
    event.preventDefault();
    history.replace("/home");
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

  }

  return (
    <div className={classes.paperRight}>
      <h1>Welcome</h1>
      <Avatar className={classes.large} sizes="100" alt="" src={imageUrl} />
      <form onSubmit={uploadData} className={classes.form}>
        <Button variant="contained" component="span">
          <input required type="file" accept="image/*" onChange={handleChange}></input>
        </Button><br></br>
        <TextareaAutosize name="bio" required aria-label="minimum height" rowsMin={7} className={classes.textArea} placeholder="Bio" /><br></br>
        <Button variant="contained" size="large" onClick={() => app.auth().signOut()}>Skip   </Button>
        <Button variant="contained" size="large" type="submit">
        {loading ? <CircularProgress color="primary" size={24} />: "Save and continue" }
        </Button>
      </form>

    </div>
  )
}

export default withRouter(UserDetails);
