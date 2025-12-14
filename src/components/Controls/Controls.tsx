import React from 'react';
import type {
    AddBlockFunction,
    BlockType
} from '../../models';
import { useDashboard } from '../../hooks/useDashboard.ts';
import {
    BLOCK_TYPES,
    CSS_CLASSES
} from '../../constants';
import './Controls.css';

export const Controls: React.FC = (): React.ReactElement => {
    const { addBlock } = useDashboard();

    const handleAddBlock: AddBlockFunction = (type: BlockType): void => {
        addBlock(type);
    };

    return (
        <div className="block-controls">
            <button
                className={`${CSS_CLASSES.BLOCK_CONTROLS_BUTTON} ${CSS_CLASSES.BLOCK_CONTROLS_BUTTON_LINE}`}
                onClick={(): void => handleAddBlock(BLOCK_TYPES.LINE_CHART)}
            >
                Add Line Chart
            </button>
            <button
                className={`${CSS_CLASSES.BLOCK_CONTROLS_BUTTON} ${CSS_CLASSES.BLOCK_CONTROLS_BUTTON_BAR}`}
                onClick={(): void => handleAddBlock(BLOCK_TYPES.BAR_CHART)}
            >
                Add Bar Chart
            </button>
            <button
                className={`${CSS_CLASSES.BLOCK_CONTROLS_BUTTON} ${CSS_CLASSES.BLOCK_CONTROLS_BUTTON_TEXT}`}
                onClick={(): void => handleAddBlock(BLOCK_TYPES.TEXT_BLOCK)}
            >
                Add Text Block
            </button>
        </div>
    );
};
