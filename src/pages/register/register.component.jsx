import React, {useEffect} from 'react'
import {Link} from "react-router-dom";

/* Styles */
import {SignInContainer, SignInLogo, AlignContainer, SignInContainerInside, ButtonsBarContainer, Row, Subtitle, FormInputContainer, FormInputLabel, GroupContainer, Title} from './register.styles'

/* Material UI */
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

/* Icon */
import TimeControl from "../../assets/timeControl.png";

/* Components */
import CustomButton from "../../components/custom-button/custom-button.component";
import PopUp from "../../components/popup/popup.component";

/* Icon */
import {ReactComponent as More} from "../../assets/plus.svg";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

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
    const [children, setChildren] = React.useState(['']);

    const [popUp, setPopUp] = React.useState({
        popUp: false,
        popUpTitle: "",
        popUpText: "",
        success: 1,
        acceptable: true
    });

    const addInputButton = event => {
        event.preventDefault();
        setChildren([...children, '']);
    };

    const handleChangeChildren = (event, index) => {
        children[index] = event.target.value;
        setChildren([...children]);
    };

    const handleChangeInputRemove = (e, position) => {
        if(children.length > 1) {
            setChildren([...children.filter((children, index) => index !== position)])
        }
    }

    useEffect(() => {
        console.log(children)
        document.body.style.background = "#a7c8ff";
        // Specify how to clean up after this effect:
        return function cleanup() {
            document.body.style.backgroundImage = "none";
        };

    }, [children]);

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

    const styles = {
        largeIcon: {
            width: 60,
            height: 60,
        },
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
                        <Subtitle> Meus dados </Subtitle>
                        <form onSubmit={handleSubmit}>
                            <div >
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
                                <Subtitle> Minhas crianças </Subtitle>
                                {
                                    children.map((child, index) => (
                                        <Row key={index}>
                                            <div>
                                                <FormInput
                                                name={`name-${index}`}
                                                type='text'
                                                value={child}
                                                handleChange={(e) => handleChangeChildren(e, index)}
                                                label={`Nome da criança ${index+1}`}
                                                required
                                                />
                                            </div>
                                            <IconButton component={Button} onClick={(e) => handleChangeInputRemove(e, index)}>
                                                <Tooltip title="Deletar criança">
                                                    <DeleteIcon style={{width: 30, height: 30, fill: '#424242'}}/>
                                                </Tooltip>
                                            </IconButton>

                                        </Row>
                                    ))
                                }
                                <ButtonsBarContainer>
                                    <IconButton component={Button} onClick={addInputButton}>
                                        <Tooltip title="Adicionar criança">
                                            <More style={{width: 45, height: 45, fill: '#424242'}}/>
                                        </Tooltip>
                                    </IconButton>
                                </ButtonsBarContainer>
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
