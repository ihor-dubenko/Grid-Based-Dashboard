// File: src/components/Grid/Grid.tsx
import React from 'react';
import { DroppableCell } from '../DroppableCell/DroppableCell.tsx';
import { GRID_CONFIG } from '../../constants';
import { useDashboard } from '../../hooks/useDashboard.ts';
import type { Block } from '../../models';
import './Grid.css';

export const Grid: React.FC = (): React.ReactElement => {
    const { blocks } = useDashboard();

    const maxPosition: number = blocks.length > 0
        ? Math.max(...blocks.map((b: Block): number => b.position + ((b.width ?? 1) - 1))) : -1;

    const rows: number = Math.ceil((maxPosition + 2) / GRID_CONFIG.COLUMNS);
    const totalCells: number = Math.max(rows * GRID_CONFIG.COLUMNS, GRID_CONFIG.COLUMNS);

    const elements: React.ReactElement[] = [];

    for (let position = 0; position < totalCells; position++) {
        const startingBlock = blocks.find((b: Block) => b.position === position);
        if (startingBlock) {
            const span = startingBlock.width ?? 1;
            elements.push(
                <DroppableCell
                    key={position}
                    position={position}
                    block={startingBlock}
                    span={span}
                />
            );
            // skip covered cells
            position += span - 1;
            continue;
        }

        // if this position is covered by some block's span, skip rendering
        const coveringBlock = blocks.find((b: Block) => {
            const width = b.width ?? 1;
            return position > b.position && position <= b.position + width - 1;
        });
        if (coveringBlock) {
            continue;
        }

        elements.push(
            <DroppableCell
                key={position}
                position={position}
                span={1}
            />
        );
    }

    return (
        <div className="grid">
            {elements}
        </div>
    );
};
