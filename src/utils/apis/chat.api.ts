import { httpGptChat } from '../instance/http';

export const postAskGpt = async (message: { message: string }) =>
    await httpGptChat.post<{
        chatgpt: string;
    }>(`/v1/chatgpt`, message);
