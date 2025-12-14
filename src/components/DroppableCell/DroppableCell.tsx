// File: src/components/DroppableCell/DroppableCell.tsx
import React from 'react';
import { useDrop } from 'react-dnd';
import { DraggableBlock } from '../DraggableBlock/DraggableBlock';
import type { Block } from '../../models';
import { DRAG_TYPES } from '../../constants';
import { useDashboard } from '../../hooks/useDashboard.ts';
import './DroppableCell.css';

interface GridCellProps {
    position: number;
    block?: Block;
    span?: number;
}

export const DroppableCell: React.FC<GridCellProps> = ({ position, block, span = 1 }: GridCellProps): React.ReactElement => {
    const { moveBlock } = useDashboard();

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: DRAG_TYPES.BLOCK,
        drop: (item: { id: string }) => {
            moveBlock(item.id, position);
        },
        // only allow drop onto an empty starting cell
        canDrop: () => !block,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [block, position, moveBlock]);

    const cellClassName = `droppable-cell ${isOver && canDrop ? 'drop-target' : ''} ${!block ? 'empty' : ''}`;

    const style: React.CSSProperties = {
        gridColumn: `span ${Math.max(1, span)}`
    };

    return (
        <div
            ref={(node) => {
                drop(node);
            }}
            className={cellClassName}
            style={style}
        >
            {block ? (
                <DraggableBlock block={block} />
            ) : (
                <div className="empty-placeholder">
                    {canDrop && isOver ? 'Drop here' : ''}
                </div>
            )}
        </div>
    );
};

export default DroppableCell;
