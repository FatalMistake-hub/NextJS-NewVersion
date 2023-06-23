import { IGptChat } from 'src/types/chat.type';
import { httpGptChat } from '../instance/http';

// export const postAskGpt = async (message: { message: string }) =>
//     await httpGptChat.post<{
//         chatgpt: string;
//     }>(`/v1/chatgpt`, message);
export const postAskGpt = async (message: { message: string }) => await httpGptChat.post<IGptChat[]>(`/gpt/chat`, message);
