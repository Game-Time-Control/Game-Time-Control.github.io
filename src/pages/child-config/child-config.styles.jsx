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
`;

export const Spacer = styled.div`
    padding-bottom: 35px;
    @media only screen and (max-width: 1000px) {
      padding-bottom: 10px;
    }
`;

export const BoxContainer = styled.div`
    display: flex;
    justify-content: center;
    min-width: ${props => props.minWidth ? props.minWidth : 'auto'};
`;

export const ActionsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    padding: 25px;
`;

export const Division = styled.div`
    width: 28px;
    height: 22px;
    background-color: #e0e0e0;
`;

export const DivisionSpotlightLabel = styled.div`
    background-color: #e0e0e0;
    text-align: center;
    border-radius: 2px;
`;

export const ConfigContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const ContainerDeleteButton = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const PeriodContainer = styled.div`
    display: flex;
    flexDirection: row;
    draggable: false;
    padding-left: 50px;
`;

export const PieceOfPeriod = styled.div`
    width: 28px; 
    height: 20px;
    background-color: ${props => props.isActive ? props.childColor : '#bababa'};
    border: 1px solid #e0e0e0;
    draggable: false;
    user-select: none;
`;