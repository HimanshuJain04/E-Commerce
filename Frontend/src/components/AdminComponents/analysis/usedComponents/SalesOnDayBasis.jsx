import React, { useEffect } from 'react';
import { ApiCalling } from "../../../../services/Api";
import { Chart } from 'chart.js/auto';

function SalesOnDayBasis() {

    async function getSalesData() {

        const res = await ApiCalling("GET", "order/getSalesReportOnDayBasis");
        console.log(res)

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
        <div className=' rounded-lg flex flex-col px-10 py-5 items-center justify-start shadow-lg'>
            <p className='text-xl font-semibold'>Sales Chart</p>
            <div className='w-[500px] bg-white  overflow-hidden'>
                <canvas id="graphId" width={"1000px"} height={"700px"}></canvas>
            </div>
        </div >
    )
}

export default SalesOnDayBasis
