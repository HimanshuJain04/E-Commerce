import React, { useEffect, useState } from 'react';
import { ApiCalling } from "../../../../services/Api.js";
import Chart from 'chart.js/auto'; // Import Chart.js



function CategoryStats() {

    async function getData() {
        const res = await ApiCalling("GET", "order/getCategoryStats");

        if (res.success) {
            renderChart(res.data);
        }
    }


    useEffect(() => {
        getData();
    }, []);


    // Function to generate background colors dynamically
    function generateBackgroundColors(count) {
        const colors = [];

        // Start with a base hue value
        let hue = Math.floor(Math.random() * 360);

        // Generate colors with varying hue values
        for (let i = 0; i < count; i++) {
            // Convert HSL color to RGB
            const color = `hsla(${hue}, 70%, 50%, 0.6)`;
            colors.push(color);

            // Increment hue for the next color
            hue = (hue + 137.508) % 360; // Golden ratio to ensure good color distribution
        }

        return colors;
    }


    // Function to render the pie chart
    function renderChart(data) {

        const totalCount = Object.values(data).reduce((acc, cur) => acc + cur, 0);
        const labels = Object.keys(data);
        const percentages = Object.values(data).map(value => (value / totalCount) * 100);

        const backgroundColors = generateBackgroundColors(percentages.length);

        const config = {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Category Distribution',
                    data: percentages,
                    backgroundColor: backgroundColors,
                    hoverOffset: 4
                }]
            },
        };

        const canvas = document.getElementById('categoryChart');
        const existingChart = Chart.getChart(canvas);
        if (existingChart) {
            existingChart.destroy();
        }
        new Chart(canvas, config);
    }

    return (
        <div className='flex w-[350px] shadow-lg h-[350px] overflow-hidden bg-white p-5 flex-col justify-center items-center rounded-lg gap-2'>
            <p className='font-bold text-blue-700 text-lg'>Category Chart</p>
            <div className='flex justify-center h-[300px] w-[300px] items-center'>
                <canvas id="categoryChart" width="200" height="200"></canvas>
            </div>
        </div>
    );
}

export default CategoryStats;
