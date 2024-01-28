import React, { useEffect, useState } from 'react';
import { ApiCalling } from "../../../../services/Api";
import Chart from 'chart.js/auto'; // Import Chart.js

function UserDevice() {

    const [deviceData, setDeviceData] = useState([]);

    useEffect(() => {
        async function getDeviceData() {
            const res = await ApiCalling("GET", "extra/getUserAgentsData");

            if (res.success) {
                setDeviceData(res.data);
                renderChart(res.data.mobileUsers, res.data.desktopUsers)
            }
        }

        getDeviceData();
    }, []);

    useEffect(() => {
        if (deviceData.length > 0) {
            renderChart(deviceData.mobileUsers, deviceData.desktopUsers);
        }
    }, [deviceData]); // Run once when deviceData changes

    // Function to render the pie chart
    function renderChart(mobileUsers, desktopUsers) {
        const data = {
            labels: [
                'Mobile Users',
                'Desktop Users'
            ],
            datasets: [{
                label: 'User Device Distribution',
                data: [mobileUsers, desktopUsers],
                backgroundColor: [
                    'rgb(106,108,246)',
                    'rgb(141,218,46)'
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
