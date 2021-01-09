import styled, { css } from 'styled-components';

const subColor = '#bdbdbd';
const mainColor = 'black';

const shrinkLabelStyles = css`
  top: -18px;
  font-size: 12px;
  color: ${mainColor};
`;

export const GroupContainer = styled.div`
  position: relative;

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;

export const FormInputContainer = styled.input`
    max-width: 500px;
    background-color: white;
    color: ${subColor};
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 93%;
    height: 23px;
    border-radius: 5px;
    border: 1px solid ${subColor};
    margin: 25px 0;
   
    
    &:focus {
        border: 3px solid #448aff;
        outline: none;
    }
    
    &:focus ~ label {
        ${shrinkLabelStyles}
    }
`;

export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  &.shrink {
    ${shrinkLabelStyles}
  }
`;

export const SignInContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 600px) {
        padding: 30px;
    }
    @media screen and (max-width: 400px) {
        padding-left: 15px;
        padding-right: 15px;
    }
`;

export const ButtonsBarContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 5px;
`;

export const SignInLogo = styled.img`
    width: 8vw;
    height: 6vw;
    min-width: 120px;
    min-height: 80px;
    align-self: center;
    display: none;
    @media screen and (max-width: 700px) {
        display: none;
    }
    
`;

export const Title = styled.h2`
  font-size: 30px;
  text-align: center;
  color: #424242;
  margin-bottom: 1vw;
  font-weight: normal;
`;
