import React from 'react'
import { useEffect, useState } from 'react';

const News = () => {
    const [news, setNews] = useState([]);

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
                        <div>
                            <h3>{report.articleHeader}</h3>
                        </div>
                    );
                })
            }
        </div>


    )
}

export default News