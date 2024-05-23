import React, {useEffect, useState} from 'react';
import '../styles/LoansPage.css';
import loansService from '../api/LoansApi';
import LoanItem from "../components/LoanItem";
import {jwtDecode} from "jwt-decode";

function LoansPage(props) {
    const [loans, setLoans] = useState([]);
    const [filter, setFilter] = useState('');

    const activeLoans = filter === '' ? loans : loans.filter(loan => loan.status === filter);
    const isAdmin = jwtDecode(localStorage.getItem('token')).role === "ADMIN";

    const handleChangeFilter = (event) => {
        setFilter(event.target.value);
    }
    useEffect(() => {
        isAdmin ?
            loansService.fetchAllLoans()
                .then((loans) => {setLoans(loans);})
                .catch((error) => {console.error('Error during fetching loans:', error);})
            :
            loansService.fetchLoans()
            .then((loans) => {setLoans(loans);})
            .catch((error) => {console.error('Error during fetching loans:', error);
            });
    }, []);

    const handleAcceptLoan = (loanNumber) => {
        const updatedLoans = loans.map(loan => {
            if (loan.loanNumber === loanNumber) {
                return { ...loan, status: 'Activ' };
            }
            return loan;
        });
        setLoans(updatedLoans);

        loansService.acceptLoan(loanNumber)
            .then(() => console.log("Loan accepted successfully"))
            .catch((error) => console.error('Error accepting loan:', error));
    };

    const handleRejectLoan = (loanNumber) => {
        const updatedLoans = loans.map(loan => {
            if (loan.loanNumber === loanNumber) {
                return { ...loan, status: 'Respins' };
            }
            return loan;
        });
        setLoans(updatedLoans);

        loansService.rejectLoan(loanNumber)
            .then(() => console.log("Loan rejected successfully"))
            .catch((error) => console.error('Error rejecting loan:', error));
    };

    const handleDeleteLoan = (loanNumber) => {
        const updatedLoans = loans.filter(loan => loan.loanNumber !== loanNumber);
        setLoans(updatedLoans);

        loansService.deleteLoan(loanNumber)
            .then(() => console.log("Loan deleted successfully"))
            .catch((error) => console.error('Error deleting loan:', error));
    };

    return (
        <>
            {isAdmin ? <h3 className="header">Creditele tuturor clientilor.</h3> : <h3 className="header">Toate creditele mele</h3>}
            <hr width="90%"></hr>
            <select
                className="select-filter"
                name="filter"
                value={filter}
                onChange={handleChangeFilter}
            >
                <option value="">Toate creditele</option>
                <option value="Activ">Active</option>
                <option value="Deschis">Deschise</option>
                <option value="Respins">Respinse</option>
            </select>
            <h3 className="header-title" style={isAdmin ? { marginRight: '138px' } : null}>
                <div>Numarul Creditului</div>
                <div>Suma</div>
                <div>Costul Total</div>
                <div>Status</div>
                <div>Inceputul Creditului</div>
                <div>Sfarsitul Creditului</div>
            </h3>
            <hr width="90%"></hr>
            {
                activeLoans.map((loan) => (
                <LoanItem
                    key={loan.loanNumber}
                    loan={loan}
                    onAcceptLoan={handleAcceptLoan}
                    onRejectLoan={handleRejectLoan}
                    onDeleteLoan={handleDeleteLoan}
                    isAdmin={isAdmin}
                />
            ))}
        </>
    );
}

export default LoansPage;