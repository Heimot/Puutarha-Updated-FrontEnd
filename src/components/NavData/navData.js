import DatePicker from 'react-datepicker';
import React, { useState, useEffect } from 'react';
import { Button } from "reactstrap";
import './navData.css';

import "react-datepicker/dist/react-datepicker.css";

function NavData(props) {
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        let dateS = sessionStorage.getItem('date').split('/');
        let newDate = `${dateS[1]}/${dateS[0]}/${dateS[2]}`;
        setStartDate(new Date(newDate));
    }, [])

    const changeDate = (date) => {
        setStartDate(date);
        const ye = new Intl.DateTimeFormat('fi', { year: 'numeric' }).format(date);
        const mo = new Intl.DateTimeFormat('fi', { month: '2-digit' }).format(date);
        const da = new Intl.DateTimeFormat('fi', { day: '2-digit' }).format(date);
        sessionStorage.setItem("date", `${da}/${mo}/${ye}`);
        window.location.reload()
    }

    return (
        <div className="navData">
            <div>
                WELCOME!
            </div>
            <Button className="navBtn">Kerättävät</Button>
            <Button className="navBtn">Ryönä</Button>
            <DatePicker className="datePicker" value={sessionStorage.getItem('date')} selected={startDate} onChange={(date) => changeDate(date)} withPortal />
            <Button className="navBtn" onClick={() => props.close()}>Lisää uusi tilaus</Button>
            <Button className="navBtn">Eteneminen</Button>
            <Button className="navBtn">Kirjaudu ulos</Button>
        </div>
    )
}

export default NavData;