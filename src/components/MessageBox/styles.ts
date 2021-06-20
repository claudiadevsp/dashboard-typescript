import styled, { keyframes } from 'styled-components';

const animate = keyframes`
    0% {
        transform: translateX(-100px);
        opacity: 0;
    }
    50% {
        opacity: .3;
    }
    100% {
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const Container = styled.div`
    width: 48%;
    height: 260px;
    background: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    border-radius: 7px;
    margin: 10px 0;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: ${animate} .5s;
    @media (max-width: 770px) {
        width: 100%;
    }
`;

export const HeaderTitle = styled.header`
    
`;

export const Title = styled.h1`
    @media (max-width: 770px) {
        font-size: 24px;    
    }
`;

export const Image = styled.img`
    width: 35px;
    margin-left: 7px;
    @media (max-width: 770px) {
     height: 20px;
     width: 20px;   
    }
`;

export const DescriptionHeader = styled.p`
    font-size: 18px;    
`;

export const FooterTitle = styled.footer`
`;

export const DescriptionFooter = styled.span`
    @media (max-width: 770px) {
        font-size: 14px;    
    }
`;