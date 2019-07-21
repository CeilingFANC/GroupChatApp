import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import AvatarWithAlt from './avatarWithAlt';

const useStyles = makeStyles({
  card: {
    //minWidth: 275,
    width: '35%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ChatCard(props) {
    console.log(props)
    const classes = useStyles();
    const side = {width:'40%',clear:'both',display: 'inline-block'};
    side.float = props.left?'left':'right';
    const {author,text} = props.message;
    //{width:'auto',display: 'inline-block', clear:'both',float:'right'}
    return (
        <div style={{width:'100%'}}>
            {props.left?<div style={{width:'50%',display: 'inline-block'}}>&nbsp;</div>:""}
            {}
            
            <Card className={classes.card} style={side}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {author}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {text}
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
            </Card>
        </div>

    );
  }