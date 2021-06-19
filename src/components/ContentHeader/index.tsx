import React from 'react';
import {
    Container,
    TitleContainer,
    Controllers
} from './styles';

interface IContentHeaderProps {
    title: string;
    lineColor: string;
    children: React.ReactNode;
    onClick(event: React.MouseEvent<HTMLDivElement>): void | undefined;

}

const ContentHeader: React.FC<IContentHeaderProps> = ({
    title, lineColor, children, onClick
}) => (
    <Container onClick={onClick}>
        <TitleContainer lineColor={lineColor}>
            <h1>{title}</h1>
        </TitleContainer>
        <Controllers>
            {children}
        </Controllers>
    </Container>
);

export default ContentHeader;