/* =========================================================
   OPTIMAOS CPU SCHEDULING ENGINE
   ========================================================= */


/* ---------------------------------------------------------
   CLONE PROCESSES
--------------------------------------------------------- */

function cloneProcesses(processes) {

    return processes.map(process => ({
        ...process,
        remaining: process.burst
    }));

}


/* ---------------------------------------------------------
   FCFS
--------------------------------------------------------- */

function fcfs(processes) {

    const list = cloneProcesses(processes)
        .sort((a, b) => {

            if (a.arrival !== b.arrival) {
                return a.arrival - b.arrival;
            }

            return a.pid.localeCompare(b.pid);
        });


    let time = 0;

    const gantt = [];
    const results = [];


    list.forEach(process => {

        if (time < process.arrival) {

            gantt.push({
                pid: "IDLE",
                start: time,
                end: process.arrival
            });

            time = process.arrival;
        }


        const start = time;

        time += process.burst;

        const completion = time;

        const turnaround =
            completion - process.arrival;

        const waiting =
            turnaround - process.burst;


        gantt.push({
            pid: process.pid,
            start,
            end: completion
        });


        results.push({
            ...process,
            start,
            completion,
            turnaround,
            waiting
        });

    });


    return buildResult(results, gantt);
}


/* ---------------------------------------------------------
   SJF
--------------------------------------------------------- */

function sjf(processes) {

    const list = cloneProcesses(processes);

    let time = 0;

    let completed = 0;

    const results = [];

    const gantt = [];

    const finished = new Set();


    while (completed < list.length) {

        const available = list.filter(process =>
            !finished.has(process.pid) &&
            process.arrival <= time
        );


        if (available.length === 0) {

            const next = list
                .filter(process => !finished.has(process.pid))
                .sort((a, b) => a.arrival - b.arrival)[0];


            gantt.push({
                pid: "IDLE",
                start: time,
                end: next.arrival
            });

            time = next.arrival;

            continue;
        }


        available.sort((a, b) => {

            if (a.burst !== b.burst) {
                return a.burst - b.burst;
            }

            return a.arrival - b.arrival;
        });


        const process = available[0];

        const start = time;

        time += process.burst;

        const completion = time;

        const turnaround =
            completion - process.arrival;

        const waiting =
            turnaround - process.burst;


        gantt.push({
            pid: process.pid,
            start,
            end: completion
        });


        results.push({
            ...process,
            start,
            completion,
            turnaround,
            waiting
        });


        finished.add(process.pid);

        completed++;
    }


    return buildResult(results, gantt);
}


/* ---------------------------------------------------------
   SRTF
--------------------------------------------------------- */

function srtf(processes) {

    const list = cloneProcesses(processes);

    let time = 0;

    let completed = 0;

    const gantt = [];

    const resultMap = {};

    let currentPID = null;

    let blockStart = 0;


    while (completed < list.length) {

        const available = list.filter(process =>
            process.arrival <= time &&
            process.remaining > 0
        );


        if (available.length === 0) {

            const nextArrival = Math.min(
                ...list
                    .filter(process => process.remaining > 0)
                    .map(process => process.arrival)
            );


            if (currentPID !== "IDLE") {

                if (currentPID !== null) {

                    gantt.push({
                        pid: currentPID,
                        start: blockStart,
                        end: time
                    });
                }

                blockStart = time;
                currentPID = "IDLE";
            }

            time = nextArrival;

            continue;
        }


        available.sort((a, b) => {

            if (a.remaining !== b.remaining) {
                return a.remaining - b.remaining;
            }

            return a.arrival - b.arrival;
        });


        const process = available[0];


        if (currentPID !== process.pid) {

            if (currentPID !== null) {

                gantt.push({
                    pid: currentPID,
                    start: blockStart,
                    end: time
                });
            }

            currentPID = process.pid;
            blockStart = time;
        }


        process.remaining--;

        time++;


        if (process.remaining === 0) {

            process.completion = time;

            process.turnaround =
                process.completion - process.arrival;

            process.waiting =
                process.turnaround - process.burst;

            resultMap[process.pid] = process;

            completed++;
        }
    }


    if (currentPID !== null) {

        gantt.push({
            pid: currentPID,
            start: blockStart,
            end: time
        });
    }


    return buildResult(
        Object.values(resultMap),
        mergeGantt(gantt)
    );
}


/* ---------------------------------------------------------
   ROUND ROBIN
--------------------------------------------------------- */

function roundRobin(processes, quantum) {

    const list = cloneProcesses(processes)
        .sort((a, b) => a.arrival - b.arrival);


    const queue = [];

    let time = 0;

    let index = 0;

    let completed = 0;

    const results = [];

    const gantt = [];


    while (completed < list.length) {

        while (
            index < list.length &&
            list[index].arrival <= time
        ) {

            queue.push(list[index]);

            index++;
        }


        if (queue.length === 0) {

            if (index < list.length) {

                gantt.push({
                    pid: "IDLE",
                    start: time,
                    end: list[index].arrival
                });

                time = list[index].arrival;

                continue;
            }
        }


        const process = queue.shift();

        const start = time;

        const execution =
            Math.min(
                quantum,
                process.remaining
            );

        process.remaining -= execution;

        time += execution;


        gantt.push({
            pid: process.pid,
            start,
            end: time
        });


        while (
            index < list.length &&
            list[index].arrival <= time
        ) {

            queue.push(list[index]);

            index++;
        }


        if (process.remaining > 0) {

            queue.push(process);

        } else {

            process.completion = time;

            process.turnaround =
                process.completion - process.arrival;

            process.waiting =
                process.turnaround - process.burst;

            results.push(process);

            completed++;
        }
    }


    return buildResult(results, mergeGantt(gantt));
}


/* ---------------------------------------------------------
   PRIORITY
--------------------------------------------------------- */

function priorityScheduling(processes) {

    const list = cloneProcesses(processes);

    let time = 0;

    let completed = 0;

    const results = [];

    const gantt = [];

    const finished = new Set();


    while (completed < list.length) {

        const available = list.filter(process =>
            !finished.has(process.pid) &&
            process.arrival <= time
        );


        if (available.length === 0) {

            const next = list
                .filter(process => !finished.has(process.pid))
                .sort((a, b) => a.arrival - b.arrival)[0];


            gantt.push({
                pid: "IDLE",
                start: time,
                end: next.arrival
            });

            time = next.arrival;

            continue;
        }


        available.sort((a, b) => {

            if (a.priority !== b.priority) {
                return a.priority - b.priority;
            }

            return a.arrival - b.arrival;
        });


        const process = available[0];

        const start = time;

        time += process.burst;

        process.completion = time;

        process.turnaround =
            process.completion - process.arrival;

        process.waiting =
            process.turnaround - process.burst;


        gantt.push({
            pid: process.pid,
            start,
            end: time
        });


        results.push(process);

        finished.add(process.pid);

        completed++;
    }


    return buildResult(results, gantt);
}


/* ---------------------------------------------------------
   MERGE ADJACENT GANTT BLOCKS
--------------------------------------------------------- */

function mergeGantt(gantt) {

    if (!gantt.length) {
        return [];
    }


    const merged = [gantt[0]];


    for (let i = 1; i < gantt.length; i++) {

        const current = gantt[i];

        const previous =
            merged[merged.length - 1];


        if (
            previous.pid === current.pid &&
            previous.end === current.start
        ) {

            previous.end = current.end;

        } else {

            merged.push(current);
        }
    }


    return merged;
}


/* ---------------------------------------------------------
   RESULT BUILDER
--------------------------------------------------------- */

function buildResult(results, gantt) {

    const totalWaiting =
        results.reduce(
            (sum, process) =>
                sum + process.waiting,
            0
        );


    const totalTurnaround =
        results.reduce(
            (sum, process) =>
                sum + process.turnaround,
            0
        );


    const firstTime =
        gantt.length
            ? Math.min(...gantt.map(item => item.start))
            : 0;


    const lastTime =
        gantt.length
            ? Math.max(...gantt.map(item => item.end))
            : 0;


    const totalTime =
        lastTime - firstTime;


    const busyTime =
        gantt
            .filter(item => item.pid !== "IDLE")
            .reduce(
                (sum, item) =>
                    sum + (item.end - item.start),
                0
            );


    const idleTime =
        Math.max(
            0,
            totalTime - busyTime
        );


    const cpuUtilization =
        totalTime > 0
            ? (busyTime / totalTime) * 100
            : 0;


    const throughput =
        totalTime > 0
            ? results.length / totalTime
            : 0;


    return {

        results: results.sort((a, b) =>
            a.pid.localeCompare(b.pid)
        ),

        gantt,

        avgWaiting:
            results.length
                ? totalWaiting / results.length
                : 0,

        avgTurnaround:
            results.length
                ? totalTurnaround / results.length
                : 0,

        cpuUtilization,

        throughput,

        busyTime,

        idleTime,

        totalTime

    };
}


/* ---------------------------------------------------------
   MAIN SCHEDULER
--------------------------------------------------------- */

function runScheduler(processes, algorithm, quantum) {

    if (!processes || processes.length === 0) {

        return {
            results: [],
            gantt: [],
            avgWaiting: 0,
            avgTurnaround: 0,
            cpuUtilization: 0,
            throughput: 0,
            busyTime: 0,
            idleTime: 0,
            totalTime: 0
        };
    }


    switch (algorithm) {

        case "FCFS":
            return fcfs(processes);

        case "SJF":
            return sjf(processes);

        case "SRTF":
            return srtf(processes);

        case "RR":
            return roundRobin(
                processes,
                Math.max(1, Number(quantum))
            );

        case "PRIORITY":
            return priorityScheduling(processes);

        default:
            return fcfs(processes);
    }
}