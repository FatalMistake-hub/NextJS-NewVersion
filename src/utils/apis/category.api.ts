import { IAllCategory } from 'src/types/category.type';
import { http, httpHost } from '../instance/http';

export const getAllCategory = async () => await httpHost.get<IAllCategory>('/categories/', {});
