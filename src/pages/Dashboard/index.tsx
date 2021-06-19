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
import BarChartBox from '../../components/BarChartBox';
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
import opsImg from '../../assets/ops.svg';

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
        } else if (totalGains === 0 && totalExpenses === 0) {
            return {
                title: 'Ops!',
                description: 'Neste mês, não há registros de entradas ou saidas',
                footerText: 'Parece que você não fez nenhum registro no mês e ano selecionado',
                icon: opsImg
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

    }, [totalBalance, totalGains, totalExpenses]);

    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses;
        const percentGains = Number(((totalGains / total) * 100).toFixed(1));
        const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));
        const data = [
            {
                name: 'Entradas',
                value: totalGains,
                percent: percentGains ? percentGains : 0,
                color: '#F7931B'
            },
            {
                name: 'Saídas',
                value: totalExpenses,
                percent: percentExpenses ? percentExpenses : 0,
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
                month: listOfMonths[month].substr(0, 3),
                amountEntry,
                amountOutPut
            }
        })
            .filter((item => {
                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();
                return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear);

            }));
    }, [yearSelected]);

    const relationExpensevesRecurrentVersusEventual = useMemo(() => {

        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses.filter((expense) => {
            const date = new Date(expense.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            return month === monthSelected && year === yearSelected;
        })
            .forEach((expense) => {
                if (expense.frequency === 'recorrente') {
                    return amountRecurrent += Number(expense.amount);
                }
                if (expense.frequency === 'eventual') {
                    return amountEventual += Number(expense.amount);
                }
            });

        const total = amountRecurrent + amountEventual;
        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E"
            }
        ];
    }, [monthSelected, yearSelected]);

    const relationGainsRecurrentVersusEventual = useMemo(() => {

        let amountRecurrent = 0;
        let amountEventual = 0;

        gains.filter((gain) => {
            const date = new Date(gain.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            return month === monthSelected && year === yearSelected;
        })
            .forEach((gain) => {
                if (gain.frequency === 'recorrente') {
                    return amountRecurrent += Number(gain.amount);
                }
                if (gain.frequency === 'eventual') {
                    return amountEventual += Number(gain.amount);
                }
            });

        const total = amountRecurrent + amountEventual;
        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));
        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E"
            }
        ];
    }, [monthSelected, yearSelected]);
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
                <Chart data={relationExpensesVersusGains} />
                <HistoryBox
                    lineColorAmountEntry={"#F7931B"}
                    lineColorAmountOutPut={"#E44C4E"}
                    data={historyData}
                />
                <BarChartBox
                    data={relationExpensevesRecurrentVersusEventual}
                    title="Saídas"
                />
                <BarChartBox
                    data={relationGainsRecurrentVersusEventual}
                    title="Entradas"
                />
            </Content>
        </Container>
    );
};

export default Dashboard;