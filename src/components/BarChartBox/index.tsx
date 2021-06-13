import React from 'react';
import formatCurrency from '../../utils/formatCurrency';
import {
    Container,
    SideLeft,
    SideRight,
    Description,
    LegendContainer,
    Legend,
    LegendTotal,
    LegendDescription
} from './styles';

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    Tooltip
} from 'recharts';


interface IBarChartProps {
    title: string;
    data: {
        name: string;
        amount: number;
        percent: number;
        color: string;
    }[]
};

const BarChartBox: React.FC<IBarChartProps> = ({ title, data }) => {
    return (
        <Container>
            <SideLeft>
                <Description>
                    {title}
                </Description>
                <LegendContainer>
                    {data.map((indicator, index) => (
                        <Legend key={index}>
                            <LegendTotal color={indicator.color}>
                                {indicator.percent}%
                            </LegendTotal>
                            <LegendDescription>{indicator.name}</LegendDescription>
                        </Legend>
                    ))}
                </LegendContainer>
            </SideLeft>
            <SideRight>
                <ResponsiveContainer>
                    <BarChart data={data} >
                        <Bar dataKey="amount" name="Valor">
                            {data.map((indicator, index) => (
                                <Cell
                                    key={index}
                                    cursor="pointer"
                                    fill={indicator.color}
                                />
                            ))}
                        </Bar>
                        <Tooltip
                            cursor={{ fill: 'none' }}
                            formatter={(value: number) => formatCurrency(Number(value))}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </SideRight>
        </Container>
    );
}

export default BarChartBox;
