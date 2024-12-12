# Air Quality Monitoring Website Setup Guide

This guide provides step-by-step instructions for setting up the Air Quality Monitoring Website project. Follow the steps below to install all required tools and dependencies, and to configure the project on your local machine.

## System Requirements

### For Windows:
- Windows 10 or later
- Minimum 4GB RAM (8GB recommended)
- 10GB of free disk space
- Stable internet connection

### For Mac:
- macOS Catalina (10.15) or later
- Minimum 4GB RAM (8GB recommended)
- 10GB of free disk space
- Stable internet connection

## Prerequisites

### Visual Studio Code
1. Download and install [Visual Studio Code](https://code.visualstudio.com/).
2. Install the following recommended extensions:
   - ESLint
   - Prettier - Code Formatter
   - Material Icon Theme

### Node.js
1. Download and install the LTS version of [Node.js](https://nodejs.org/).
2. Verify the installation:
   ```bash
   node -v
   npm -v
   ```

### Git
1. Ensure Git is installed on your system. Verify with:
   ```bash
   git --version
   ```

### InfluxDB
1. Download and install [InfluxDB](https://www.influxdata.com/).
2. Start the InfluxDB service and access its UI at `http://localhost:8086`.

## Cloning the Project

1. Open a terminal and run the following command to clone the repository:
   ```bash
   git clone https://github.com/CharlieBoye8/air-quality-site
   ```
2. Navigate to the project directory:
   ```bash
   cd air-quality-site
   ```

## Installing Dependencies

1. Install main project dependencies:
   ```bash
   npm install
   ```
2. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Navigate to the frontend directory and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

## Setting Up Environment Variables

1. Create a `.env` file in the root directory of the project.
2. Add the required variables. Example:
   ```env
   REACT_APP_API_URL=http://localhost:8080
   INFLUXDB_TOKEN=your-token
   ```

## Creating a Bucket in InfluxDB

1. Open the InfluxDB UI at `http://localhost:8086`.
2. Navigate to `Data > Buckets`.
3. Click `Create Bucket` and provide a name for the bucket.
4. Set retention policies as needed.

## Running the Project

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
2. Start the frontend server:
   ```bash
   cd ../frontend
   npm start
   ```

## You’re All Set!
