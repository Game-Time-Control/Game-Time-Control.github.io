import React, {useEffect} from 'react'
import {Link} from "react-router-dom";

/* Styles */
import {SignInContainer, SignInLogo, AlignContainer, SignInContainerInside, ButtonsBarContainer, FormInputContainer, FormInputLabel, GroupContainer, Title} from './register.styles'

/* Material UI */
import Container from "@material-ui/core/Container";

/* Icon */
import TimeControl from "../../assets/timeControl.png";

/* Components */
import CustomButton from "../../components/custom-button/custom-button.component";
import PopUp from "../../components/popup/popup.component";

function FormInput({ handleChange, label, ...otherProps }) {
    return (
        <GroupContainer>
            <FormInputContainer onChange={handleChange} {...otherProps} />
            {label ? (
                <FormInputLabel className={otherProps.value.length ? 'shrink' : ''}>
                    {label}
                </FormInputLabel>
            ) : null}
        </GroupContainer>
    );
}

export default function RegisterPage() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');

    const [popUp, setPopUp] = React.useState({
        popUp: false,
        popUpTitle: "",
        popUpText: "",
        success: 1,
        acceptable: true
    });


    useEffect(() => {
        document.body.style.background = "#a7c8ff";
        // Specify how to clean up after this effect:
        return function cleanup() {
            document.body.style.backgroundImage = "none";
        };
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();
        // try {
        // let user = await login(email, password);

        // if(user.error) {
        //     setPopupTitle('Erro');
        //     if(user.message === "This user is deactivated")
        //         setPopupText('Não é possível acessar o sistema com este usuário, ele está desativado.');
        //     else
        //         setPopupText('Verifique seu email e senha');
        //     setPopup(true);
        //     setSuccess(1);
        // } else if (user.token) {
        //     setAuthData({
        //         token: user.token,
        //         user: user.data.data,
        //         system: props.systemType
        //     });
        //
        //     if(props.systemType)
        //         history.replace('/ipa');
        //     else
        //         history.replace('/dashboard');
        //     }
        //
        // } catch (error) {
        //     console.log(error);
        // }
    };

    const handleChange = event => {
        const {value, name} = event.target;
        if (name === 'password')
            setPassword(value);
        else if(name === 'email')
            setEmail(value);
        else if (name === 'repeatPassword')
            setRepeatPassword(value);
         else
            setName(value);
    };

    return (
        <Container>
            <AlignContainer>
                <SignInContainer>
                    <SignInContainerInside>
                        <SignInLogo src={TimeControl}/>
                        <Title> Novo cadastro </Title>

                        <form onSubmit={handleSubmit}>
                            <div style={{width: '250px'}}>
                                <FormInput
                                    name='name'
                                    type='text'
                                    handleChange={handleChange}
                                    value={name}
                                    label='Nome'
                                    required
                                />
                                <FormInput
                                    name='email'
                                    type='email'
                                    handleChange={handleChange}
                                    value={email}
                                    label='Email'
                                    required
                                />
                                <FormInput
                                    name='password'
                                    type='password'
                                    value={password}
                                    handleChange={handleChange}
                                    label='Senha'
                                    required
                                    autocomplete="new-password"
                                />
                                <FormInput
                                    name='repeatPassword'
                                    type='password'
                                    value={repeatPassword}
                                    handleChange={handleChange}
                                    label='Repita a senha'
                                    required
                                    autocomplete="new-password"
                                />
                                <ButtonsBarContainer>
                                    <CustomButton type='submit' addButton> Cadastrar </CustomButton>
                                </ButtonsBarContainer>
                                <ButtonsBarContainer>
                                    <Link to="/login" style={{textDecoration: 'none', color: '#0277bd'}}>Já tem cadastro?</Link>
                                </ButtonsBarContainer>
                            </div>
                        </form>
                        {/*{ popup ?*/}
                        {/*    <PopUp title={popupTitle} string={popupText} success={success}/> : null}*/}
                    </SignInContainerInside>
                </SignInContainer>
            </AlignContainer>
        </Container>
    );
}
