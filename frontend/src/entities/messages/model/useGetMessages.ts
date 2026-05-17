import { useGoogleLogin } from '@react-oauth/google';
import { toaster } from "../../../shared/lib/ui/toaster";
import { googleAPI } from "../../../entities/messages/model/gapi";
import { useState } from 'react';
import { type MessageType } from '../../../entities/messages/model/gapi';

export const useGetMessages = () => {
    const [isOpenLogin, setOpenLogin] = useState<boolean>(true);
    const [msgs, setMsgs] = useState<MessageType[]>([{
        messageId: '',
        content: ''
    }]);
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setOpenLogin(false);
            const messages = await googleAPI(tokenResponse.access_token);
            toaster.create({
                title: 'Вход в google-аккаунт прошел успешно.',
                type: 'success'
            });
            setMsgs(messages as MessageType[]);
            return messages
        },
        onError: () => {
            toaster.create({
                title: 'Ошибка входа в google-аккаунт.',
                type: 'error'
            });
        },
        scope: 'https://www.googleapis.com/auth/gmail.readonly'
    });

    return { isOpenLogin, login, msgs }
}
