import React, { useEffect, useState } from 'react';
import { ApiCalling } from "../../../../services/Api.js";
import Chart from 'chart.js/auto'; // Import Chart.js

function UserDevice() {



    async function getDeviceData() {
        const res = await ApiCalling("GET", "extra/getUserAgentsData");

        if (res.success) {
            renderChart(res.data)
        }
    }


    useEffect(() => {
        getDeviceData();
    }, []);

    // Function to render the pie chart
    function renderChart(devicedata) {
        const data = {
            labels: [
                'Mobile Users',
                'Desktop Users',
                'Tablet Users',
                'Others'
            ],
            datasets: [{
                label: 'User Device Distribution',
                data: [
                    devicedata.mobile,
                    devicedata.desktop,
                    devicedata.tablet,
                    devicedata.other,
                ],
                backgroundColor: [
                    'rgba(106, 108, 246, 0.6)', // Blue
                    'rgba(141, 218, 46, 0.6)', // Green
                    'rgba(255, 99, 132, 0.6)', // Red
                    'rgba(255, 159, 64, 0.6)', // Orange
                ],
                hoverOffset: 4
            }]
        };

        const config = {
            type: 'doughnut',
            data: data,
        };

        // Get the canvas element
        const canvas = document.getElementById('deviceChart');

        // Initialize Chart.js instance
        new Chart(canvas, config);
    }

    return (
        <div className='flex w-[350px] shadow-lg h-[350px] overflow-hidden bg-white p-5 flex-col justify-center items-center rounded-lg gap-2'>
            <p className='font-bold text-blue-700 text-lg'>Visit Customers</p>
            <div className='flex justify-center h-[300px] w-[300px] items-center'>
                <canvas id="deviceChart" width="200" height="200"></canvas>
            </div>
        </div>
    );
}

export default UserDevice;
