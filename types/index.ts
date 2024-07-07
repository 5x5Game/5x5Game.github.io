export type GridSize = 'easy' | 'normal' | 'hard';
export enum CellCount {
  easy = 4,
  normal = 5,
  hard = 6,
}
export interface GridCell {
  index: number;
  value: number;
}