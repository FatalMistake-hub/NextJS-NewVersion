import { DataContext } from '../context/store';
import { useContext } from 'react';

export const useDataContext = () => useContext(DataContext);
