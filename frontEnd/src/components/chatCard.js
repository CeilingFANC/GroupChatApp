import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Zoom from '@material-ui/core/Zoom';

import AvatarWithAlt from './avatarWithAlt';

const useStyles = makeStyles({
  card: {
    //minWidth: 275,
    width: '35%',
    border: 0,
    borderRadius: 5,
    backgroundColor:'#B0BEC5',
  },

  pos: {
    marginBottom: 12,
  },
});

export default function ChatCard(props) {
    console.log(props)
    const classes = useStyles();
    const side = {width:'40%',display: 'inline-block'};
    side.float = props.left?'left':'right';
    side.clear = props.left?'right':'left';
    const {author,text} = props.message;
    //{width:'auto',display: 'inline-block', clear:'both',float:'right'}
    return (
        <Zoom in={true}>
            <div className={'clearfix'} style={{width:'100%',overflow:'auto',marginBottom:'20px'}}>
                {props.left?<div style={{width:'50%',display: 'inline-block'}}>&nbsp;</div>:""}
                <Wrapper leftAlign={props.left} name={props.message.author}/>
                <Card className={classes.card} style={side}>
                    <CardContent>

                        <div style={{wordWrap:'break-word',textAlign:'left'}}>
                            {text}
                        </div>
                    </CardContent>
                </Card>
                
            </div>            
        </Zoom>


    );
  }
function Wrapper(props){
    const style = {};
    style.float = props.leftAlign?'left':'right';
    style.marginLeft = 5;
    style.marginRight = 5;
    return <div style={style}>
        <AvatarWithAlt name={props.name} />
    </div>
}