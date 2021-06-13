import React, { useState, useMemo } from 'react';
import {
    Container,
    Content
} from './styles';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import HistoryBox from '../../components/HistoryBox';
import Chart from '../../components/Chart';
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months';
import dolarImg from '../../assets/dolar.svg';
import arrowUpImg from '../../assets/up-arrow.svg';
import arrowDownImg from '../../assets/down-arrow.svg';
import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';

const Dashboard: React.FC = () => {

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: (index + 1),
                label: month
            }
        });
    }, []);

    const years = useMemo(() => {
        let uniqueYears: number[] = [];
        [...expenses, ...gains].forEach(item => {
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
    }, []);

    const totalExpenses = useMemo(() => {

        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected) {
                total += Number(item.amount)
            }
        })

        return total;

    }, [monthSelected, yearSelected]);


    const totalGains = useMemo(() => {

        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected) {
                total += Number(item.amount)
            }
        })

        return total;

    }, [monthSelected, yearSelected]);

    const totalBalance = useMemo(() => {
        const total = totalGains - totalExpenses;
        return total;
    }, [totalGains, totalExpenses]);

    const message = useMemo(() => {

        if (totalBalance > 0) {
            return {
                title: 'Muito bem!',
                description: 'Sua carteira está positiva!',
                footerText: 'Continue assim. Considere investir seu saldo.',
                icon: happyImg
            }
        } else if (totalBalance === 0) {
            return {
                title: 'Por pouco!',
                description: 'Neste mês, você gastou exatamente o que ganhou.',
                footerText: 'Fique atento. No próximo mês tente poupar seu dinheiro.',
                icon: grinningImg
            }
        } else {
            return {
                title: 'Que triste!',
                description: 'Nesse mês você gastou mais do que deveria.',
                footerText: 'Verifique seus gastos e tente cortar alguns custos.',
                icon: sadImg
            }
        }

    }, [totalBalance]);

    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses;
        const percentGains = (totalGains / total) * 100;
        const percentExpenses = (totalExpenses / total) * 100;
        const data = [
            {
                name: 'Entradas',
                value: totalGains,
                percent: Number(percentGains.toFixed(1)),
                color: '#F7931B'
            },
            {
                name: 'Saídas',
                value: totalExpenses,
                percent: Number(percentExpenses.toFixed(1)),
                color: '#E44C4E'
            }
        ];
        return data;
    }, [totalGains, totalExpenses]);

    const historyData = useMemo(() => {
        return listOfMonths.map((_, month) => {
            let amountEntry = 0;
            gains.forEach((gain) => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if (gainMonth === month && gainYear === yearSelected) {
                    amountEntry += Number(gain.amount);
                }
            });
            let amountOutPut = 0;
            expenses.forEach((expense) => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if (expenseMonth === month && expenseYear === yearSelected) {
                    amountOutPut += Number(expense.amount);
                }
            });

            return {
                monthNumber: month,
                month: listOfMonths[month].substr(0,3),
                amountEntry,
                amountOutPut
            }
        });
    }, [yearSelected]);
    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B" onClick={() => { }}>
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
            <Content>
                <WalletBox
                    title="saldo"
                    amount={totalBalance}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon={dolarImg}
                    color="#322b9c"
                />
                <WalletBox
                    title="entradas"
                    amount={totalGains}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon={arrowUpImg}
                    color="#F7931B"
                />
                <WalletBox
                    title="saídas"
                    amount={totalExpenses}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon={arrowDownImg}
                    color="#E44C4E"
                />
                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />
                <Chart data={relationExpensesVersusGains}/>
                <HistoryBox 
                    lineColorAmountEntry={"#F7931B"} 
                    lineColorAmountOutPut={"#E44C4E"}
                    data={historyData}
                />
            </Content>
        </Container>
    );
};

export default Dashboard;