import React, {useState} from 'react';
import '../styles/LoanItem.css';
import Button from "@mui/material/Button";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import {ButtonGroup} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import loansService from "../api/LoansApi";

function LoanItem(props) {

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();

        return `${day}/${month}/${year}`;
    }
    const handleAccept =  () => {
        props.onAcceptLoan(props.loan.loanNumber)
        console.log("Accept loan")
    }
    const handleDelete = () => {
        props.onDeleteLoan(props.loan.loanNumber)
        console.log("Delete loan")
    }
    const handleReject = () => {
        props.onRejectLoan(props.loan.loanNumber)
        console.log("Reject loan")
    }

    return (
        <div className="loan-item-flex">
            <div className="loan-item">
                <div className="loan-item-header">
                    <h3>{props.loan.loanNumber}</h3>
                </div>
                <div className="loan-item-body">
                    <p>{props.loan.amount} lei</p>
                </div>
                <div className="loan-item-body">
                    <p>{props.loan.totalCost} lei</p>
                </div>
                <div className="loan-item-body">
                    <p>{props.loan.status}</p>
                </div>
                <div className="loan-item-body">
                    <p>{formatDate(props.loan.startTime)}</p>
                </div>
                <div className="loan-item-body">
                    <p>{formatDate(props.loan.endTime)}</p>
                </div>
            </div>
            {props.isAdmin &&
            <ButtonGroup>
                <Button variant="contained" color="success" startIcon={<CheckIcon/>} onClick={handleAccept}
                        className="buttonItem"
                        sx={{
                            // Center the icon horizontally
                            "& .MuiButton-startIcon": {
                                marginRight: "auto",
                                marginLeft: "auto",
                            },
                        }}>
                </Button>
                <Button variant="contained" color="warning" startIcon={<CloseIcon />} onClick={handleReject}
                        className="buttonItem"
                        sx={{
                            // Center the icon horizontally
                            "& .MuiButton-startIcon": {
                                marginRight: "auto",
                                marginLeft: "auto",
                            },
                        }}>
                </Button>
                <Button variant="contained" color="error" startIcon={<DeleteIcon/>} onClick={handleDelete}
                        className="buttonItem"
                        sx={{
                            // Center the icon horizontally
                            "& .MuiButton-startIcon": {
                                marginRight: "auto",
                                marginLeft: "auto",
                            },
                        }}>
                </Button>
            </ButtonGroup>
            }

        </div>
    );
}

export default LoanItem;