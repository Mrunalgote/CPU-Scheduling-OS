OptimaOS — CPU Scheduling Lab

A professional, interactive CPU scheduling simulator for visualizing
Operating System scheduling algorithms through simulations, Gantt
charts, performance metrics, and execution history.

Overview

OptimaOS — CPU Scheduling Lab is a browser-based Operating Systems
project that provides an interactive environment for studying and
experimenting with CPU scheduling algorithms.

Users can create processes, configure scheduling parameters, run
simulations, visualize execution order, and analyze CPU scheduling
performance through meaningful metrics.

The application combines core Operating Systems concepts with a modern,
responsive frontend interface designed for academic learning and
practical demonstration.

Key Features

Five scheduling algorithms: FCFS, SJF, SRTF, Round Robin, and
Priority Scheduling.

Interactive process management: add, remove, and configure
processes with arrival time, burst time, and priority.

Round Robin configuration: adjustable time quantum.

Interactive Gantt chart: visualizes process execution order and
CPU idle periods.

Performance analytics: waiting time, turnaround time, response
time, CPU utilization, throughput, and execution time.

Dashboard KPIs: summarizes simulation results at a glance.

Charts and visualizations: performance and CPU utilization
analysis powered by Chart.js.

Simulation history: stores completed simulations locally using
browser localStorage.

Responsive interface: designed for desktop, laptop, tablet, and
mobile screens.

Static deployment: can be hosted without a backend or database.

Supported Algorithms

Algorithm

Scheduling Type

Preemptive

Core Principle

FCFS

Non-preemptive

No

Executes processes in arrival order

SJF

Non-preemptive

No

Selects the shortest burst-time process

SRTF

Preemptive

Yes

Selects the process with the shortest remaining time

Round Robin

Preemptive

Yes

Shares CPU time using a fixed quantum

Priority Scheduling

Priority-based

Implementation-dependent

Selects processes according to priority

Performance Metrics

Turnaround Time

Turnaround Time = Completion Time − Arrival Time

Waiting Time

Waiting Time = Turnaround Time − Burst Time

Response Time

Response Time = First Start Time − Arrival Time

CPU Utilization

CPU Utilization = (CPU Busy Time / Total Simulation Time) × 100

Throughput

Throughput = Number of Completed Processes / Total Simulation Time

Technology Stack

Frontend

HTML5

CSS3

Vanilla JavaScript

Chart.js

Font Awesome

Google Fonts

Development

Visual Studio Code

Live Server

Git

GitHub

Deployment

Render Static Site

No backend server or database is required for the current version.

Project Structure

CPU-Scheduling-OS/
│
├── assets/
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── charts.js
│   ├── history.js
│   └── scheduler.js
│
├── index.html
└── README.md

Module Responsibilities

index.html
Contains the main application structure, navigation, dashboard,
controls, process manager, analytics, and visualization containers.

css/style.css
Defines the visual system, layout, typography, cards, buttons,
animations, responsive behavior, and dashboard styling.

js/scheduler.js
Implements the scheduling algorithms, Gantt timeline generation, and
scheduling metric calculations.

js/charts.js
Creates performance and CPU-utilization charts using Chart.js.

js/history.js
Manages simulation history and browser-based persistence through
localStorage.

js/app.js
Coordinates user interactions, process management, simulations, charts,
Gantt visualization, metrics, controls, and history.

Application Workflow

Create Processes
       ↓
Configure Arrival / Burst / Priority
       ↓
Select Scheduling Algorithm
       ↓
Configure Quantum if Required
       ↓
Run Simulation
       ↓
Generate Execution Timeline
       ↓
Display Gantt Chart
       ↓
Calculate Performance Metrics
       ↓
Render Analytics
       ↓
Save Simulation History

Getting Started

Prerequisites

Only a modern web browser is required.

For development, the following are recommended:

Visual Studio Code

Live Server extension

Git

Run Locally

Clone or download the repository.

Open the project folder in Visual Studio Code.

Open index.html.

Launch the project with Live Server.

Use the dashboard to create processes and run simulations.

Because the application is client-side, no Node.js backend or database
setup is required.

Deployment

OptimaOS can be deployed as a static website because the application
runs entirely in the browser.

Render Configuration

Service Type: Static Site
Branch: main
Root Directory: .
Build Command: none
Publish Directory: .

Connect the GitHub repository to Render and enable automatic deployment
if desired. New commits pushed to the deployment branch can then trigger
a new deployment.

Design Goals

OptimaOS was designed to:

Make CPU scheduling easier to understand visually.

Provide an interactive alternative to manual scheduling calculations.

Present scheduling metrics clearly.

Demonstrate practical implementation of Operating Systems concepts.

Combine algorithmic logic with modern frontend development.

Remain lightweight and easy to deploy.

Provide a professional interface suitable for an academic project
portfolio.

Educational Purpose

This project is intended for educational and academic use, particularly
for learning:

Operating Systems

CPU Scheduling

Process Management

Preemptive and non-preemptive scheduling

Scheduling algorithms

Performance analysis

Algorithm visualization

Frontend development

It can be used as a learning aid, classroom demonstration, or semester
project.

Future Enhancements

Potential future improvements include:

CSV process import

Additional scheduling algorithms

Side-by-side algorithm comparison

Exportable simulation reports

PDF report generation

Dark mode

Multi-core CPU scheduling

Advanced process-state visualization

Cloud-based history

User accounts and server-side persistence

More advanced analytics and reporting

Project Status

Status: Active Academic Project

The current version focuses on single-CPU scheduling simulation and
interactive browser-based visualization.

Author

Mrunal Gote

Project: OptimaOS — CPU Scheduling Lab

A semester project combining Operating Systems concepts, scheduling
algorithms, data visualization, and modern frontend development.

Acknowledgements

This project uses:

Chart.js for data visualization

Font Awesome for interface icons

Google Fonts for typography

GitHub for source-code hosting

Render for static deployment

License

This project is intended primarily for educational and academic
purposes.

If the project is reused or redistributed, please retain the original
author attribution and project documentation.

Project at a Glance

OptimaOS
│
├── Process Management
│   ├── Add Process
│   ├── Remove Process
│   └── Configure Parameters
│
├── Scheduling Engine
│   ├── FCFS
│   ├── SJF
│   ├── SRTF
│   ├── Round Robin
│   └── Priority Scheduling
│
├── Visualization
│   ├── Gantt Chart
│   ├── Performance Chart
│   └── CPU Utilization
│
├── Analytics
│   ├── Waiting Time
│   ├── Turnaround Time
│   ├── Response Time
│   ├── Throughput
│   └── CPU Utilization
│
└── History
    └── Local Simulation Records

Final Note

OptimaOS brings classical CPU scheduling algorithms into an interactive
visual environment. It demonstrates how Operating Systems concepts can
be implemented, simulated, measured, and presented through a modern web
application.
