import { useContext } from 'react';
import { ERROR_MESSAGES } from '../constants';
import { DashboardContext } from '../context/dashboard.ts';
import type { DashboardContextType } from '../models';

type UseDashboardHook = () => DashboardContextType;

export const useDashboard: UseDashboardHook = (): DashboardContextType => {
    const context: DashboardContextType | undefined = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error(ERROR_MESSAGES.USE_DASHBOARD_OUTSIDE_PROVIDER);
    }
    return context;
};
