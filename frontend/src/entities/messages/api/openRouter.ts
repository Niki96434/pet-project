import { OpenRouter } from '@openrouter/sdk';
export async function postRequest() {

    const client = new OpenRouter({
        apiKey: import.meta.env.VITE_VITE_openRouterKey,
    });

    const completion = await client.chat.send({
        chatRequest: {
            model: "minimax/minimax-m2",
            messages: [
                {
                    role: 'user',
                    content: 'What is the meaning of life?',
                },
            ],
            stream: true
        }
    });

    console.log(completion);
}