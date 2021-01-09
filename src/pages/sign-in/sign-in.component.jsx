import React, {useEffect} from 'react'

import SignIn from '../../components/sign-in/sign-in.component';

import {SignInContainer, ImageContainer, SignInLogo, LoginContainer, AlignContainer} from './sign-in.styles'

import Container from "@material-ui/core/Container";
/* Icon */
import TimeControl from "../../assets/timeControl.png";

export default function SignInPage() {
    const [systemType, setSystemType] = React.useState(false);

    useEffect(() => {

        document.body.style.background = "#a7c8ff";
        // Specify how to clean up after this effect:
        return function cleanup() {
            document.body.style.backgroundImage = "none";
        };
    }, [systemType]);

    const handleChangeSystem = () => {
        setSystemType(!systemType);
    };

    return (
        <Container>
            <AlignContainer>
                <SignInContainer>
                    <LoginContainer>
                        <SignIn systemType={systemType} handleChangeSystem={handleChangeSystem}/>
                    </LoginContainer>
                    <ImageContainer>
                        <SignInLogo src={TimeControl}/>
                    </ImageContainer>
                </SignInContainer>
            </AlignContainer>
        </Container>
    );
}
