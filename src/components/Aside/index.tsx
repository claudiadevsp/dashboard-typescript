import React, { useState } from 'react';
import {
    Container,
    Header,
    LogoImg,
    Title,
    MenuContainer,
    MenuItemLink,
    MenuItemButton,
    ToggleMenu,
    ThemeToggleFooter
} from './styles';
import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp,
    MdClose,
    MdMenu
} from 'react-icons/md';
import Logo from '../../assets/logo.svg'
import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';
import Toggle from '../Toggle';

const Aside: React.FC = () => {

    const { signOut } = useAuth();
    const { toggleTheme, theme } = useTheme();
    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened);
    };

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    };

    return (
        <Container menuIsOpen={toggleMenuIsOpened}>
            <Header>
                <ToggleMenu onClick={handleToggleMenu}>
                    {toggleMenuIsOpened ? <MdClose /> : <MdMenu />}
                </ToggleMenu>
                <LogoImg src={Logo} alt="Logo DashBoard" />
                <Title>DashBoard</Title>
            </Header>
            <MenuContainer>
                <MenuItemLink href="/">
                    <MdDashboard />
                    DashBoard
                </MenuItemLink>
                <MenuItemLink href="/list/entry-balance">
                    <MdArrowUpward />
                    Entradas
                </MenuItemLink>
                <MenuItemLink href="/list/exit-balance">
                    <MdArrowDownward />
                    Saídas
                </MenuItemLink>
                <MenuItemButton onClick={signOut}>
                    <MdExitToApp />
                    Sair
                </MenuItemButton>
            </MenuContainer>
            <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
                <Toggle
                    labelLeft="Dark"
                    labelRight="Light"
                    checked={darkTheme}
                    onChange={handleChangeTheme}
                />
            </ThemeToggleFooter>
        </Container>
    );
};

export default Aside;
