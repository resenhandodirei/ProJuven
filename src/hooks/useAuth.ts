import { useContext } from 'react';
import { AuthContext } from '../hooks/AuthContext';

export function useAuth() {
  return useContext(AuthContext);
}
