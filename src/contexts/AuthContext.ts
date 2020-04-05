import { createContext, Dispatch, SetStateAction } from 'react';

const AuthContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>]>(
  [false, () => {}]
);

export default AuthContext;
