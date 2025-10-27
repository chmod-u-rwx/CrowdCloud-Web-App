# CrowdCloud Web Application

**CrowdCloud** is a decentralized web platform designed to democratize access to computing and storage resources.  
It enables users to **borrow or contribute compute power** in a distributed, serverless environment — supporting general-purpose workload execution and persistent data storage with built-in incentives.

This repository focuses on the **CrowdCloud Web Application**, primarily developed for **Borrowers** (users who request computational jobs).  

---

## Introduction

As global digital workloads grow—fueled by artificial intelligence, big data, and IoT devices—the demand for scalable and affordable compute resources continues to rise.  
However, current cloud models remain **centralized**, leading to high costs, vendor lock-in, and reduced transparency.  

**CrowdCloud** addresses this by introducing a **decentralized and serverless platform** where users can share idle resources, execute workloads securely, and earn incentives for contributing compute power.  

This initiative aims to **democratize access to infrastructure**, allowing even underfunded or marginalized communities to participate in cloud-scale computation.  

---

## Project Objectives

### General Objective
To develop a decentralized platform that enables users to **contribute and consume serverless compute and storage resources**, featuring intelligent workload scheduling, secure isolation, and transparent incentive mechanisms.

### Specific Objectives
1. Design and implement a distributed system that allows peer-contributed nodes to execute sandboxed compute jobs.  
2. Create a distributed blob and object storage layer with redundancy and failover capabilities.  
3. Develop an AI-based scheduler that intelligently assigns workloads based on real-time resource availability.  
4. Implement a transparent incentive model using credits or tokens.  
5. Evaluate system scalability, security, and efficiency through benchmarks and stress tests.  

---

## Scope and Limitations

### Scope
CrowdCloud focuses on the creation of a **fully decentralized platform** that:  
- Executes **sandboxed, serverless workloads** using lightweight virtualization (e.g., Firecracker/Qemu).  
- Provides **distributed blob and object storage** with replication and fault tolerance.  
- Features an **AI-powered workload scheduler** that optimizes performance and latency.  
- Includes a **borrower interface** (this web app) for managing jobs, analytics, and expenses.  
- Provides a **lender interface** (future phase) for contributors sharing resources.  

### Limitations
- GPU and TPU acceleration are **not supported** in this phase (CPU-only workloads).  
- No integration with **public blockchains** (uses local credit simulation).  
- Sandbox limited to **Qemu-based isolation**.  
- Fixed-rate incentive system for prototype evaluation.  
- Currently supports **desktop and server nodes** only — no mobile or edge optimization yet.  

---

## Web Application Overview

The **CrowdCloud Web Application** serves as the **Borrower’s Portal** — where users can register, log in, submit compute jobs, and monitor their performance and expenses.  
It provides data-driven insights through analytics and visualizations.

---

## Features

### Authentication
- **Sign Up** – Two borrower types:  
  - *Personal User* (individual contributor)  
  - *Company User* (individual under an organization)  
- **Login System** – Secure authentication connected to the backend API.

### Borrower’s Dashboard
- Overview of resource usage, job activity, and system performance.  
- Displays metrics such as:
  - Job summary  
  - Failure rate  
  - Traffic metrics  
  - Borrower expenses  

### Analytics Page
- Provides **in-depth visualization** of borrower data using charts and statistics:
  - Request job breakdown  
  - Active resource utilization  
  - Monthly cost tracking  
  - Job status distribution  
- Visualized with **pie charts**, **line charts**, **bar charts**, and **key metrics**.

### Jobs Page
- Manage and monitor job requests in real-time.  
- Organized into three main sections:
  - **Overview** – Summarized job statistics.  
  - **Create Job** – Interface for submitting compute jobs with custom resource configurations.  
  - **Job List** – Displays active and completed jobs, including CPU and RAM allocations.  

---

## Project Status

CrowdCloud Web Application is **currently in active development**.  
Core borrower-side features (authentication, dashboard, job management, and analytics) are **fully functional and connected to the backend**.

**Pending Implementation:**
- Dynamic **billing system** for borrowed compute and storage resources.  
  - Billing depends on execution time, workload complexity, and network traffic — currently under research for fair pricing.

---

## License

**Proprietary License — All Rights Reserved**  
© 2025 CrowdCloud. All rights reserved.  

This project and its source code are the intellectual property of the **chmod u+rwx**.  
Unauthorized copying, modification, distribution, or use of this software, in whole or in part, is strictly prohibited without prior written consent.  

For collaboration, research partnership, or licensing inquiries, please contact the development team directly.

---

> *CrowdCloud envisions a future where everyone contributes to — and benefits from — the global compute cloud.*