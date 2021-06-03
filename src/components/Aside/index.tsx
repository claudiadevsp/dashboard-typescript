import React from 'react';
import { 
    Container, 
    Header,
    LogoImg,
    Title,
    MenuContainer,
    MenuItemLink
} from './styles';
import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp
} from 'react-icons/md';
import Logo from '../../assets/logo.svg'

const Aside: React.FC = () => {
    return (
        <Container>
            <Header>
                <LogoImg src={Logo} alt="Logo DashBoard" />
                <Title>DashBoard</Title>
            </Header>
            <MenuContainer>
                <MenuItemLink href="/dashboard">
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
                <MenuItemLink href="#">
                <MdExitToApp />
                    Sair
                </MenuItemLink>
            </MenuContainer>
        </Container>
    );
};

export default Aside;
