import React from 'react';
import { Container } from './styles';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

const Dashboard: React.FC = () => {
    const month = [
        { value: 'Janeiro', label: 'Janeiro' },
        { value: 'Fevereiro', label: 'Fevereiro' }
    ];
    const year = [
        { value: '2020', label: '2020' },
        { value: '2021', label: '2021' }
    ];
    return (
        <Container>
            <ContentHeader title="Dashboard"  lineColor="#F7931B">
                <SelectInput options={month} />
                <SelectInput options={year} />
            </ContentHeader>
        </Container>
    );
};

export default Dashboard;