import React, {useState,useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';
import wordsToNumbers from 'words-to-numbers';

const alanKey='cac2ddc1b2bbd0d427459a7b1fbbbc282e956eca572e1d8b807a3e2338fdd0dc/stage';

const App=() => {
    
    const [newsArticles, setNewsArticles]= useState([]);
    const [activeArt, setActive]=useState(-1);
    const classes=useStyles();
    useEffect(() => {
        var alanBtnInstance=alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number}) => {
                if(command === 'newHeadLines'){
                    setNewsArticles(articles);
                    setActive(-1);
                }
                else if(command === 'highlight'){
                    setActive((prevActive)=> prevActive+1);
                }
                else if(command=== 'open'){
                    const parsednum=number.length > 2 ? wordsToNumbers(number,{fuzzy:true}) : number;
                    const article=articles[parsednum-1];
                    if(parsednum>20){
                        alanBtnInstance.playText("Please try that again");
                    }
                    else if(article){
                        window.open(article.url, '_blank');
                        alanBtnInstance.playText("Opening");
                    }
                    else {
                        alanBtnInstance.playText("Please try that again...");
                      }
                }

            },
        });
    } , []);

    return(
        <body>
        <div>
            <div className={classes.heading}>
                <h1>NEWSTALK</h1>

            </div>
            <NewsCards articles= {newsArticles} activeArt={activeArt} />
        </div>
        </body>
    );
};

export default App;