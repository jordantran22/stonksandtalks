import React from 'react'
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
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


const LineChart = ({historicPrices, historicDates, setHistoricPrices, setHistoricDates, stockPrice, ticker}) => {
      console.log(historicDates);
      console.log(historicPrices);
    const [price, setPrice] = useState([]);
    const date = new Date();
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let currentMonth = month[date.getMonth()];
    const labels = [month[date.getMonth() - 4], month[date.getMonth() - 3], month[date.getMonth() - 2],  month[date.getMonth() - 1]]
    const [time, setCurrentTime] = useState([]);


    useEffect(() => {
        if(stockPrice !== null) {
            setHistoricPrices(historicPrices => [...historicPrices, stockPrice]);
            setHistoricDates(historicDates => [...historicDates, new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() + ":" + new Date(Date.now()).getSeconds()])
        }
    }, [stockPrice]);

    return (
        <div>
            <h1 className='ticker'>{ticker}</h1>
            <Line data={{
                labels: historicDates,
                datasets: [
                    {
                        label: `${ticker} Price Chart`,
                        data: historicPrices,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        fill: true,
                        borderWidth: 1,
                    },
                ],
            }
            }
            height={700}
            width={900}
            options={{
                responsive: true,
                animation: false,
                elements: {
                    point: {
                        radius: 0
                    }
                },
                scales: {
                    xAxes: [ {
                        type: 'time',
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: 'Date'
                        },
                        ticks: {
                          major: {
                            fontStyle: 'bold',
                            fontColor: '#FF0000'
                          }
                        }
                      } ],
                      yAxes: [ {
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: 'Price USD'
                        }
                      } ]
                  }     
            }}
            responsive={true}/>
        </div>
    )
}

export default LineChart