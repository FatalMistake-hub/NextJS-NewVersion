import { set } from '@project-serum/anchor/dist/cjs/utils/features';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { postAskGpt } from 'src/utils/apis/chat.api';

const useAskGpt = () => {
    const client = useQueryClient();
    const [conversation, setConverSation] = useState<{ author: string; message: string }[]>([
        {
            author: 'botGpt',
            message:
                'Xin chào, tôi là một chatbot dựa trên GPT-3. Tôi  có thể trả lời các câu hỏi của bạn về chuyến du lịch tại website. Bạn có thể hỏi tôi bất cứ điều gì về các tour du lịch, các địa điểm du lịch, các dịch vụ du lịch, ...',
        },
    ]);
    const { mutate, isLoading, isError, isSuccess } = useMutation({
        mutationFn: (message: { message: string }) => postAskGpt(message),
        onSuccess: ({ data: { chatgpt: string } }) => {
            setConverSation((prev) => [...prev, { author: 'botGpt', message: string }]);
        },
    });

    return {
        askGpt: (message: { message: string }) => {
            if (message) {
                setConverSation((prev) => [...prev, { author: 'user', message: message.message }]);
                return mutate(message);
            }
        },
        isLoading,
        isError,
        isSuccess,
        setConverSation,
        conversation,
    };
};

export default useAskGpt;
