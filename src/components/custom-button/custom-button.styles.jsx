import styled, { css } from 'styled-components';

const buttonStyles = css`
    background-color: #424242;
    color: white;
    border: 1px solid #969FAA;
    border-radius: 10px;
    text-transform: none;
    width: 50px;
    
    &:hover {
        background-color: #404040;
        border: none;
    }
`;

const addButtonStyles = css`
    width: 185px;
    background-color: #77b5fe;
    color: rgba(0, 0, 0, 0.87);
    border: 1.5px solid #1976d2;
    border-radius: 4px;
    text-transform: uppercase;
    text-align: center;
    font-size: 0.875rem;
    box-sizing: border-box;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 600;
    line-height: 1.75;
    border-radius: 4px;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    
    &:hover {
        background-color: #abcdff;
        border: none;
    }
`;

const deleteButtonStyles = css`
    width: 140px;
    background-color: #f16669;
    color: rgba(0, 0, 0, 0.87);
    border: 1.5px solid #d32f2f;
    border-radius: 4px;
    
    text-transform: uppercase;
    text-align: center;
    font-size: 0.875rem;
    box-sizing: border-box;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 600;
    line-height: 1.75;
    border-radius: 4px;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    
    &:hover {
        background-color: #fd9c98;
        border: none;
    }
`;

const getButtonStyles = props => {

    if (props.addButton) {
        return addButtonStyles;
    } else if (props.deleteButton) {
        return deleteButtonStyles;
    } else {
        return buttonStyles;
    }

};

export const CustomButtonContainer = styled.button`
    min-width: 110px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 12px 0 12px;
    font-size: 15px;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed', sans-serif;
    font-weight: bolder;
    cursor: pointer;
    outline:none;
    margin: 10px 0;
    
    ${getButtonStyles}
`;
