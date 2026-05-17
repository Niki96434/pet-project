import axios from 'axios';

export interface MessageId {
    id: string;
    threadId: string;
}
export interface MessageType {
    messageId: string;
    content: string;
}

export const googleAPI = async (accessToken: string) => {
    try {
        const response = await axios.get('https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=100', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },

        });
        const allIdMessages = response.data.messages.map((message: MessageId) => message.id);
        const messages = allIdMessages.map(async (id: string) => {
            const res = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=full`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            return { messageId: res.data.id, content: res.data.snippet }
        });
        const allMessages = await Promise.all(messages);
        return allMessages
    } catch (err) {
        console.log(err)
    }
}