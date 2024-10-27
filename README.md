# Real-Time Large Dataset Dashboard

## Overview

Welcome to the Real-Time Large Dataset Dashboard project! This application visualizes large datasets in an interactive and engaging way, allowing users to gain insights from their data in real time. The project is built with **Next.js** for the frontend and utilizes **Node.js**, **Express**, and **MongoDB** for the backend, alongside **Redis** and **Bull** for task queuing.

## Features

- **Real-Time Data Visualization**: Continuously updates to reflect the latest data.
- **Interactive Charts**: Users can interact with charts for detailed insights.
- **Responsive Design**: Works seamlessly on various screen sizes.
- **User-Friendly Interface**: Intuitive layout for easy navigation and data exploration.
- **Background Job Processing**: Efficiently handles data processing and updates using Redis and Bull.

## Tech Stack

- **Frontend**: 
  - [Next.js](https://nextjs.org/) - A React framework for building server-side rendered applications.
  - [Recharts](https://recharts.org/) - A composable charting library built on React components.

- **Backend**: 
  - [Node.js](https://nodejs.org/) - JavaScript runtime for building scalable server-side applications.
  - [Express](https://expressjs.com/) - Fast web framework for Node.js.
  - [MongoDB](https://www.mongodb.com/) - NoSQL database for flexible data storage.
  - [Redis](https://redis.io/) - In-memory data structure store, used for caching and task queuing.
  - [Bull](https://github.com/OptimalBits/bull) - A Redis-based queue for handling background jobs.

## Getting Started

To get started with the project, follow these steps:

### Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)
- MongoDB (local or cloud instance)
- Redis (local or cloud instance)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shreyam91/Mapup-FullStack-Assessment
   cd realtime-large-dataset-dashboard
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a `.env` file to configure your environment variables (e.g., MongoDB URI, Redis configuration).

3. Install backend dependencies:

   ```bash
   npm install
   ```

4. Start the backend server:

   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate back to the root directory and then to the frontend:

   ```bash
   cd frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

### Access the Application

Open your browser and navigate to `http://localhost:3000` to view the dashboard.

## Usage

- Once the application is running, you can explore the dashboard and interact with various visualizations.
- Modify the dataset or parameters to see real-time updates.

## Contributing

Contributions are welcome! If you’d like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes and commit them.
4. Push to your branch and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


