/* =========================================================
   OPTIMAOS — MAIN APPLICATION
   ========================================================= */


/* =========================================================
   INITIAL PROCESSES
   ========================================================= */

let processes = [

    {
        pid: "P1",
        arrival: 0,
        burst: 5,
        priority: 2
    },

    {
        pid: "P2",
        arrival: 1,
        burst: 3,
        priority: 1
    },

    {
        pid: "P3",
        arrival: 2,
        burst: 8,
        priority: 3
    },

    {
        pid: "P4",
        arrival: 4,
        burst: 4,
        priority: 2
    }

];


let simulationRunning = false;

let simulationTimer = null;

let latestResult = null;

let currentSimulationStep = 0;


/* =========================================================
   PROCESS COLORS
   ========================================================= */

const processColors = {

    P1: "#356ae6",

    P2: "#7657d9",

    P3: "#13a88a",

    P4: "#e99b45"

};


const extraColors = [

    "#d95d67",

    "#5b8def",

    "#8b6be8",

    "#26b69a",

    "#d58b42",

    "#667085"

];


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const processTableBody =
    document.getElementById(
        "processTableBody"
    );


const algorithmSelect =
    document.getElementById(
        "algorithmSelect"
    );


const quantumInput =
    document.getElementById(
        "quantumInput"
    );


const speedInput =
    document.getElementById(
        "speedInput"
    );


const speedValue =
    document.getElementById(
        "speedValue"
    );


const runSimulationButton =
    document.getElementById(
        "runSimulation"
    );


const resetSimulationButton =
    document.getElementById(
        "resetSimulation"
    );


const addProcessButton =
    document.getElementById(
        "addProcess"
    );


const schedulerStatus =
    document.getElementById(
        "schedulerStatus"
    );


const avgWaitingElement =
    document.getElementById(
        "avgWaiting"
    );


const avgTurnaroundElement =
    document.getElementById(
        "avgTurnaround"
    );


const cpuUtilizationElement =
    document.getElementById(
        "cpuUtilization"
    );


const throughputElement =
    document.getElementById(
        "throughput"
    );


const ganttContainer =
    document.getElementById(
        "ganttContainer"
    );


/* =========================================================
   HISTORY DOM ELEMENTS
   ========================================================= */

const historyTableBody =
    document.getElementById(
        "historyTableBody"
    );


const historyEmpty =
    document.getElementById(
        "historyEmpty"
    );


const totalSimulations =
    document.getElementById(
        "totalSimulations"
    );


const algorithmsUsed =
    document.getElementById(
        "algorithmsUsed"
    );


const latestRun =
    document.getElementById(
        "latestRun"
    );


const clearHistoryButton =
    document.getElementById(
        "clearHistory"
    );


const historyModal =
    document.getElementById(
        "historyModal"
    );


const historyModalContent =
    document.getElementById(
        "historyModalContent"
    );


const closeHistoryModalButton =
    document.getElementById(
        "closeHistoryModal"
    );


const modalSimulationTitle =
    document.getElementById(
        "modalSimulationTitle"
    );


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializeApp() {

    renderProcesses();

    initializePerformanceChart();

    initializeCPUChart();

    updateSpeedLabel();

    setupEvents();

    renderSimulationHistory();

}


document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);


/* =========================================================
   EVENT SETUP
   ========================================================= */

function setupEvents() {


    /* Run */

    runSimulationButton.addEventListener(
        "click",
        startSimulation
    );


    /* Reset */

    resetSimulationButton.addEventListener(
        "click",
        resetSimulation
    );


    /* Add process */

    addProcessButton.addEventListener(
        "click",
        addProcess
    );


    /* Speed */

    speedInput.addEventListener(
        "input",
        updateSpeedLabel
    );


    /* Algorithm */

    algorithmSelect.addEventListener(
        "change",
        handleAlgorithmChange
    );


    /* History */

    clearHistoryButton.addEventListener(
        "click",
        clearHistory
    );


    closeHistoryModalButton.addEventListener(
        "click",
        closeHistoryDetails
    );


    historyModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                historyModal
            ) {

                closeHistoryDetails();

            }

        }
    );


    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Escape" &&
                historyModal.classList.contains(
                    "active"
                )
            ) {

                closeHistoryDetails();

            }

        }
    );


    /* Sidebar active state */

    document
        .querySelectorAll(
            ".nav-item"
        )
        .forEach(
            item => {

                item.addEventListener(
                    "click",
                    function() {

                        document
                            .querySelectorAll(
                                ".nav-item"
                            )
                            .forEach(
                                nav =>
                                    nav.classList.remove(
                                        "active"
                                    )
                            );


                        this.classList.add(
                            "active"
                        );

                    }
                );

            }
        );

}


/* =========================================================
   SPEED LABEL
   ========================================================= */

function updateSpeedLabel() {

    speedValue.textContent =
        `${speedInput.value} ms`;

}


/* =========================================================
   ALGORITHM CHANGE
   ========================================================= */

function handleAlgorithmChange() {

    const algorithm =
        algorithmSelect.value;


    if (algorithm === "RR") {

        quantumInput.disabled =
            false;

        quantumInput.style.opacity =
            "1";

    } else {

        quantumInput.disabled =
            true;

        quantumInput.style.opacity =
            ".5";

    }

}


/* =========================================================
   RENDER PROCESSES
   ========================================================= */

function renderProcesses() {

    processTableBody.innerHTML = "";


    processes.forEach(
        (process, index) => {

            const row =
                document.createElement(
                    "tr"
                );


            const color =
                getProcessColor(
                    process.pid,
                    index
                );


            row.innerHTML = `

                <td>

                    <span
                        class="pid-badge"
                        style="
                            background:${color}18;
                            color:${color};
                        "
                    >

                        ${process.pid}

                    </span>

                </td>


                <td>

                    <input
                        type="number"
                        min="0"
                        value="${process.arrival}"
                        data-index="${index}"
                        data-field="arrival"
                    >

                </td>


                <td>

                    <input
                        type="number"
                        min="1"
                        value="${process.burst}"
                        data-index="${index}"
                        data-field="burst"
                    >

                </td>


                <td>

                    <input
                        type="number"
                        min="1"
                        value="${process.priority}"
                        data-index="${index}"
                        data-field="priority"
                    >

                </td>


                <td>

                    <span class="status-badge">
                        Ready
                    </span>

                </td>


                <td>

                    <button
                        class="delete-process"
                        data-index="${index}"
                        title="Delete process"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            `;


            processTableBody.appendChild(
                row
            );

        }
    );


    attachProcessEvents();

}


/* =========================================================
   PROCESS EVENTS
   ========================================================= */

function attachProcessEvents() {


    document
        .querySelectorAll(
            ".process-table input"
        )
        .forEach(
            input => {

                input.addEventListener(
                    "change",
                    updateProcess
                );

            }
        );


    document
        .querySelectorAll(
            ".delete-process"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    deleteProcess
                );

            }
        );

}


/* =========================================================
   UPDATE PROCESS
   ========================================================= */

function updateProcess(event) {

    const index =
        Number(
            event.target.dataset.index
        );


    const field =
        event.target.dataset.field;


    let value =
        Number(
            event.target.value
        );


    if (field === "burst") {

        value =
            Math.max(
                1,
                value
            );

    }


    if (
        field === "arrival" ||
        field === "priority"
    ) {

        value =
            Math.max(
                0,
                value
            );

    }


    processes[index][field] =
        value;


    renderProcesses();

}


/* =========================================================
   ADD PROCESS
   ========================================================= */

function addProcess() {

    const nextNumber =
        getNextProcessNumber();


    processes.push({

        pid:
            `P${nextNumber}`,

        arrival:
            processes.length,

        burst:
            5,

        priority:
            2

    });


    renderProcesses();

}


/* =========================================================
   NEXT PROCESS NUMBER
   ========================================================= */

function getNextProcessNumber() {

    const numbers =
        processes
            .map(
                process =>
                    Number(
                        process.pid.replace(
                            "P",
                            ""
                        )
                    )
            )
            .filter(
                number =>
                    !Number.isNaN(
                        number
                    )
            );


    if (numbers.length === 0) {

        return 1;

    }


    return Math.max(
        ...numbers
    ) + 1;

}


/* =========================================================
   DELETE PROCESS
   ========================================================= */

function deleteProcess(event) {

    const index =
        Number(
            event.currentTarget.dataset.index
        );


    if (processes.length <= 1) {

        alert(
            "At least one process is required."
        );

        return;

    }


    processes.splice(
        index,
        1
    );


    renderProcesses();

}


/* =========================================================
   START SIMULATION
   ========================================================= */

function startSimulation() {


    if (simulationRunning) {

        stopSimulation();

        return;

    }


    if (processes.length === 0) {

        alert(
            "Please add at least one process."
        );

        return;

    }


    const selectedAlgorithm =
        algorithmSelect.value;


    const quantum =
        Number(
            quantumInput.value
        );


    if (
        selectedAlgorithm === "RR" &&
        (
            !quantum ||
            quantum < 1
        )
    ) {

        alert(
            "Please enter a valid time quantum."
        );

        return;

    }


    simulationRunning =
        true;


    currentSimulationStep =
        0;


    runSimulationButton.innerHTML = `

        <i class="fa-solid fa-stop"></i>

        Stop Simulation

    `;


    schedulerStatus.innerHTML = `

        <span></span>

        Running

    `;


    schedulerStatus.style.color =
        "#356ae6";


    const processSnapshot =
        processes.map(
            process => ({
                ...process
            })
        );


    latestResult =
        runScheduler(
            processSnapshot,
            selectedAlgorithm,
            quantum
        );


    updateDashboard(
        latestResult
    );


    animateGantt(
        latestResult.gantt
    );


    /* ==============================================
       SAVE COMPLETED SIMULATION TO HISTORY
       ============================================== */

    createHistoryEntry(
        selectedAlgorithm,
        quantum,
        processSnapshot,
        latestResult
    );


    renderSimulationHistory();


    startSimulationClock(
        latestResult
    );

}


/* =========================================================
   SIMULATION CLOCK
   ========================================================= */

function startSimulationClock(
    result
) {

    let step =
        0;


    const interval =
        Math.max(
            50,
            Number(
                speedInput.value
            )
        );


    simulationTimer =
        setInterval(
            () => {

                step++;


                currentSimulationStep =
                    step;


                if (
                    step >=
                    result.gantt.length
                ) {

                    finishSimulation();

                }

            },
            interval
        );

}


/* =========================================================
   FINISH SIMULATION
   ========================================================= */

function finishSimulation() {

    clearInterval(
        simulationTimer
    );


    simulationTimer =
        null;


    simulationRunning =
        false;


    runSimulationButton.innerHTML = `

        <i class="fa-solid fa-play"></i>

        Run Simulation

    `;


    schedulerStatus.innerHTML = `

        <span></span>

        Completed

    `;


    schedulerStatus.style.color =
        "#13a88a";


    renderProcesses();

}


/* =========================================================
   STOP SIMULATION
   ========================================================= */

function stopSimulation() {

    clearInterval(
        simulationTimer
    );


    simulationTimer =
        null;


    simulationRunning =
        false;


    runSimulationButton.innerHTML = `

        <i class="fa-solid fa-play"></i>

        Run Simulation

    `;


    schedulerStatus.innerHTML = `

        <span></span>

        Stopped

    `;


    schedulerStatus.style.color =
        "#d95d67";

}


/* =========================================================
   RESET
   ========================================================= */

function resetSimulation() {

    stopSimulation();


    processes = [

        {
            pid: "P1",
            arrival: 0,
            burst: 5,
            priority: 2
        },

        {
            pid: "P2",
            arrival: 1,
            burst: 3,
            priority: 1
        },

        {
            pid: "P3",
            arrival: 2,
            burst: 8,
            priority: 3
        },

        {
            pid: "P4",
            arrival: 4,
            burst: 4,
            priority: 2
        }

    ];


    algorithmSelect.value =
        "FCFS";


    quantumInput.value =
        2;


    speedInput.value =
        500;


    updateSpeedLabel();


    quantumInput.disabled =
        true;


    quantumInput.style.opacity =
        ".5";


    avgWaitingElement.textContent =
        "0.00";


    avgTurnaroundElement.textContent =
        "0.00";


    cpuUtilizationElement.textContent =
        "0%";


    throughputElement.textContent =
        "0.00";


    schedulerStatus.innerHTML = `

        <span></span>

        Ready

    `;


    schedulerStatus.style.color =
        "#13a88a";


    ganttContainer.innerHTML = `

        <div class="gantt-empty">

            <i class="fa-solid fa-chart-gantt"></i>

            <span>
                Run a simulation to visualize
                CPU execution.
            </span>

        </div>

    `;


    resetCharts();


    renderProcesses();

}


/* =========================================================
   UPDATE DASHBOARD
   ========================================================= */

function updateDashboard(
    result
) {

    avgWaitingElement.textContent =
        result.avgWaiting.toFixed(2);


    avgTurnaroundElement.textContent =
        result.avgTurnaround.toFixed(2);


    cpuUtilizationElement.textContent =
        `${result.cpuUtilization.toFixed(1)}%`;


    throughputElement.textContent =
        result.throughput.toFixed(3);


    updatePerformanceChart(
        result.results
    );


    updateCPUChart(
        result.cpuUtilization
    );

}


/* =========================================================
   GANTT ANIMATION
   ========================================================= */

function animateGantt(
    gantt
) {

    ganttContainer.innerHTML = "";


    if (
        !gantt ||
        gantt.length === 0
    ) {

        ganttContainer.innerHTML = `

            <div class="gantt-empty">

                No execution data available.

            </div>

        `;

        return;

    }


    const row =
        document.createElement(
            "div"
        );


    row.className =
        "gantt-row";


    const totalTime =
        gantt[gantt.length - 1].end;


    gantt.forEach(
        (block, index) => {

            const element =
                document.createElement(
                    "div"
                );


            const duration =
                block.end -
                block.start;


            const width =
                Math.max(
                    55,
                    (
                        duration /
                        totalTime
                    ) * 1000
                );


            element.className =
                "gantt-block";


            element.style.width =
                `${width}px`;


            const color =
                block.pid === "IDLE"
                    ? "#aeb6c3"
                    : getProcessColor(
                        block.pid,
                        index
                    );


            element.style.background =
                color;


            element.innerHTML = `

                <strong>
                    ${block.pid}
                </strong>

                <small>
                    ${block.start} → ${block.end}
                </small>

            `;


            element.style.animationDelay =
                `${index * 80}ms`;


            row.appendChild(
                element
            );

        }
    );


    ganttContainer.appendChild(
        row
    );

}


/* =========================================================
   PROCESS COLOR
   ========================================================= */

function getProcessColor(
    pid,
    index = 0
) {

    if (
        processColors[pid]
    ) {

        return processColors[pid];

    }


    return extraColors[
        index %
        extraColors.length
    ];

}


/* =========================================================
   HISTORY — RENDER
   ========================================================= */

function renderSimulationHistory() {

    const history =
        getSimulationHistory();


    historyTableBody.innerHTML =
        "";


    if (
        history.length === 0
    ) {

        historyEmpty.style.display =
            "flex";


        totalSimulations.textContent =
            "0";


        algorithmsUsed.textContent =
            "0";


        latestRun.textContent =
            "—";


        return;

    }


    historyEmpty.style.display =
        "none";


    totalSimulations.textContent =
        history.length;


    const uniqueAlgorithms =
        new Set(
            history.map(
                entry =>
                    entry.algorithm
            )
        );


    algorithmsUsed.textContent =
        uniqueAlgorithms.size;


    latestRun.textContent =
        history[0].displayTime;


    history.forEach(
        entry => {

            const row =
                document.createElement(
                    "tr"
                );


            const algorithmClass =
                getHistoryAlgorithmClass(
                    entry.algorithm
                );


            row.innerHTML = `

                <td>

                    <span class="history-id">

                        ${entry.id}

                    </span>

                </td>


                <td>

                    <span
                        class="
                            algorithm-badge
                            ${algorithmClass}
                        "
                    >

                        ${getAlgorithmShortName(
                            entry.algorithm
                        )}

                    </span>

                </td>


                <td>

                    <div class="history-date">

                        <strong>
                            ${entry.displayDate}
                        </strong>

                        <span>
                            ${entry.displayTime}
                        </span>

                    </div>

                </td>


                <td>

                    ${entry.processCount}

                </td>


                <td>

                    ${entry.metrics.avgWaiting.toFixed(2)}

                </td>


                <td>

                    ${entry.metrics.cpuUtilization.toFixed(1)}%

                </td>


                <td>

                    <span class="history-complete">

                        ${entry.status}

                    </span>

                </td>


                <td>

                    <button
                        class="history-details-button"
                        data-history-id="${entry.id}"
                        title="View simulation details"
                    >

                        <i class="fa-solid fa-eye"></i>

                    </button>

                </td>

            `;


            historyTableBody.appendChild(
                row
            );

        }
    );


    attachHistoryButtons();

}


/* =========================================================
   HISTORY BUTTONS
   ========================================================= */

function attachHistoryButtons() {

    document
        .querySelectorAll(
            ".history-details-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function() {

                        const id =
                            this.dataset.historyId;


                        showHistoryDetails(
                            id
                        );

                    }
                );

            }
        );

}


/* =========================================================
   HISTORY DETAILS
   ========================================================= */

function showHistoryDetails(
    id
) {

    const history =
        getSimulationHistory();


    const entry =
        history.find(
            item =>
                item.id === id
        );


    if (!entry) {

        return;

    }


    modalSimulationTitle.textContent =
        `${entry.id} — ${
            getAlgorithmShortName(
                entry.algorithm
            )
        }`;


    const quantumText =
        entry.quantum !== null
            ? `${entry.quantum} units`
            : "Not applicable";


    historyModalContent.innerHTML = `

        <div class="modal-metrics">


            <div class="modal-metric">

                <span>
                    Average Waiting
                </span>

                <strong>
                    ${entry.metrics.avgWaiting.toFixed(2)}
                </strong>

            </div>


            <div class="modal-metric">

                <span>
                    Average Turnaround
                </span>

                <strong>
                    ${entry.metrics.avgTurnaround.toFixed(2)}
                </strong>

            </div>


            <div class="modal-metric">

                <span>
                    CPU Utilization
                </span>

                <strong>
                    ${entry.metrics.cpuUtilization.toFixed(1)}%
                </strong>

            </div>


            <div class="modal-metric">

                <span>
                    Throughput
                </span>

                <strong>
                    ${entry.metrics.throughput.toFixed(3)}
                </strong>

            </div>


        </div>


        <div
            class="modal-metrics"
            style="
                grid-template-columns:
                    repeat(3, 1fr);
            "
        >


            <div class="modal-metric">

                <span>
                    Algorithm
                </span>

                <strong>
                    ${formatAlgorithmName(
                        entry.algorithm
                    )}
                </strong>

            </div>


            <div class="modal-metric">

                <span>
                    Processes
                </span>

                <strong>
                    ${entry.processCount}
                </strong>

            </div>


            <div class="modal-metric">

                <span>
                    Time Quantum
                </span>

                <strong>
                    ${quantumText}
                </strong>

            </div>


        </div>


        <h3 class="modal-subtitle">

            Process Outcomes

        </h3>


        <div
            style="
                overflow-x:auto;
            "
        >

            <table class="detail-table">

                <thead>

                    <tr>

                        <th>
                            PID
                        </th>

                        <th>
                            Arrival
                        </th>

                        <th>
                            Burst
                        </th>

                        <th>
                            Priority
                        </th>

                        <th>
                            Start
                        </th>

                        <th>
                            Completion
                        </th>

                        <th>
                            Waiting
                        </th>

                        <th>
                            Turnaround
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${
                        entry.results
                            .map(
                                process => `

                                    <tr>

                                        <td>
                                            <strong>
                                                ${process.pid}
                                            </strong>
                                        </td>

                                        <td>
                                            ${process.arrival}
                                        </td>

                                        <td>
                                            ${process.burst}
                                        </td>

                                        <td>
                                            ${process.priority}
                                        </td>

                                        <td>
                                            ${
                                                process.start ??
                                                "-"
                                            }
                                        </td>

                                        <td>
                                            ${
                                                process.completion ??
                                                "-"
                                            }
                                        </td>

                                        <td>
                                            ${process.waiting}
                                        </td>

                                        <td>
                                            ${process.turnaround}
                                        </td>

                                    </tr>

                                `
                            )
                            .join("")
                    }

                </tbody>

            </table>

        </div>


        <div
            style="
                margin-top:20px;
                padding:13px;
                border-radius:10px;
                background:#f8faff;
                border:1px solid #e8edf4;
                font-size:9px;
                color:#697386;
            "
        >

            <strong
                style="
                    color:#172033;
                "
            >
                Simulation recorded:
            </strong>

            ${entry.displayDate}

            at

            ${entry.displayTime}

        </div>

    `;


    historyModal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE HISTORY MODAL
   ========================================================= */

function closeHistoryDetails() {

    historyModal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   CLEAR HISTORY
   ========================================================= */

function clearHistory() {

    const history =
        getSimulationHistory();


    if (
        history.length === 0
    ) {

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to delete all simulation history?"
        );


    if (!confirmed) {

        return;

    }


    clearSimulationHistory();


    renderSimulationHistory();

}