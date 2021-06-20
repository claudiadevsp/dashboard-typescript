import styled, { keyframes } from 'styled-components';

interface ILegendProps {
    color: string
}

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
    width: 100%;
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    margin: 10px 0;
    padding: 30px 20px;
    border-radius: 7px;
    animation: ${animate} .5s;

`;
export const Title = styled.h2`
    margin-bottom: 20px;
    padding-left: 18px;   
`;

export const ChartContainer = styled.div`
    height: 260px;
    flex: 1;
`;

export const LegendContainer = styled.ul`
    list-style: none;
    display: flex;
    padding-right: 22px;
`;

export const Legend = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    margin-left: 20px;
`;

export const Header = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 1280px) {
     flex-direction: column;
    }
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

export const LegendDescription = styled.span`
    margin-left: 5px;
`;

