import React from 'react'

const SideNavbar = () => {
    const popularStocks = ['TSLA', 'AAPL', 'MSFT', 'AMZN'];
    const topCrypto = ['BTC', 'ETH', 'USDT', 'BNB', 'DOGE'];
    const wallStreetBets = ['AMC', 'GME', 'NOK'];

    return (
        <div className='sidebarContainer'>
            <div className='categories'>
                <h2 className='categoryTitle'>Popular Stocks</h2>
                {
                    popularStocks.map((stock) => {
                       return( 
                            <div className='popularStockName'>{stock}</div>
                       )
                    })
                }
                <h2 className='categoryTitle'>Wall Street Bets</h2>
                {
                    wallStreetBets.map((stock) => {
                       return( 
                            <div className='popularStockName'>{stock}</div>
                       )
                    })
                }
                <h2 className='categoryTitle'>Crypto</h2>
                {
                    topCrypto.map((coin) => {
                       return( 
                            <div className='popularStockName'>{coin}</div>
                       )
                    })
                }
            </div>
        </div>
  )
}

export default SideNavbar