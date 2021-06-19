import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
    Container,
    Logo,
    Image,
    Description,
    Form,
    FormTitle
} from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Signin: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { signIn } = useAuth();
    return (
        <Container>
            <Logo>
                <Image src={logoImg} />
                <Description>
                    Minha Carteira
                </Description>
            </Logo>
            <Form onSubmit={(e) => signIn(email, password)}>
                <FormTitle>
                    Entrar
                </FormTitle>
                <Input
                    type="email"
                    placeholder="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="senha"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit">Acessar</Button>
            </Form>
        </Container>
    );
};

export default Signin;
