// typescript
// File: `src/components/DraggableBlock/DraggableBlock.tsx`
import React from 'react';
import { useDrag } from 'react-dnd';
import { LineChart } from '../Widgets/LineChart/LineChart.tsx';
import { BarChart } from '../Widgets/BarChart/BarChart.tsx';
import { TextBlock } from '../Widgets/TextBlock/TextBlock.tsx';
import { useDashboard } from '../../hooks/useDashboard.ts';
import type { Block } from '../../models';
import {
    BLOCK_TYPES,
    DRAG_TYPES
} from '../../constants';
import { GRID_CONFIG } from '../../constants';
import './DraggableBlock.css';

interface DraggableBlockProps {
    block: Block;
}

type RenderBlockFunction = () => React.ReactElement | null;

export const DraggableBlock: React.FC<DraggableBlockProps> = ({ block }: DraggableBlockProps): React.ReactElement => {
    const { deleteBlock, scaleBlock, blocks } = useDashboard();

    const [{ isDragging }, drag] = useDrag(() => ({
        type: DRAG_TYPES.BLOCK,
        item: { id: block.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [block.id]);

    // compute whether we can expand / shrink
    const cols = GRID_CONFIG.COLUMNS;
    const currentWidth = block.width ?? 1;
    const rowStart = Math.floor(block.position / cols) * cols;

    const canShrink = currentWidth > 1;

    let canExpand = false;
    // check expansion by +1 only (matching scale buttons behavior)
    if (block.position + currentWidth < rowStart + cols) {
        const posToCheck = block.position + currentWidth; // the immediate right cell
        const occupied = blocks.some(b => {
            if (b.id === block.id) return false;
            const bWidth = b.width ?? 1;
            return posToCheck >= b.position && posToCheck <= b.position + bWidth - 1;
        });
        canExpand = !occupied;
    }

    const renderBlock: RenderBlockFunction = (): React.JSX.Element | null => {
        switch (block.type) {
            case BLOCK_TYPES.LINE_CHART:
                return <LineChart />;
            case BLOCK_TYPES.BAR_CHART:
                return <BarChart />;
            case BLOCK_TYPES.TEXT_BLOCK:
                return <TextBlock />;
            default:
                return null;
        }
    };

    return (
        <div
            ref={(node) => {
                drag(node);
            }}
            className={`draggable-block ${isDragging ? 'dragging' : ''}`}
        >
            <div className="block-controls-inline">
                <button
                    className={`scale-btn minus ${!canShrink ? 'disabled' : ''}`}
                    onClick={() => canShrink && scaleBlock(block.id, -1)}
                    aria-label="Shrink"
                    aria-disabled={!canShrink}
                    disabled={!canShrink}
                >
                    −
                </button>
                <button
                    className={`scale-btn plus ${!canExpand ? 'disabled' : ''}`}
                    onClick={() => canExpand && scaleBlock(block.id, 1)}
                    aria-label="Expand"
                    aria-disabled={!canExpand}
                    disabled={!canExpand}
                >
                    +
                </button>
                <button
                    className="delete-btn"
                    onClick={() => deleteBlock(block.id)}
                >
                    {String.fromCharCode(0x00D7)}
                </button>
            </div>
            {renderBlock()}
        </div>
    );
};
