import styled from 'styled-components';

interface IButtonProps {
    textType: string;
};

export const Container = styled.div`

`;

export const Content = styled.div`
`;

export const Filters = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
`;

export const Button = styled.button<IButtonProps>`
    font-size: 18px;
    font-weight: 500;
    background: none;
    color: ${props => props.theme.colors.white};
    margin: 0 10px;
    transition: opacity .3s;

    &:hover {
        opacity: .7;
    }

    &::after {
        content: '';
        display: block;
        margin: 0 auto;
        width: 55px;
        border-bottom: 10px solid 
        ${ props => props.textType =='recurrent' ? props.theme.colors.warning : props.theme.colors.success};
    }
`;