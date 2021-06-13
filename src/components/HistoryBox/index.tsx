import React from 'react';
import { Container, Title } from './styles';
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
        <Title>Histórico de saldo</Title>
        <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
                <XAxis dataKey="month" stroke="#cecece" />
                <Tooltip />
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

    </Container>
);

export default HistoryBox;
