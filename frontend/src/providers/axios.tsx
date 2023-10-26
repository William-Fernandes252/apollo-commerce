import { PropsWithChildren } from 'react';
import { AxiosInstanceContext } from '@/contexts/axios';
import axios from 'axios';

export function AxiosInstanceProvider({ children }: PropsWithChildren) {
  const axiosInstace = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  console.log(import.meta.env.MODE);

  return (
    <AxiosInstanceContext.Provider value={axiosInstace}>
      {children}
    </AxiosInstanceContext.Provider>
  );
}
