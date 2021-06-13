import React from 'react';
import formatCurrency from '../../utils/formatCurrency';
import {
    Container,
    Title,
    ChartContainer,
    Header,
    LegendContainer,
    Legend,
    LegendTotal,
    LegendDescription
} from './styles';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip
} from 'recharts';

interface IHistoryBoxProps {
    data: {
        month: string;
        amountEntry: number;
        amountOutPut: number;
    }[],
    lineColorAmountEntry: string;
    lineColorAmountOutPut: string;
};

const HistoryBox: React.FC<IHistoryBoxProps> = ({
    data,
    lineColorAmountEntry,
    lineColorAmountOutPut
}) => (
    <Container>
        <Header>
            <Title>Histórico de saldo</Title>
            <LegendContainer>
                <Legend>
                    <LegendTotal color={lineColorAmountEntry} />
                    <LegendDescription>Entradas</LegendDescription>
                </Legend>
                <Legend>
                    <LegendTotal color={lineColorAmountOutPut} />
                    <LegendDescription>Saídas</LegendDescription>
                </Legend>
            </LegendContainer>
        </Header>
        <ChartContainer>
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
                    <XAxis dataKey="month" stroke="#cecece" />
                    <Tooltip formatter={(value: number) => formatCurrency(Number(value))}/>
                    <Line
                        type="monotone"
                        dataKey="amountEntry"
                        name="Entradas"
                        stroke={lineColorAmountEntry}
                        strokeWidth={5}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="amountOutPut"
                        name="Saídas"
                        stroke={lineColorAmountOutPut}
                        strokeWidth={5}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    </Container>
);

export default HistoryBox;
