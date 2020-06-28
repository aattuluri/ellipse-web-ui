import React from 'react';
// import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
// import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
// import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import Button from '@material-ui/core/Button';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles((theme) => ({
  
}));




function ImageDialog(props) {
  const classes = useStyles();
  function handleMoreButtonClick(){
    console.log("button clicked");
    props.click(props.eventId);
  }

  return (
      <div></div>
   );
}

export default ImageDialog;

