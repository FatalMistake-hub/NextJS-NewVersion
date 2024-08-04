import { CustomOptions, httpSever } from '../instance/http';

// export const getAllCategory = async () => await httpHost.get<IAllCategory>('/categories/', {});
export const getAllCategory = async (options?:CustomOptions | undefined) => httpSever.get<any>('/categories/', options);
