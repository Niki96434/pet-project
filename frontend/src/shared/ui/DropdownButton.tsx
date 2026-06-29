"use client"

import { Menu, Portal, Stack, useMenu } from "@chakra-ui/react"
import arrowIcon from './../../assets/arrowIcon.svg'
import styles from './DropdownButton.module.css';
import { useLogout } from "../../pages/login/api/useLogout";

interface DropdownButtonProps {
    setIsAuth: (isAuth: boolean) => void;
}

const DropdownButton = ({ setIsAuth }: DropdownButtonProps) => {
    const menu = useMenu();
    const logout = useLogout();

    const handleLogout = async () => {
        logout.mutateAsync();
        setIsAuth(false);
        localStorage.removeItem('accessToken');
    }

    return (
        <Stack gap="4" align="flex-start">
            <Menu.RootProvider value={menu}>
                <Menu.Trigger asChild>
                    <img className={styles.icon} src={arrowIcon} alt='user-menu' />
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content>
                            <Menu.Item value="account">Аккаунт</Menu.Item>
                            <Menu.Item value="config">Настройки</Menu.Item>
                            <Menu.Item onClick={handleLogout} value="logout">Выйти</Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.RootProvider>
        </Stack>
    )
}

export default DropdownButton
