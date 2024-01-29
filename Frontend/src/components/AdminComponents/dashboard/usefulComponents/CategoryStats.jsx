import React, { useEffect, useState } from 'react';
import { ApiCalling } from "../../../../services/Api";
import Chart from 'chart.js/auto'; // Import Chart.js



function CategoryStats() {

    async function getData() {
        const res = await ApiCalling("GET", "order/getCategoryStats");

        console.log(res)

        if (res.success) {

            // Calculate total users
            const totalUsers = res.data.male + res.data.female + res.data.other;
            // Calculate percentages
            const malePercentage = (res.data.male / totalUsers) * 100;
            const femalePercentage = (res.data.female / totalUsers) * 100;
            const otherPercentage = (res.data.other / totalUsers) * 100;

            // Update state with percentage data
            const setGenderData = {
                male: malePercentage,
                female: femalePercentage,
                other: otherPercentage
            };

            renderChart(setGenderData)
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
        const canvas = document.getElementById('categoryChart');

        // Initialize Chart.js instance
        new Chart(canvas, config);
    }

    return (
        <div className='flex w-[350px] shadow-lg h-[350px] overflow-hidden bg-white p-5 flex-col justify-center items-center rounded-lg gap-2'>
            <p className='font-bold text-blue-700 text-lg'>Gender Ratio</p>
            <div className='flex justify-center h-[300px] w-[300px] items-center'>
                <canvas id="categoryChart" width="200" height="200"></canvas>
            </div>
        </div>
    );
}

export default CategoryStats;
