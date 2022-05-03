import React from 'react'
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
// import {CategoryScale} from 'chart.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';
    
    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    );
    


const LineChart = ({stockPrice}) => {
    const [price, setPrice] = useState([]);
    const date = new Date();
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let currentMonth = month[date.getMonth()];
    const labels = [month[date.getMonth() - 4], month[date.getMonth() - 3], month[date.getMonth() - 2],  month[date.getMonth() - 1]]
    //console.log(labels);

    useEffect(() => {
        console.log("testing");
        setPrice(price => [...price, stockPrice]);
        console.log(price);
    }, [stockPrice]);

    return (
        <div>
            <Line data={{
                labels: price,
                datasets: [
                    {
                        data: price,
                        fill: true,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }
                ]
            }
            }
            height={400}
            width={600}/>
        </div>
    )
}

export default LineChart