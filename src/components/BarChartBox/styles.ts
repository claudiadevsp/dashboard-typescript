import styled, { keyframes } from 'styled-components';

interface ILegendProps {
    color: string
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

export const Container = styled.div`
    width: 48%;
    min-height: 260px;
    margin: 10px 0;
    background: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    border-radius: 7px;
    display: flex;
    @media (max-width: 1200px) {
        display: flex;
        flex-direction: column;
    }
    animation: ${animate} .5s;
`;
export const SideLeft = styled.aside`
    padding: 30px 20px;
    flex: 1;
`;
export const SideRight = styled.main`
    flex: 1;
    height: 150px;
    display: flex;
    justify-content: center;
    padding-top: 35px;
    min-height: 300px;
`;
export const Description = styled.h2`
    margin-bottom: 10px;
    padding-left: 18px;
`;

export const LegendContainer = styled.ul`
    list-style: none;
    max-height: 170px;
    padding-right: 15px;
    overflow-Y: scroll;
    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.secondary};
        border-radius: 10px;
    }
    ::-webkit-scrollbar-track {
        background-color: ${props => props.theme.colors.tertiary};
    }
`;
export const Legend = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    padding-left: 16px;
`;
export const LegendTotal = styled.div<ILegendProps>`
    background: ${props => props.color};
    width: 45px;
    height: 40px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
`;
export const LegendDescription =  styled.span`
    margin-left: 5px;
`;