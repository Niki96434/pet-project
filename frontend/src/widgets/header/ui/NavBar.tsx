"use client"
import './NavBar.css';
import menuIcon from './../../../assets/menu.svg';
import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react"
import { useState } from "react"
import { Link } from 'react-router';

export function NavBar() {
    const [open, setOpen] = useState(false);
    return (
        <nav className='nav-bar'>
            <Drawer.Root placement={'start'} open={open} onOpenChange={(e) => setOpen(e.open)}>
                <Drawer.Trigger asChild>
                    <Button variant="plain" size="xs">
                        <img className='burger-button' src={menuIcon} />
                    </Button>
                </Drawer.Trigger>
                <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.Header>
                                <Drawer.Title>Menu</Drawer.Title>
                            </Drawer.Header>
                            <Drawer.Body>
                                <ul>
                                    <li>
                                        <Link to='/'>Analytics</Link>
                                    </li>
                                    <li>
                                        <Link to='/todos'>Todos</Link>
                                    </li>
                                </ul>
                            </Drawer.Body>
                            <Drawer.CloseTrigger asChild>
                                <CloseButton size="xs" />
                            </Drawer.CloseTrigger>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>
        </nav>
    )
}
