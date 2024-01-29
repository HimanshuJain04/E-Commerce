import React, { useEffect, useState } from 'react';
import { ApiCalling } from "../../../../services/Api";
import Chart from 'chart.js/auto'; // Import Chart.js



function GenderRatio() {

    async function getData() {
        const res = await ApiCalling("GET", "extra/getGenderData");

        if (res.success) {
            renderChart(res.data)
        }
    }


    useEffect(() => {
        getData();
    }, []);

    // Function to render the pie chart
    function renderChart(genderdata) {
        const data = {

            labels: [
                "Male",
                "Female",
                "Others",
            ],

            datasets: [{
                label: 'User Device Distribution',
                data: [
                    genderdata.male,
                    genderdata.female,
                    genderdata.other,
                ],
                backgroundColor: [
                    'rgba(106, 108, 246, 0.6)', // Blue
                    'rgba(255, 99, 132, 0.6)', // Red
                    'rgba(128, 233, 97, 0.949)', // yellow
                ],
                hoverOffset: 4
            }]
        };

        const config = {
            type: 'pie',
            data: data,
        };

        // Get the canvas element
        const canvas = document.getElementById('genderChart');

        // Initialize Chart.js instance
        new Chart(canvas, config);
    }

    return (
        <div className='flex w-[350px] shadow-lg h-[350px] overflow-hidden bg-white p-5 flex-col justify-center items-center rounded-lg gap-2'>
            <p className='font-bold text-blue-700 text-lg'>Gender Stats</p>
            <div className='flex justify-center h-[300px] w-[300px] items-center'>
                <canvas id="genderChart" width="200" height="200"></canvas>
            </div>
        </div>
    );
}

export default GenderRatio;
