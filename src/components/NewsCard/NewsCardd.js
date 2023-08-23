import React, {useState,useEffect, createRef} from 'react';

import {Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography} from '@mui/material';
import classNames from 'classnames';
import useStyles from "./style.js";

const NewsCardd = ({articles,activeArt,index }) => {
    
    const classes=useStyles();
    const [elRefs,setElRefs]= useState([]);
    const scrollToRef=(ref) => window.scroll(0,ref.current.offsetTop-50);

    useEffect(() => {
        setElRefs((refs)=>Array(20).fill().map((_,j) => refs[j] || createRef()));
    },[]);

    useEffect(() => {
        if(index === activeArt && elRefs[activeArt]){
            scrollToRef(elRefs[activeArt]);
        }
    }, [index, activeArt, elRefs])
    return(
        <Card ref={elRefs[index]} className={classNames(classes.card, activeArt === index ? classes.activeCard : null)}>
            <CardActionArea href={articles.url} target="_blank">
                <CardMedia className={classes.media} image={articles.urlToImage || 'https://thumbs.dreamstime.com/z/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg?w=992'} />
                <div className={classes.details}>
                    <Typography  variant="body2" color="textSecondary" component="h2">{new Date(articles.publishedAt).toDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h2">{articles.source.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" fontFamily="open-sans">{articles.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" fontFamily="open-sans" component="p">{articles.description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary">Learn More</Button>
                
                <Typography variant="h5" color="textSecondary">{index+1}</Typography>
                
            </CardActions>
        </Card>
        
    );
};

export default NewsCardd;