/* =========================================================
   OPTIMAOS CHART ENGINE
   ========================================================= */

let performanceChart = null;
let cpuChart = null;


/* ---------------------------------------------------------
   CHART DEFAULTS
--------------------------------------------------------- */

Chart.defaults.font.family = "Inter";

Chart.defaults.color = "#8993a4";


/* ---------------------------------------------------------
   PERFORMANCE CHART
--------------------------------------------------------- */

function initializePerformanceChart() {

    const canvas =
        document.getElementById("performanceChart");

    if (!canvas) return;


    performanceChart =
        new Chart(canvas, {

            type: "bar",

            data: {

                labels: [],

                datasets: [

                    {
                        label: "Waiting Time",

                        data: [],

                        backgroundColor: "#356ae6",

                        borderRadius: 6,

                        borderSkipped: false,

                        barPercentage: 0.6,

                        categoryPercentage: 0.65
                    },

                    {
                        label: "Turnaround Time",

                        data: [],

                        backgroundColor: "#7657d9",

                        borderRadius: 6,

                        borderSkipped: false,

                        barPercentage: 0.6,

                        categoryPercentage: 0.65
                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                animation: {

                    duration: 600,

                    easing: "easeOutQuart"
                },

                plugins: {

                    legend: {
                        display: false
                    },

                    tooltip: {

                        backgroundColor: "#172033",

                        padding: 12,

                        titleFont: {
                            size: 11,
                            weight: "700"
                        },

                        bodyFont: {
                            size: 10
                        },

                        cornerRadius: 8,

                        displayColors: true
                    }

                },

                scales: {

                    x: {

                        grid: {
                            display: false
                        },

                        border: {
                            display: false
                        },

                        ticks: {
                            font: {
                                size: 9
                            }
                        }

                    },

                    y: {

                        beginAtZero: true,

                        grid: {
                            color: "#eef1f5"
                        },

                        border: {
                            display: false
                        },

                        ticks: {
                            font: {
                                size: 9
                            }
                        }

                    }

                }

            }

        });
}


/* ---------------------------------------------------------
   CPU CHART
--------------------------------------------------------- */

function initializeCPUChart() {

    const canvas =
        document.getElementById("cpuChart");

    if (!canvas) return;


    cpuChart =
        new Chart(canvas, {

            type: "doughnut",

            data: {

                labels: [
                    "Busy",
                    "Idle"
                ],

                datasets: [

                    {
                        data: [0, 100],

                        backgroundColor: [
                            "#13a88a",
                            "#e7ebf1"
                        ],

                        borderWidth: 0,

                        hoverOffset: 4
                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "76%",

                animation: {

                    duration: 700
                },

                plugins: {

                    legend: {
                        display: false
                    },

                    tooltip: {

                        backgroundColor: "#172033",

                        padding: 10,

                        cornerRadius: 8,

                        callbacks: {

                            label: function(context) {

                                return (
                                    context.label +
                                    ": " +
                                    context.raw.toFixed(1) +
                                    "%"
                                );
                            }

                        }

                    }

                }

            }

        });
}


/* ---------------------------------------------------------
   UPDATE PERFORMANCE CHART
--------------------------------------------------------- */

function updatePerformanceChart(results) {

    if (!performanceChart) return;


    performanceChart.data.labels =
        results.map(process => process.pid);


    performanceChart.data.datasets[0].data =
        results.map(process => process.waiting);


    performanceChart.data.datasets[1].data =
        results.map(process => process.turnaround);


    performanceChart.update();
}


/* ---------------------------------------------------------
   UPDATE CPU CHART
--------------------------------------------------------- */

function updateCPUChart(utilization) {

    if (!cpuChart) return;


    const busy =
        Math.max(
            0,
            Math.min(100, utilization)
        );


    const idle = 100 - busy;


    cpuChart.data.datasets[0].data = [
        busy,
        idle
    ];


    cpuChart.update();
}


/* ---------------------------------------------------------
   RESET CHARTS
--------------------------------------------------------- */

function resetCharts() {

    if (performanceChart) {

        performanceChart.data.labels = [];

        performanceChart.data.datasets[0].data = [];

        performanceChart.data.datasets[1].data = [];

        performanceChart.update();
    }


    if (cpuChart) {

        cpuChart.data.datasets[0].data = [
            0,
            100
        ];

        cpuChart.update();
    }
}