import React, { useMemo, useState } from 'react';
import emojis from '../../utils/emojis';
import Toggle from '../Toggle';
import { useTheme } from '../../hooks/theme';
import {
    Container,
    Profile,
    Welcome,
    UserName
} from './styles';

const MainHeader: React.FC = () => {

    const { toggleTheme, theme } = useTheme();
    const [darkTheme, setdarkTheme] = useState(() => theme.title === 'dark' ? true : false);
    const emoji = useMemo(() => {
        const index = Math.floor(Math.random() * emojis.length);
        return emojis[index];
    }, []);
    const handleChangeTheme = () => {
        setdarkTheme(!darkTheme);
        toggleTheme();
    };
    return (
        <Container>
            <Toggle
                labelLeft="Dark"
                labelRight="Light"
                checked={darkTheme}
                onChange={handleChangeTheme}
            />
            <Profile>
                <Welcome>Olá,{emoji} </Welcome>
                <UserName>Suellen Amorim</UserName>
            </Profile>
        </Container>
    );
};

export default MainHeader;