// TypeScript
// src/context/DashboardContext.tsx
import React, {
    useState,
    type ReactNode
} from 'react';
import type {
    AddBlockFunction,
    Block,
    BlockType,
    DashboardContextType,
    ScaleBlockFunction,
    MoveBlockFunction,
    DeleteBlockFunction
} from '../models';
import { DashboardContext } from './dashboard';
import { GRID_CONFIG } from '../constants';

interface DashboardProviderProps {
    children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = (
    { children }: DashboardProviderProps
): React.ReactElement => {
    const [blocks, setBlocks] = useState<Block[]>([]);

    const addBlock: AddBlockFunction = (type: BlockType): void => {
        setBlocks((prevBlocks: Block[]): Block[] => {
            // build set of all occupied positions including spans
            const engagedPositions = new Set<number>();
            prevBlocks.forEach((block: Block) => {
                const w = block.width ?? 1;
                for (let p = block.position; p <= block.position + w - 1; p++) {
                    engagedPositions.add(p);
                }
            });

            let firstEmptyPosition = 0;
            while (engagedPositions.has(firstEmptyPosition)) {
                firstEmptyPosition++;
            }

            const newBlock: Block = {
                id: crypto.randomUUID(),
                type,
                position: firstEmptyPosition,
                width: 1,
            };

            return [...prevBlocks, newBlock];
        });
    };

    const deleteBlock: DeleteBlockFunction = (id: string): void => {
        setBlocks((prevBlocks: Block[]): Block[] => prevBlocks.filter((block: Block): boolean => block.id !== id));
    };

    const moveBlock: MoveBlockFunction = (id: string, newPosition: number) => {
        setBlocks((prevBlocks: Block[]): Block[] => {
            const blocksCopy = [...prevBlocks];
            const idx = blocksCopy.findIndex(b => b.id === id);
            if (idx === -1) return prevBlocks;
            const block = blocksCopy[idx];
            const cols = GRID_CONFIG.COLUMNS;
            const rowStart = Math.floor(newPosition / cols) * cols;
            // ensure block fits in the same row
            if (newPosition + (block.width ?? 1) - 1 >= rowStart + cols) return prevBlocks;
            // ensure no overlap with other blocks
            for (let p = newPosition; p <= newPosition + (block.width ?? 1) - 1; p++) {
                const occupied = blocksCopy.some(b => {
                    if (b.id === id) return false;
                    const bWidth = b.width ?? 1;
                    return p >= b.position && p <= b.position + bWidth - 1;
                });
                if (occupied) return prevBlocks;
            }
            blocksCopy[idx] = { ...block, position: newPosition };
            return blocksCopy;
        });
    };

    const scaleBlock: ScaleBlockFunction = (id: string, delta: number) => {
        setBlocks((prevBlocks: Block[]): Block[] => {
            const blocksCopy = [...prevBlocks];
            const idx = blocksCopy.findIndex(b => b.id === id);
            if (idx === -1) return prevBlocks;
            const block = blocksCopy[idx];
            const cols = GRID_CONFIG.COLUMNS;
            const rowStart = Math.floor(block.position / cols) * cols;
            const currentWidth = block.width ?? 1;
            const newWidth = Math.min(Math.max(currentWidth + delta, 1), cols);

            if (newWidth === currentWidth) return prevBlocks;

            if (newWidth > currentWidth) {
                // check right-side cells are free and still in same row
                if (block.position + newWidth - 1 >= rowStart + cols) return prevBlocks;
                for (let p = block.position + currentWidth; p <= block.position + newWidth - 1; p++) {
                    const occupied = blocksCopy.some(b => {
                        if (b.id === id) return false;
                        const bWidth = b.width ?? 1;
                        return p >= b.position && p <= b.position + bWidth - 1;
                    });
                    if (occupied) return prevBlocks;
                }
            }
            // shrinking always allowed (min 1)
            blocksCopy[idx] = { ...block, width: newWidth };
            return blocksCopy;
        });
    };

    const value: DashboardContextType = {
        blocks,
        addBlock,
        deleteBlock,
        moveBlock,
        scaleBlock,
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};
