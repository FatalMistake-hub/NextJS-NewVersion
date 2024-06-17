import { httpSever } from '../instance/http';

// export const getAllCategory = async () => await httpHost.get<IAllCategory>('/categories/', {});
export const getAllCategory = async () => httpSever.get<any>('/categories/');
