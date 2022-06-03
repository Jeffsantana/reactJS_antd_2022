import React, { createContext, useContext, useCallback, useState } from 'react';
import PokaYokeContainer from '../components/PokaYokeContainer';

interface PokaYokeContextData {
  pokaYoke(data: PokaYokeData): void;
  closePokaYoke(): void;
}

export interface PokaYokeData {
  title: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  callback(): Promise<void> | void;
}

const PokeYokeContext = createContext<PokaYokeContextData>(
  {} as PokaYokeContextData,
);

const PokaYokeProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<PokaYokeData>({} as PokaYokeData);

  const pokaYoke = useCallback(
    ({
      title,
      callback,
      confirmButtonText,
      cancelButtonText,
    }: PokaYokeData) => {
      setData({ title, confirmButtonText, cancelButtonText, callback });
      setOpen(true);
    },
    [],
  );

  const closePokaYoke = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <PokeYokeContext.Provider value={{ pokaYoke, closePokaYoke }}>
      {children}
      <PokaYokeContainer open={open} data={data} />
    </PokeYokeContext.Provider>
  );
};

function usePokaYoke(): PokaYokeContextData {
  const context = useContext(PokeYokeContext);

  if (!context) {
    throw new Error('usePokaYoke must be used within a PokaYokeProvider');
  }
  return context;
}

export { usePokaYoke, PokaYokeProvider };
