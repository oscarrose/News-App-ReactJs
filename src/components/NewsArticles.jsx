import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import imagedefault from "../styles/default2.jpg";



const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

function NewsArticle({props}) {
  const classes  = styles;
  const[img] = useState(props.urlToImage);

  const redirectNews = () =>{ 
    window.location.href =props.url;
  }

  return (

    <Card className={classes.card}>
      <CardActionArea onClick={redirectNews}>
        <CardMedia
          component="img"
          alt="news image"
          className={classes.media}
          height="140"
          image={img 
                  ?
                    img
                  :imagedefault      
                }
          
          
        />
        <CardContent>
          <Typography gutterBottom variant="h6"  component="h1">
            <b>{props.title}</b>
          </Typography>

          <Typography component="p">
            {props.description}
          </Typography>
        
        </CardContent>

      </CardActionArea>

      <Typography className="news-author">
        <span>{props.author}</span>
      </Typography>
      
      <Typography className="news-published">
        <span>{props.publishedAt}</span>
      </Typography>
     
    </Card>
    
  );
}

NewsArticle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewsArticle);
