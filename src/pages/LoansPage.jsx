import React, {useEffect, useState} from 'react';
import '../styles/LoansPage.css';
import loansService from '../api/LoansApi';
import LoanItem from "../components/LoanItem";

function LoansPage(props) {
    const [loans, setLoans] = useState([]);
    const [filter, setFilter] = useState('');

    const activeLoans = filter === '' ? loans : loans.filter(loan => loan.status === filter);

    const handleChangeFilter = (event) => {
        setFilter(event.target.value);
    }
    useEffect(() => {
      // Fetch loans from the API
        loansService.fetchLoans()
            .then((loans) => {
            setLoans(loans);
            })
            .catch((error) => {
            console.error('Error during fetching loans:', error);
            });
    }, []);

    return (
        <>
            <h3 className="header">Toate creditele mele.</h3>
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
            </select>
            <h3 className="header-title">
                <div>Numarul</div>
                <div>Suma</div>
                <div>Status</div>
                <div>Inceputul Creditului</div>
                <div>Sfarsitul Creditului</div>
            </h3>
            <hr width="90%"></hr>
            {activeLoans.map((loan) => (
                <LoanItem
                    key={loan.loanNumber}
                    loanNumber={loan.loanNumber}
                    amount={loan.amount}
                    startTime={loan.startTime}
                    endTime={loan.endTime}
                    status={loan.status}
                />
            ))}
        </>
    );
}

export default LoansPage;