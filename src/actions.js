export const setSelectedHarmony = (harmony) => ({
  type: 'SET_SELECTED_HARMONY',
  harmony,
});

export const setSelectedColorBlindness = (colorBlindness) => ({
  type: 'SET_SELECTED_COLOR_BLINDNESS',
  colorBlindness,
});

export const setBaseColor = (color) => ({
  type: 'SET_BASE_COLOR',
  color,
});

export const setSecondaryBaseColor = (color) => ({
  type: 'SET_SECONDARY_BASE_COLOR',
  color,
});

export const shuffleBaseColor = () => ({
  type: 'SHUFFLE_BASE_COLOR',
});

export const shuffleSecondaryBaseColor = () => ({
  type: 'SHUFFLE_SECONDARY_BASE_COLOR',
});

export const redoBaseColor = () => ({
  type: 'REDO_BASE_COLOR',
});

export const redoSecondaryBaseColor = () => ({
  type: 'REDO_SECONDARY_BASE_COLOR',
});

export const undoBaseColor = () => ({
  type: 'UNDO_BASE_COLOR',
});

export const undoSecondaryBaseColor = () => ({
  type: 'UNDO_SECONDARY_BASE_COLOR',
});
