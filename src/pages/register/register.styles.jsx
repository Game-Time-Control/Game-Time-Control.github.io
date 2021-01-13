import styled, { css }  from 'styled-components/macro';

export const SignInContainer = styled.div`
    min-width: 500px;
    height: 100%;
    border-radius: 10px;
    background-color: white;
    display: flex;
    min-height: 520px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    border-radius: 4px;
    padding: 20px;
    display: flex;
    justify-content: center;
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    @media screen and (max-width: 1000px) {
        width: 80vh;
    }
    @media screen and (max-width: 700px) {
        width: 450px;
    }
    @media screen and (max-width: 500px) {
        width: 350px;
    }
    @media screen and (max-width: 330px) {
        width: 290px;
    }
`;

export const AlignContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    flex-direction: column;
    padding-top: 3vh;
    padding-bottom: 3vh;
`;

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

export const ContainerInput = styled.div`
  padding-bottom: 2px;
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
    margin: 12px 0;
   
    
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

export const SignInContainerInside = styled.div`
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
    margin: 20px;
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

export const Subtitle = styled.h3`
  text-align: center;
  color: #424242;
  margin-bottom: 1vw;
  font-weight: normal;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

