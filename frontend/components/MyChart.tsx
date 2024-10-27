
import React from 'react';
import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    BarChart,
    Bar,
} from 'recharts';

interface DataPoint {
    label: string;
    value: number;
}

interface MyChartProps {
    data: DataPoint[];
}

const MyChart: React.FC<MyChartProps> = ({ data }) => {
    return (
        <BarChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
    );
};

export default MyChart;
