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
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [selectedFrequency, setSelectedFrequency] = useState<string[]>([]);
    const [activedRecurrent, setActivedRecurrent] = useState<boolean>(true);
    const [activedEventual, setActivedEventual] = useState<boolean>(true);    
    const { type  } = match.params;

    const configs = useMemo(() => {
        return type === 'entry-balance' ?
            {
                title: 'Entradas',
                lineColor: '#4e41F0',
                listData: gains
            }
            :
            {
                title: 'Saídas',
                lineColor: '#E44C4E',
                listData: expenses
            }
    }, [type]);

    const handleFrequencyClick = (frequency: string) => {
        if (frequency === 'recorrente') {
            setActivedRecurrent(true);
            setActivedEventual(false);            
        } else {
            setActivedRecurrent(false);
            setActivedEventual(true);
        }
        
        setSelectedFrequency([frequency]);
    };

    useEffect(() => {
        const { listData } = configs;
        const filteredData = listData.filter((item) => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            
            if (selectedFrequency.length === 0) {
                return month === monthSelected && year === yearSelected;
            }
            return month === monthSelected && year === yearSelected && item.frequency === selectedFrequency[0];
        });

        const formattedData = filteredData.map((item) => {
            return {
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: (item.frequency === 'recorrente') ? '#4E41F0' : '#E44C4E'
            }
        });
        setData(formattedData);
    }, [configs, monthSelected, yearSelected, selectedFrequency]);
    

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
        const { listData } = configs;
        listData.forEach(item => {
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
    }, [configs]);
    
    const resetConfigs = () => {
        setSelectedFrequency([]);
        setActivedRecurrent(true);
        setActivedEventual(true);
    };

    return (
        <Container>
            <ContentHeader
                title={configs.title}
                onClick={() => resetConfigs()}
                lineColor={configs.lineColor}
            >
                <SelectInput
                    options={months}
                    onChange={(e) => setMonthSelected(Number(e.target.value))}
                    defaultValue={monthSelected}
                />
                <SelectInput
                    options={years}
                    onChange={(e) => setYearSelected(Number(e.target.value))}
                    defaultValue={yearSelected}
                />
            </ContentHeader>
            <Filters>
                <Button 
                    textType={'recurrent'}
                    onClick={() => handleFrequencyClick('recorrente')}
                    actived={activedRecurrent}
                >
                    Recorrentes
                </Button>
                <Button 
                    textType={'eventual'}
                    onClick={() => handleFrequencyClick('eventual')}
                    actived={activedEventual}
                >
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