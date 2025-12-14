import { BLOCK_TYPES } from '../constants';

export type BlockType = typeof BLOCK_TYPES[keyof typeof BLOCK_TYPES];

export interface Block {
    id: string;
    type: BlockType;
    position: number;
    width?: number;
}

export type AddBlockFunction = (type: BlockType) => void;
export type DeleteBlockFunction = (id: string) => void;
export type MoveBlockFunction = (id: string, newPosition: number) => void;
export type ScaleBlockFunction = (id: string, delta: number) => void;

export interface DashboardContextType {
    blocks: Block[];
    addBlock: (type: BlockType) => void;
    deleteBlock: (id: string) => void;
    moveBlock: (id: string, newPosition: number) => void;
    scaleBlock: (id: string, delta: number) => void;
}
