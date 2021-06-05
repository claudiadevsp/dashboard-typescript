import React, { useMemo, useState, useEffect } from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import { Container, Content, Filters, Button } from './styles';
import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

interface IRouteParams {
    match: {
        params: {
            type: string;
        }
    }
};

interface IData {
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {

    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
    const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));
    const { type } = match.params;

    const configs = useMemo(() => {
        return type === 'entry-balance' ?
            {
                title: 'Entradas',
                lineColor: '#F7931B',
                listData: gains
            }
            :
            {
                title: 'Saídas',
                lineColor: '#E44C4E',
                listData: expenses
            }
    }, [type]);


    useEffect(() => {
        const filteredData = configs.listData.filter((item) => {
            const date = new Date(item.date);
            const month = String((date.getMonth() + 1));
            const year = String(date.getFullYear());

            return month === monthSelected && year === yearSelected;
        });

        const formattedData = filteredData.map((item) => {
            return {
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: (item.frequency === 'recorrente') ? '#E44C4E' : '#4E41F0'
            }
        });
        setData(formattedData);
    }, [configs.listData, monthSelected, yearSelected]);
    

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: (index+1),
                label: month
            }
        });        
    }, []);

    const years = useMemo(() => {
        let uniqueYears: number[] = [];
        configs.listData.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        });
        return uniqueYears.map((year) => {
            return {
                value: year,
                label: year
            }
        });
    }, [configs.listData]);

    return (
        <Container>
            <ContentHeader
                title={configs.title}
                lineColor={configs.lineColor}
            >
                <SelectInput
                    options={months}
                    onChange={(e) => setMonthSelected(e.target.value)}
                    defaultValue={monthSelected}
                />
                <SelectInput
                    options={years}
                    onChange={(e) => setYearSelected(e.target.value)}
                    defaultValue={yearSelected}
                />
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
                {data.map((item, index) => (
                    <HistoryFinanceCard
                        tagColor={item.tagColor}
                        title={item.description}
                        subTitle={item.dateFormatted}
                        amount={item.amountFormatted}
                        key={index}
                    />
                ))}
            </Content>
        </Container>
    );
};

export default List;