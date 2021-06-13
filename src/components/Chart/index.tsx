import React from 'react';
import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Cell
}
    from 'recharts';
import {
    Container,
    SideLeft,
    Legend,
    LegendTotal,
    LegendDescription,
    LegendContainer,
    SideRight,
    Title
} from './styles';

interface IChart {
    data: {
        name: string,
        value: number,
        percent: number,
        color: string
    }[]
}

const Chart: React.FC<IChart> = ({ data }) => (
    <Container>
        <SideLeft>
            <Title>
                Relação
            </Title>
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
                <PieChart>
                    <Pie
                        data={data}
                        labelLine={false}
                        dataKey="percent"
                    >
                        {
                            data.map((indicator, index) => (
                             <Cell 
                                key={index}
                                fill={indicator.color}
                             />
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </SideRight>
    </Container>
);

export default Chart;