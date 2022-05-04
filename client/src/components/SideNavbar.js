import React from 'react'
import useYahooWebsocket from '../hooks/useYahooWebsocket';
import { useEffect, useState } from 'react';

const SideNavbar = () => {
    const popularStocks = ['TSLA', 'AAPL', 'MSFT', 'AMZN'];
    const topCrypto = ['BTC', 'ETH', 'DOGE'];
    const wallStreetBets = ['AMC', 'GME', 'NOK'];

    const TSLA = useYahooWebsocket('TSLA');
    const AAPL = useYahooWebsocket('AAPL');
    const MSFT = useYahooWebsocket('MSFT');
    const AMZN = useYahooWebsocket('AMZN');

    const GME = useYahooWebsocket('GME');
    const AMC = useYahooWebsocket('AMC');
    const NOK = useYahooWebsocket('NOK');

    const BTC = useYahooWebsocket('BTC-USD');
    const DOGE = useYahooWebsocket('DOGE-USD');
    const ETH = useYahooWebsocket('ETH-USD');

    const formatPriceByTwoDecimals = (price) => {
        return `$${price.toFixed(2)}`;
    }

    const formatChangePercentageTwoDecimals = (change) => {
        return `${change.toFixed(2)}`;
    }

    useEffect(() => {
        
    }, []);

    return (
        <div className='sidebarContainer'>
            <div className='categories'>
                <h2 className='categoryTitle'>Popular Stocks🔥</h2>
                {
                    popularStocks.map((stock) => {
                       return( 
                            <div className='popularStockNameContainer'>
                                <div className='popularStockName'>{stock}</div>

                                <div className='popularStockPriceActionContainer'>
                                    {
                                         (stock === 'TSLA' && TSLA !== null) ? 
                                            <div className={TSLA.changePercent > 0 ? 'stockPriceActionPositive' : 'stockPriceActionNegative'}> 
                                                <div>{formatPriceByTwoDecimals(TSLA.price)}</div>
                                                <div className='percentChange'> ({TSLA.changePercent > 0 && '+'}{formatChangePercentageTwoDecimals(TSLA.changePercent)}%)</div> 
                                            </div>  :
                                         (stock === 'AAPL' && AAPL !== null) ? 
                                            <div className={AAPL.changePercent > 0 ? 'stockPriceActionPositive' : 'stockPriceActionNegative'}>
                                                <div>{formatPriceByTwoDecimals(AAPL.price)}</div>
                                                <div className='percentChange'> ({AAPL.changePercent > 0 && '+'}{formatChangePercentageTwoDecimals(AAPL.changePercent)}%)</div> 
                                            </div> :
                                         (stock === 'MSFT' && MSFT !== null) ? 
                                            <div className={MSFT.changePercent > 0 ? 'stockPriceActionPositive' : 'stockPriceActionNegative'}>
                                                <div>{formatPriceByTwoDecimals(MSFT.price)}</div>
                                                <div className='percentChange'> ({MSFT.changePercent > 0 && '+'}{formatChangePercentageTwoDecimals(MSFT.changePercent)}%)</div> 
                                            </div> :
                                         (stock === 'AMZN' && AMZN !== null) ? 
                                            <div className={AMZN.changePercent > 0 ? 'stockPriceActionPositive' : 'stockPriceActionNegative'}>
                                                <div>{formatPriceByTwoDecimals(AMZN.price)}</div>
                                                <div className='percentChange'>({AMZN.changePercent > 0 && '+'}{formatChangePercentageTwoDecimals(AMZN.changePercent)}%)</div>
                                            </div> : <div></div>
                                    }  
                                </div>
                            </div>
                       )
                    })
                }
                <h2 className='categoryTitle'>Wall Street Bets💰</h2>
                {
                    wallStreetBets.map((stock) => {
                       return( 
                        <div className='popularStockNameContainer'>
                            <div className='popularStockName'>{stock}</div>

                            <div className='popularStockPriceActionContainer'>
                                {
                                    (stock === 'GME' && GME !== null) ? 
                                        <div className={GME.changePercent > 0 ? 'stockPriceActionPositive' : 'stockPriceActionNegative'}> 
                                            <div>{formatPriceByTwoDecimals(GME.price)}</div>
                                            <div className='percentChange'> ({GME.changePercent > 0 && '+'}{formatChangePercentageTwoDecimals(GME.changePercent)}%)</div> 
                                        </div>  :
                                    (stock === 'AMC' && AMC !== null) ? 
                                        <div className={AMC.changePercent > 0 ? 'stockPriceActionPositive' : 'stockPriceActionNegative'}>
                                            <div>{formatPriceByTwoDecimals(AMC.price)}</div>
                                            <div className='percentChange'> ({AMC.changePercent > 0 && '+'}{formatChangePercentageTwoDecimals(AMC.changePercent)}%)</div> 
                                        </div> :
                                    (stock === 'NOK' && NOK !== null) ? 
                                        <div className={NOK.changePercent > 0 ? 'stockPriceActionPositive' : 'stockPriceActionNegative'}>
                                            <div>{formatPriceByTwoDecimals(NOK.price)}</div>
                                            <div className='percentChange'> ({NOK.changePercent > 0 && '+'}{formatChangePercentageTwoDecimals(NOK.changePercent)}%)</div> 
                                        </div> :  <div></div>
                                }  
                            </div>
                        </div>
                       )
                    })
                }
                <h2 className='categoryTitle'>Crypto <img className="coinEmoji" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/coin_1fa99.png"/></h2>
                {
                    topCrypto.map((coin) => {
                       return( 
                        <div className='popularStockNameContainer'>
                            <div className='popularStockName'>{coin}</div>

                            <div className='popularStockPriceActionContainer'>
                                {
                                    (coin === 'BTC' && BTC !== null) ? 
                                        <div className={BTC.changePercent > 0 ? 'stockPriceActionPositive' : 'stockPriceActionNegative'}> 
                                            <div>{formatPriceByTwoDecimals(BTC.price)}</div>
                                            <div className='percentChange'> ({BTC.changePercent > 0 && '+'}{formatChangePercentageTwoDecimals(BTC.changePercent)}%)</div> 
                                        </div>  :
                                    (coin === 'ETH' && ETH !== null) ? 
                                        <div className={ETH.changePercent > 0 ? 'stockPriceActionPositive' : 'stockPriceActionNegative'}>
                                            <div>{formatPriceByTwoDecimals(ETH.price)}</div>
                                            <div className='percentChange'> ({ETH.changePercent > 0 && '+'}{formatChangePercentageTwoDecimals(ETH.changePercent)}%)</div> 
                                        </div> :
                                    (coin === 'DOGE' && DOGE !== null) ? 
                                        <div className={DOGE.changePercent > 0 ? 'stockPriceActionPositive' : 'stockPriceActionNegative'}>
                                            <div>{formatPriceByTwoDecimals(DOGE.price)}</div>
                                            <div className='percentChange'> ({DOGE.changePercent > 0 && '+'}{formatChangePercentageTwoDecimals(DOGE.changePercent)}%)</div> 
                                        </div> :  <div></div>
                                }  
                            </div>
                        </div>
                       )
                    })
                }

            </div>
        </div>
  )
}

export default SideNavbar