import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CreateList() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <div>
            <label>Start Date:</label>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <label>End Date:</label>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </div>
    );
}