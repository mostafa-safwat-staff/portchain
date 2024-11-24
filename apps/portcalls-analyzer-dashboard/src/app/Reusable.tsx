import React from 'react';
import {
    Box,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

// Define TypeScript types for props
interface RowData {
    port: string;
    count: number;
    isTop5: boolean;
}

interface ReusableTableProps {
    loading: boolean;
    data: RowData[];
    headers: string[];
}

const ReusableTable: React.FC<ReusableTableProps> = ({ loading, data, headers }) => {
    return (
        <>
            {loading ? (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <b>{headers[0]}</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>{headers[1]}</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>{headers[2]}</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow
                                    key={row.port}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.port}
                                    </TableCell>
                                    <TableCell align="right">{row.count}</TableCell>
                                    <TableCell align="right">
                                        {row.isTop5 ? (
                                            <ArrowCircleUpIcon color="success" />
                                        ) : (
                                            <ArrowCircleDownIcon color="error" />
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export default ReusableTable;
