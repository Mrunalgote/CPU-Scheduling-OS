/* =========================================================
   OPTIMAOS — SIMULATION HISTORY ENGINE
   ========================================================= */

const HISTORY_STORAGE_KEY =
    "optimaOS_simulation_history";


/* =========================================================
   GET HISTORY
   ========================================================= */

function getSimulationHistory() {

    const storedHistory =
        localStorage.getItem(
            HISTORY_STORAGE_KEY
        );


    if (!storedHistory) {

        return [];

    }


    try {

        const parsed =
            JSON.parse(
                storedHistory
            );


        return Array.isArray(parsed)
            ? parsed
            : [];


    } catch (error) {

        console.error(
            "Unable to read simulation history:",
            error
        );


        return [];

    }

}


/* =========================================================
   SAVE HISTORY
   ========================================================= */

function saveSimulationHistory(
    history
) {

    try {

        localStorage.setItem(
            HISTORY_STORAGE_KEY,
            JSON.stringify(history)
        );

    } catch (error) {

        console.error(
            "Unable to save simulation history:",
            error
        );

    }

}


/* =========================================================
   CREATE HISTORY ENTRY
   ========================================================= */

function createHistoryEntry(
    algorithm,
    quantum,
    processList,
    result
) {

    const history =
        getSimulationHistory();


    const now =
        new Date();


    const simulationNumber =
        history.length + 1;


    const entry = {

        id:
            `SIM-${String(
                simulationNumber
            ).padStart(4, "0")}`,

        timestamp:
            now.toISOString(),

        displayDate:
            now.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            ),

        displayTime:
            now.toLocaleTimeString(
                "en-IN",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            ),

        algorithm,

        quantum:
            algorithm === "RR"
                ? Number(quantum)
                : null,

        processCount:
            processList.length,

        processes:
            processList.map(
                process => ({
                    pid: process.pid,
                    arrival: process.arrival,
                    burst: process.burst,
                    priority: process.priority
                })
            ),

        results:
            result.results.map(
                process => ({
                    pid: process.pid,
                    arrival: process.arrival,
                    burst: process.burst,
                    priority: process.priority,
                    start: process.start,
                    completion: process.completion,
                    turnaround: process.turnaround,
                    waiting: process.waiting
                })
            ),

        gantt:
            result.gantt.map(
                block => ({
                    pid: block.pid,
                    start: block.start,
                    end: block.end
                })
            ),

        metrics: {

            avgWaiting:
                Number(
                    result.avgWaiting.toFixed(2)
                ),

            avgTurnaround:
                Number(
                    result.avgTurnaround.toFixed(2)
                ),

            cpuUtilization:
                Number(
                    result.cpuUtilization.toFixed(2)
                ),

            throughput:
                Number(
                    result.throughput.toFixed(3)
                ),

            busyTime:
                result.busyTime,

            idleTime:
                result.idleTime,

            totalTime:
                result.totalTime

        },

        status:
            "Completed"

    };


    history.unshift(entry);


    saveSimulationHistory(
        history
    );


    return entry;

}


/* =========================================================
   CLEAR HISTORY
   ========================================================= */

function clearSimulationHistory() {

    localStorage.removeItem(
        HISTORY_STORAGE_KEY
    );

}


/* =========================================================
   ALGORITHM NAME
   ========================================================= */

function formatAlgorithmName(
    algorithm
) {

    const names = {

        FCFS:
            "First Come First Serve",

        SJF:
            "Shortest Job First",

        SRTF:
            "Shortest Remaining Time First",

        RR:
            "Round Robin",

        PRIORITY:
            "Priority Scheduling"

    };


    return (
        names[algorithm] ||
        algorithm
    );

}


/* =========================================================
   SHORT ALGORITHM NAME
   ========================================================= */

function getAlgorithmShortName(
    algorithm
) {

    const names = {

        FCFS:
            "FCFS",

        SJF:
            "SJF",

        SRTF:
            "SRTF",

        RR:
            "Round Robin",

        PRIORITY:
            "Priority"

    };


    return (
        names[algorithm] ||
        algorithm
    );

}


/* =========================================================
   HISTORY COLOR
   ========================================================= */

function getHistoryAlgorithmClass(
    algorithm
) {

    const classes = {

        FCFS:
            "history-blue",

        SJF:
            "history-purple",

        SRTF:
            "history-teal",

        RR:
            "history-orange",

        PRIORITY:
            "history-red"

    };


    return (
        classes[algorithm] ||
        "history-blue"
    );

}