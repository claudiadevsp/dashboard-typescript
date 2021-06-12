import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
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

const Chart: React.FC = () => (
    <Container>
        <SideLeft>
            <Title>
                Relação
            </Title>
            <LegendContainer>
                <Legend  >
                    <LegendTotal color="#F7931B">5%</LegendTotal>
                    <LegendDescription>Entradas</LegendDescription>
                </Legend>
                <Legend>
                    <LegendTotal color="#E44C4E">95%</LegendTotal>
                    <LegendDescription>Saídas</LegendDescription>
                </Legend>
            </LegendContainer>
        </SideLeft>
        <SideRight>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={[{ amount: 30, percent: 95 }]}
                        labelLine={false}
                        dataKey="percent"
                    >
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </SideRight>
    </Container>
);

export default Chart;