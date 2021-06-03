import React, { useMemo } from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import { Container, Content, Filters, Button } from './styles';

interface IRouteParams {
    match: {
        params: {
            type: string;
        }
    }
};

const List: React.FC<IRouteParams> = ({ match }) => {

    const { type } = match.params;

    const title = useMemo(() => {
        return type === 'entry-balance' ? 'Entradas' : 'Saídas';
    }, [type]);

    const months = [
        { value: 6, label: 'Junho' },
        { value: 7, label: 'Julho' }
    ];
    const years = [
        { value: 2021, label: '2021' },
        { value: 2020, label: '2020' }
    ];
    return (
        <Container>
            <ContentHeader title={title}  lineColor="#E44C4E">
                <SelectInput options={months} />
                <SelectInput options={years} />
            </ContentHeader>
            <Filters>
                <Button textType={'recurrent'}>
                    Recorrentes
                </Button>
                <Button textType={'eventual'}>
                    Eventuais
                </Button>
            </Filters>
            <Content>
                <HistoryFinanceCard
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subTitle="24/05/2021"
                    amount="R$ 130.00"
                />
            </Content>
        </Container>
    );
};

export default List;