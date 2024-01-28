import React, { useEffect } from 'react';
import { ApiCalling } from "../../../../services/Api";
import { Chart } from 'chart.js/auto';

function SalesOnDayBasis() {

    async function getSalesData() {

        const res = await ApiCalling("GET", "order/getSalesReportOnDayBasis");

        if (res.success) {
            renderGraph(res.data);
        } else {
            console.log("Something wen wrong when trying to get sales data")
        }
    }


    function renderGraph(salesData) {
        // Extract dates and total sales amounts from the sales data
        const labels = salesData.map(entry => entry.date);
        const salesAmounts = salesData.map(entry => entry.totalSales);

        const data = {
            labels: labels,
            datasets: [{
                label: 'Total Sales',
                data: salesAmounts,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };

        const config = {
            type: 'line',
            data: data,
        };

        // Get the canvas element
        const graph = document.getElementById('graphId');

        // Create a new Chart instance
        new Chart(graph, config);

    }


    useEffect(() => {

        getSalesData();
    }, [])
    return (
        <div className='flex flex-col gap-2 items-start justify-start'>
            <p className='text-2xl text-right font-semibold'>Sales Chart</p>
            <div className=' bg-white shadow-lg rounded-lg p-3 overflow-hidden'>
                <canvas id="graphId" width="600px" height="300px" ></canvas>
            </div>
        </div >
    )
}

export default SalesOnDayBasis
