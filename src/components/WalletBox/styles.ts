import styled, { keyframes } from 'styled-components';

interface IContainerProps {
    color: string;
}

const animate = keyframes`
    0% {
        transform: translateX(100px);
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

export const Container = styled.div<IContainerProps>`
    background: ${props => props.color};
    width: 32%;
    height: 150px;
    margin: 10px 0;
    color: ${props => props.theme.colors.white};
    border-radius: 7px;
    padding: 10px 20px;
    position: relative;
    overflow: hidden;
    animation: ${animate} .5s;

    @media (max-width: 770px) {
        width: 100%;
    }
`;

export const Title = styled.span`
    font-size: 18px;
    font-weight: 500;
    @media (max-width: 770px) {
        font-size: 14px;
    }
`;

export const FooterLabel = styled.small`
    font-size: 12px;
    position: absolute;
    bottom: 10px;
`;

export const ImageIcon = styled.img`
    position: absolute;
    height: 110%;
    top: -10px;
    right: -30px;
    opacity: 30%;
`;

export const Amount = styled.h1`
    @media (max-width: 770px) {
        word-wrap: break-word;
        font-size: 22px;
    }    
`;

export const Symbol = styled.strong`
    @media (max-width: 770px) {
        width: 100%;
    }
    &::after {
        content: ' ';
    }
`;