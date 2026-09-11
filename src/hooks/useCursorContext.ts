import { createContext, useContext } from 'react';
import type { CursorKind } from '../types';

export interface CursorContextType {
  cursorKind: CursorKind;
  setCursor: (kind: CursorKind) => void;
}

export const CursorContext = createContext<CursorContextType>({
  cursorKind: 'default',
  setCursor: () => {},
});

export function useCursorContext() {
  return useContext(CursorContext);
}
