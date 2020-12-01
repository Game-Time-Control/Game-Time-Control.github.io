import styled from "styled-components/macro";

export const StyledInput = styled.input`
    border: none;
    border: 1px solid #bdbdbd;
    font-size: 16px;
    text-align: center;
    color: #757575;
    border-radius: 3px;
    @media screen and (max-width: 650px) {
        min-width: 0;
    }
    font-family: 'Arial', sans-serif;
    &:focus {
        border: 2px solid #0c74d0;
        outline: none;
    }
`;

export const CentralizedElement = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
     padding-left: 40px;
     padding-right: 40px;
     margin: 20px;
`;

export const StyledLabel = styled.label`
    font-size: 16px;
    color: #424242;
    padding-bottom: 5px;
`;