"use client"
import './DropdownMenu.css';
import { IconButton, Menu, Portal, Stack, Icon } from "@chakra-ui/react";
import { useState } from "react";
import ellipsis from './../../../assets/ellipsis.svg';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from './../../tasks/api/taskApi';

interface DropdownMenuProps {
    id: number;
    handleEditModal: () => void;
}

export default function DropdownMenu({ id, handleEditModal }: DropdownMenuProps) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const mutationDelete = useMutation({
        mutationFn: async () => {
            await taskApi.deleteTask(id.toString());
            queryClient.invalidateQueries({
                queryKey: ['todos'],
            });
        }
    });

    return (
        <Stack gap="4" align="flex-end">
            <Menu.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
                <Menu.Trigger asChild>
                    <IconButton _focus={{ outline: "none" }} aria-label="task-menu" variant="plain" size="xs">
                        <Icon size='xs' asChild>
                            <img src={ellipsis} alt='task menu' />
                        </Icon>
                    </IconButton>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content>
                            <Menu.Item value="edit" onClick={handleEditModal}>Редактировать</Menu.Item>
                            <Menu.Item value="del" onClick={() => mutationDelete.mutate()}>Удалить</Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </Stack >
    )
}
