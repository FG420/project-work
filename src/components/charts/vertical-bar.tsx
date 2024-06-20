"use client"
import axiosInstanceServer from '@/lib/axios-server'
import { Chart } from 'chart.js/auto'
import React, { useEffect, useRef, useState } from 'react'

function BarChart() {
    const chartRef = useRef(null)
    const [chartData, setChartData] = useState([])

    /* useEffect(() => {
        const fetchData = async ()=> {
            const res = await axiosInstanceServer.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/`)
        }
    }) */

    useEffect(() => {
        if (chartRef.current){
            if(chartRef.current.chart){
                chartRef.current.chart.destroy()
            }
            const context = chartRef.current.getContext("2d")

            const newChart = new Chart(context, {
                type: "bar",
                data: {
                    labels: ['John', 'Jane', 'Julie'],
                    datasets: [
                        {
                            label: 'Info',
                            data: [34, 65, 89],
                            backgroundColor: [
                                'rgb(255, 99, 132, 0.2)',
                                'rgb(255, 159, 64, 0.2)',
                                'rgb(255, 205, 86, 0.2)',
                                'rgb(75, 192, 192, 0.2)',
                                'rgb(54, 162, 235, 0.2)',
                                'rgb(153, 102, 255, 0.2)',
                                'rgb(201, 203, 207, 0.2)',
                            ],
                            borderColor: [
                                'rgb(255, 99, 132, 0.2)',
                                'rgb(255, 159, 64, 0.2)',
                                'rgb(255, 205, 86, 0.2)',
                                'rgb(75, 192, 192, 0.2)',
                                'rgb(54, 162, 235, 0.2)',
                                'rgb(153, 102, 255, 0.2)',
                                'rgb(201, 203, 207, 0.2)',
                            ],
                            borderWidth: 1,
                        },
                        {
                            label: 'Info',
                            data: [66, 106, 189],
                            backgroundColor: [
                                'rgb(255, 99, 132, 0.2)',
                                'rgb(255, 159, 64, 0.2)',
                                'rgb(255, 205, 86, 0.2)',
                                'rgb(75, 192, 192, 0.2)',
                                'rgb(54, 162, 235, 0.2)',
                                'rgb(153, 102, 255, 0.2)',
                                'rgb(201, 203, 207, 0.2)',
                            ],
                            borderColor: [
                                'rgb(255, 99, 132, 0.2)',
                                'rgb(255, 159, 64, 0.2)',
                                'rgb(255, 205, 86, 0.2)',
                                'rgb(75, 192, 192, 0.2)',
                                'rgb(54, 162, 235, 0.2)',
                                'rgb(153, 102, 255, 0.2)',
                                'rgb(201, 203, 207, 0.2)',
                            ],
                            borderWidth: 4,
                        }
                    ]
                },
                options: {
                    // responsive: true,
                    scales: {
                        x: {
                            type: 'category'
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            })
            chartRef.current.chart = newChart
        }
    }, [])
  return (
    <div style={{position: 'relative', width: '50vw', height: '40vh'}}>
      <canvas ref={chartRef}/>
    </div>
  )
}

export default BarChart
