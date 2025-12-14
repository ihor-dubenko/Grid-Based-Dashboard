import React from 'react';
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

interface ChartDataItem {
    name: string;
    sales: number;
}

const mockData: ChartDataItem[] = [
    { name: 'Product A', sales: 400 },
    { name: 'Product B', sales: 300 },
    { name: 'Product C', sales: 600 },
    { name: 'Product D', sales: 800 },
    { name: 'Product E', sales: 500 },
];

export const BarChart: React.FC = () => {
    return (
        <div style={{ width: '100%', height: '100%', minHeight: '200px' }}>
            <RechartsBarChart width="100%" height={460} data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#82ca9d" />
            </RechartsBarChart>
        </div>
    );
};
