import React from 'react';
import { Controls } from '../Controls/Controls.tsx';
import { Grid } from '../Grid/Grid.tsx';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <Controls />
            <Grid />
        </div>
    );
};
