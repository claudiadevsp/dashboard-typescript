import styled, { css } from 'styled-components';

interface IContainerProps {
    menuIsOpen: boolean;
}

interface IThemeFooterProps {
    menuIsOpen: boolean;
}

export const Container = styled.div<IContainerProps>`
    grid-area: AS;
    padding-left: 20px;
    border-right: 1px solid ${props => props.theme.colors.gray};
    background-color: ${props => props.theme.colors.secondary};
    position: relative;
    
    
    @media(max-width: 600px) {
        padding-left: 7px;
        position: fixed;
        z-index: 2;
        height: ${props => props.menuIsOpen ? '100vh' : '70px'};
        overflow: hidden;
        width: 170px;

        ${props => !props.menuIsOpen && css`
            border: none;
            border-bottom: 1px solid ${props => props.theme.colors.gray};
        `};
    }
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    height: 70px;
`;

export const LogoImg = styled.img`
    height: 40px;
    width: 40px;
    @media (max-width: 600px) {
        display: none;
    } 
`;

export const Title = styled.h3`
    color: ${props => props.theme.colors.white};
    margin-left: 10px;
    @media(max-width: 600px) {
        display: none;
    }
`;

export const MenuContainer = styled.nav`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`;

export const MenuItemLink = styled.a`
    color: ${props => props.theme.colors.info};
    text-decoration: none;
    transition: opacity .3s;
    margin: 7px 0;
    &:hover {
        opacity: .7;
    }
    display: flex;
    align-items: center;
    > svg {
       font-size: 18px;
       margin-right: 5px;     
    }
`;

export const MenuItemButton = styled.button`
    font-size: 16px;
    color: ${props => props.theme.colors.info};
    transition: opacity .3s;
    border: none;
    background: none;
    margin: 7px 0;
    &:hover {
        opacity: .7;
    }
    display: flex;
    align-items: center;
    > svg {
       font-size: 18px;
       margin-right: 5px;     
    }
`;

export const ToggleMenu = styled.button`
    height: 40px;
    width: 40px;
    border-radius: 5px;
    font-size: 22px;
    background: ${props => props.theme.colors.warning};
    transition: opacity .3s;
    &:hover {
        opacity: 0.7;
    }
    
    justify-content: center;
    align-items: center;
    display: none;

    @media (max-width: 600px) {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
`;

export const ThemeToggleFooter = styled.footer<IThemeFooterProps>`
  display: none;
  position: absolute;
  bottom: 30px;
  @media (max-width: 600px) {
    display: ${props => props.menuIsOpen ? 'flex' : 'none'};
  } 
`;
