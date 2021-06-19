import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.colors.primary};
`;


export const Logo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
`;

export const Description = styled.h2`
    color: ${props => props.theme.colors.white};
    margin-left: 7px;
`;

export const Image = styled.img`
    width: 20px;
    height: 20px;
`;

export const FormTitle = styled.h1`
    color: ${props => props.theme.colors.white};
    margin-bottom: 20px;
    &::after {
        content: '';
        display: block;        
        width: 55px;
        border-bottom: 10px solid  ${props => props.theme.colors.warning};
    }
`;

export const Form = styled.form`
    width: 300px;
    height: 300px;
    padding: 30px;
    border-radius: 10px;
    background: ${props => props.theme.colors.tertiary};
`;

