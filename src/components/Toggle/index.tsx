import React from 'react';
import { 
    Container, 
    ToggleLabel,
    ToggleSelector
} from './styles';

const Toggle: React.FC = () => (
    <Container>
        <ToggleLabel>Light</ToggleLabel>
        <ToggleSelector
            onChange={() => console.log('mudou')}            
            uncheckedIcon={false}
            checkedIcon={false}
            checked
        />
        <ToggleLabel>Dark</ToggleLabel>
    </Container>
);

export default Toggle;