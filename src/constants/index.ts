export const BLOCK_TYPES = {
    LINE_CHART: 'line-chart',
    BAR_CHART: 'bar-chart',
    TEXT_BLOCK: 'text-block'
} as const;

export const DRAG_TYPES = {
    BLOCK: 'BLOCK'
} as const;

export const CSS_CLASSES = {
    BLOCK_CONTROLS_BUTTON: 'block-controls__button',
    BLOCK_CONTROLS_BUTTON_LINE: 'block-controls__button--line',
    BLOCK_CONTROLS_BUTTON_BAR: 'block-controls__button--bar',
    BLOCK_CONTROLS_BUTTON_TEXT: 'block-controls__button--text'
} as const;

export const GRID_CONFIG = {
    COLUMNS: 3,
} as const;

export const ERROR_MESSAGES = {
    USE_DASHBOARD_OUTSIDE_PROVIDER: 'useDashboard must be used within a DashboardProvider'
} as const;
