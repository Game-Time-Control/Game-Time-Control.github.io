import styled from "styled-components/macro";

export const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
`;

export const CalendarContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    padding: 30px;
`;

export const ConfigContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const ContainerDeleteButton = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const PeriodContainer = styled.div`
    display: flex;
    flexDirection: row;
    draggable: false;
`;

export const PieceOfPeriod = styled.div`
    width: 20px; 
    height: 15px;
    background-color: ${props => props.isActive ? props.childColor : '#bdbdbd'};
    border: 1px solid #e0e0e0;
    draggable: false;
    user-select: none;
`;