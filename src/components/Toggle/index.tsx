import React from 'react';
import { 
    Container, 
    ToggleLabel,
    ToggleSelector
} from './styles';

interface IToggleProps {
    labelLeft: string;
    labelRight: string;
    checked: boolean;
    onChange(): void;
}

const Toggle: React.FC<IToggleProps> = ({
    labelLeft,
    labelRight,
    checked,
    onChange
}) => (
    <Container>
        <ToggleLabel>{labelRight}</ToggleLabel>
        <ToggleSelector
            onChange={onChange}            
            uncheckedIcon={false}
            checkedIcon={false}
            checked={checked}
        />
        <ToggleLabel>{labelLeft}</ToggleLabel>
    </Container>
);

export default Toggle;