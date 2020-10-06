export const getBaseColor = (state) =>
  state.color.baseColors[state.color.baseColorIndex];
export const getSecondaryBaseColor = (state) =>
  state.color.secondaryBaseColors[state.color.secondaryBaseColorIndex];

export const getSelectedHarmony = (state) => state.color.selectedHarmony;
export const getSelectedColorBlindness = (state) =>
  state.color.selectedColorBlindness;

export const canUndoBaseColor = (state) => state.color.baseColorIndex > 0;
export const canUndoSecondaryBaseColor = (state) =>
  state.color.secondaryBaseColorIndex > 0;

export const canRedoBaseColor = (state) =>
  state.color.baseColorIndex < state.color.baseColors.length - 1;
export const canRedoSecondaryBaseColor = (state) =>
  state.color.secondaryBaseColorIndex <
  state.color.secondaryBaseColors.length - 1;
