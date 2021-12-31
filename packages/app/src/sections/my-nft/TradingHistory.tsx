import React from "react";
import Image from "next/image";

const TradingHistory = () => {
    return (
        <div className="tradingHistory" style={{}}>
            <h3 className="">Trading History</h3>

            <div className="tradingHistory__lists">
                <ul style={{
                    display: 'flex',
                }}>
                    <li style={{marginRight: '90px',}}>ACTION</li>
                    <li style={{marginRight: '90px',}}>BLOCK</li>
                    <li style={{marginRight: '90px',}}>TOKEN ID</li>
                    <li>HASH</li>
                </ul>
            </div>
        </div>
    )
}

export default TradingHistory;