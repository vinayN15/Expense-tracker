'use client';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const [income, setIncome] = useState<number>(0);
    const [expense, setExpense] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/transactions/summary');
                const data = await response.json();
                console.log('API Data:', data); // Log the fetched data to ensure it's correct
                if (response.ok) {
                    setIncome(data.income);
                    setExpense(data.expense);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error('Failed to fetch transaction summary:', error);
            }
        };

        fetchData();
    }, []);

    const data = {
        labels: ['Expense', 'Income'],
        datasets: [
            {
                data: [Math.abs(expense), income],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF4364', '#2682CB'],
            },
        ],
    };

    console.log('Income:', income, 'Expense:', expense);
    return (
        <div className="chart-container">

            {/* <h2 className="text-xl font-medium mb-4">Expense vs Income</h2> */}
            <Pie data={data} />
        </div>
    );
};

export default PieChart;
