import styled from 'styled-components';

export const SignInContainer = styled.div`
    width: 1000px;
    height: 35vw;
    border-radius: 10px;
    background-color: white;
    display: flex;
    min-height: 520px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    border-radius: 4px;
    overflow: hidden;
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
    padding-top: 15vh;
`;

export const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #363232;
    width: 50%;
    @media screen and (max-width: 700px){
        display: hidden;
        width: 0;
        height: 0;
    }
`;

export const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50%;
    background-color: white;
    @media screen and (max-width: 700px){
        width: 100%;
    }
`;

export const SignInLogo = styled.img`
    width: 380px;
    height: 280px;
    min-width: 120px;
    min-height: 80px;
    @media screen and (max-width: 1000px) {
        width: 270px;
        height: 210px;
    }
    @media screen and (max-width:  700px){
        display: none;
    }
`;

