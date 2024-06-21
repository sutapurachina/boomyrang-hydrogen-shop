import { useState, createContext, type Dispatch, type SetStateAction } from 'react';

type AttitudeObj = {
  value: number;
  isoCode: string;
}
interface IAttitudeContext {
    attitude: AttitudeObj;
    setAttitude: Dispatch<SetStateAction<AttitudeObj>>
}

const AttitudeContext = createContext<IAttitudeContext>({
  attitude: {
    value: 1,
    isoCode: 'USD',
  },
  setAttitude: () => {}, 
});

export const AttitudeProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [attitude, setAttitude] = useState({
    value: 1,
    isoCode: 'USD',
  });

  return (
    <AttitudeContext.Provider value={{ attitude, setAttitude }}>
        {children}
    </AttitudeContext.Provider>
  );
};

export default AttitudeContext;