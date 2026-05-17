import { Table } from "@chakra-ui/react"
import { type MessageType } from "../model/gapi";
import { postRequest } from "../api/openRouter";

export interface MessagesTableProps {
    messages: MessageType[];
}

export default function MessagesTable({ messages }: MessagesTableProps) {
    return (
        <div>
            <button onClick={postRequest}>Фильтрация по тестовым</button>
            <Table.Root size="sm">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Тема письма</Table.ColumnHeader>
                        <Table.ColumnHeader>Описание</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {messages.map((message) => (
                        <Table.Row key={message.messageId}>
                            <Table.Cell>{message.content}</Table.Cell>
                            <Table.Cell>{message.content}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    )
}