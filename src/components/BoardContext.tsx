import {
  useState,
  createContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

export type OpenCardId = string | null;
export type BoardContextProps = {
  openCard?: OpenCardId;
  setOpenCard?: Dispatch<SetStateAction<OpenCardId>>;
};

type ProviderProps = {
  children: ReactNode;
};

export const BoardContext = createContext<BoardContextProps>({});

export function BoardContextProvider({ children }: ProviderProps) {
  const [openCard, setOpenCard] = useState<OpenCardId>(null);

  return (
    <BoardContext.Provider value={{ openCard, setOpenCard }}>
      {children}
    </BoardContext.Provider>
  );
}
