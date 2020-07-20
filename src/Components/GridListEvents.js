import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
// import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'auto',
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(2),
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    // height: theme.spacing
  },
  title: {
    color: theme.palette.primary.dark,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  img: {
    height: 355,
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function GridListEvents() {

  const tileData = [
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQkdYZmP_DK3N6RjjWwVGagR2BjlZCe0c2jTg&usqp=CAU",
      title: 'Image',
      author: 'author',
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/campusthreadflutter.appspot.com/o/ProfilePics%2FJYU8h8QvNjUPQQvPlsNUbx9BJtm2.jpeg?alt=media&token=0b0701ce-03bc-4246-9b1f-be1d604d807a",
      title: 'Image',
      author: 'author',
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/campusthreadflutter.appspot.com/o/ProfilePics%2FJYU8h8QvNjUPQQvPlsNUbx9BJtm2.jpeg?alt=media&token=0b0701ce-03bc-4246-9b1f-be1d604d807a",
      title: 'Image',
      author: 'author',
    },
  ];
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5} >
        {tileData.map((tile) => (
          <GridListTile key={tile.img} rows={2}>
            <img src={tile.img} alt={tile.title} className={classes.img} />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
