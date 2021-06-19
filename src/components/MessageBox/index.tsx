import React from 'react';
import {
    Container,
    HeaderTitle,
    Title,
    Image,
    DescriptionHeader,
    DescriptionFooter,
    FooterTitle
} from './styles';

interface IMessageBoxProps {
    title: string;
    description: string;
    footerText: string;
    icon: string;
}

const MessageBox: React.FC<IMessageBoxProps> = ({
    title,
    description,
    footerText,
    icon
}) => (
    <Container>
        <HeaderTitle>
            <Title>{title}
                <Image
                    src={icon}
                    alt={title}
                />
            </Title>
            <DescriptionHeader>
                {description}
            </DescriptionHeader>
        </HeaderTitle>
        <FooterTitle>
            <DescriptionFooter>
                {footerText}
            </DescriptionFooter>
        </FooterTitle>
    </Container>
);

export default MessageBox;
