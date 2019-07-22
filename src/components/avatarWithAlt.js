import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles({
    avatar: {
      margin: 10,
      
      color: '#fff',
      backgroundColor: deepOrange[500],
    },
    bigAvatar: {
      margin: 10,
      width: 60,
      height: 60,
    },
  });

  export default function AvatarWithAlt(props) {
    const classes = useStyles();
    const letter = props.name?props.name.charAt(0).toUpperCase():'-';
    return (
        <Avatar className={classes.avatar} >{letter}</Avatar>
    );
  }


  function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}