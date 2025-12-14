import React, { createContext } from 'react';
import type { DashboardContextType } from '../models';

export const DashboardContext: React.Context<DashboardContextType | undefined> =
    createContext<DashboardContextType | undefined>(undefined);
