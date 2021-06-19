import React from 'react';
import {
    Container,
    Header,
    LogoImg,
    Title,
    MenuContainer,
    MenuItemLink,
    MenuItemButton
} from './styles';
import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp
} from 'react-icons/md';
import Logo from '../../assets/logo.svg'
import { useAuth } from '../../hooks/auth';

const Aside: React.FC = () => {
    const { signOut } = useAuth();
    return (
        <Container>
            <Header>
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
        </Container>
    );
};

export default Aside;
