'use client';

import styles from './page.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReusableTable from './Reusable';
import { Box, LinearProgress, Paper } from '@mui/material';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// Define types for the data structures
type PortData = {
    port: string;
    count: number;
    isTop5: boolean;
};

type PortPercentileData = {
    port: string;
    [key: string]: number | string; // Handles percentile columns dynamically
};

// Define column configuration for the DataGrid
const percentileColumns: GridColDef[] = [
    { field: 'port', headerName: 'Port' },
    { field: '5', headerName: '5th', type: 'number', sortable: true },
    { field: '20', headerName: '20th', type: 'number', sortable: true },
    { field: '50', headerName: '50th', type: 'number', sortable: true },
    { field: '75', headerName: '75th', type: 'number', sortable: true },
    { field: '90', headerName: '90th', type: 'number', sortable: true },
];

// Pagination settings
const paginationModel = { page: 0, pageSize: 5 };

export default function Index() {
    const [topPorts, setTopPorts] = useState<PortData[]>([]);
    const [bottomPorts, setBottomPorts] = useState<PortData[]>([]);
    const [percentiles, setPercentiles] = useState<PortPercentileData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/statistics');

                const { top5Ports, bottom5Ports, portDurationStatistics } = response.data;

                // Map top 5 and bottom 5 port data
                setTopPorts(
                    top5Ports.map(([port, count]: [string, number]) => ({
                        port,
                        count,
                        isTop5: true,
                    }))
                );

                setBottomPorts(
                    bottom5Ports.map(([port, count]: [string, number]) => ({
                        port,
                        count,
                        isTop5: false,
                    }))
                );

                // Set percentile data
                setPercentiles(portDurationStatistics);
            } catch (error) {
                console.error('Failed to fetch statistics:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    return (
        <div className={styles.page}>
            <div className="wrapper">
                <div className="container">
                    <div id="welcome">
                        <h1>
                            <span> Hello there, </span>
                            Welcome Portchain 👋
                        </h1>
                    </div>

                    <div id="hero" className="rounded">
                        <div className="text-container">
                            <h2>
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                    />
                                </svg>
                                <span>Port Calls Analysis</span>
                            </h2>
                            <a href="https://github.com/mostafa-safwat-staff/portchain">
                                {' '}
                                Github!{' '}
                            </a>
                        </div>
                        <div className="logo-container">
                            <img
                                src="https://media.licdn.com/dms/image/v2/C4D0BAQGv2m_gnahd0Q/company-logo_200_200/company-logo_200_200/0/1630550689524/portchain_logo?e=1740614400&v=beta&t=30-9K0LP_o9iFHcHH71qRz5UdaiiTsi6LfbrDim-0sA"
                                alt="Portchain Logo"
                                style={{ width: '192px', height: '192px' }}
                            />
                        </div>
                    </div>

                    <div id="commands" className="rounded shadow">
                        <h2>Most Visited Ports (Top 5)</h2>
                        <p></p>

                        <div>
                            <ReusableTable
                                loading={isLoading}
                                data={topPorts}
                                headers={['Port', 'Count', 'Top']}
                            />
                        </div>

                        <br />
                        <br />
                        <h2>Least Visited Ports (Bottom 5)</h2>
                        <p></p>

                        <div>
                            <ReusableTable
                                loading={isLoading}
                                data={bottomPorts}
                                headers={['Port', 'Count', 'Bottom']}
                            />
                        </div>
                    </div>

                    <div id="commands" className="rounded shadow">
                        <h2> Port Call Durations (Percentile Breakdown)</h2>
                        <p></p>
                        {isLoading ? (
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box>
                        ) : (
                            <Paper sx={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={percentiles}
                                    columns={percentileColumns}
                                    initialState={{ pagination: { paginationModel } }}
                                    pageSizeOptions={[5, 10]}
                                    getRowId={(row) => row.port}
                                    sx={{ border: 0 }}
                                />
                            </Paper>
                        )}
                    </div>

                    <p id="love">
                        Made by Moustafa Kotb
                        <svg
                            fill="currentColor"
                            stroke="none"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </p>
                </div>
            </div>
        </div>
    );
}
