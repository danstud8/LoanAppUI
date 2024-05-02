import React from 'react';
import '../styles/LoanItem.css';
function LoanItem(props) {

    return (
        <div className="loan-item">
            <div className="loan-item-header">
                <h3>{props.loanNumber}</h3>
            </div>
            <div className="loan-item-body">
                <p>{props.amount}</p>
            </div>
            <div className="loan-item-body">
                <p>{props.status}</p>
            </div>
            <div className="loan-item-body">
                <p>{props.startTime}</p>
            </div>
            <div className="loan-item-body">
                <p>{props.endTime}</p>
            </div>
        </div>
    );
}

export default LoanItem;