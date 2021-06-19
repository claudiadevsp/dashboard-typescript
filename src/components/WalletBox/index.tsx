import React from 'react';
import CountUp from 'react-countup';

import {
    Container,
    Title,
    Amount,
    FooterLabel,
    ImageIcon
} from './styles';


interface IWalletBoxProps {
    title: string;
    amount: number;
    footerLabel: string;
    icon: string;
    color: string;
}

const WalletBox: React.FC<IWalletBoxProps> = ({
    title,
    amount,
    footerLabel,
    icon,
    color
}) => (
    <Container color={color}>
        <Title>{title}</Title>
        <Amount>
            <CountUp
                end={amount}
                prefix={"R$ "}
                separator="."
                decimal=","
                decimals={2}
            />
        </Amount>
        <FooterLabel>{footerLabel}</FooterLabel>
        <ImageIcon src={icon} alt={title} />
    </Container>
);

export default WalletBox;
