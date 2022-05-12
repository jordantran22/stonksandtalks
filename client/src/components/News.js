import React from 'react'
import { useEffect, useState } from 'react';

const News = () => {
    const [news, setNews] = useState([]);
    // const date = new Date(Date.now()).toJSON().substring(0,10);
    const date = new Date(Date.now()).toDateString();

    const getNews = async () => {
        const requestInfo = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
        }
  
        const res = await fetch(`${process.env.React_App_SERVER_URL}/news`, requestInfo);
        const data = await res.json();
        console.log(data);
        setNews(data.news);
    }



    useEffect(() => {
        getNews();
    }, []);

    return (
        <div className='newsContainer'>

            <h1>Recent News</h1>
            {
              
                news.map((report) => {
                    return(
                        <a href={report.link} target="_blank" style={{ textDecoration: 'none' }}>
                        <div className='newsComponentContainer'>
                             <img className='newsImage' src={report.img !== "none" ? 
                                report.img : 
                                'https://media.istockphoto.com/photos/price-of-btc-is-going-to-breakout-picture-id1310618429?b=1&k=20&m=1310618429&s=170667a&w=0&h=DsVwbbr3jKcS711y3l_-Bw-uX2RPC5apPM3FqUdNCU4=' 
                            } />

                            <div>
                                <h3 className='articleHeader'>{report.articleHeader}</h3>
                                <div className='newsDate'>{date}</div>
                            </div>
                        </div>
                        </a>
                    );
                })
            }
        </div>


    )
}

export default News