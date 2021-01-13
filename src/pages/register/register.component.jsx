import React, {useEffect} from 'react'
import {Link} from "react-router-dom";

/* Styles */
import {ContainerInput, SignInContainer, SignInLogo, AlignContainer, SignInContainerInside, ButtonsBarContainer, Row, Subtitle, FormInputContainer, FormInputLabel, GroupContainer, Title} from './register.styles'

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
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

/* Api */
import {register} from "../../api/ApiParent";

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
        if(children.length <= 1) {
            setPopUp({
                popUp: true,
                popUpTitle: "Erro",
                popUpText: `Pelo menos uma criança deve ser cadastrada.`,
                success: 1,
            });
            return;
        }
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
        let hasNoName = false;
        let tempChildren = [];
        for(let i=0; i<children.length; i++) {
            if(children[i] === '') {
                hasNoName = true;
            }
            tempChildren.push({name: children[i]});
        }

        if(hasNoName) {
            setPopUp({
                popUp: true,
                popUpTitle: "Erro",
                popUpText: `Criança precisa ter um nome`,
                success: 1,
            });
            return;
        }

        if(password !== repeatPassword) {
            setPopUp({
                popUp: true,
                popUpTitle: "Erro",
                popUpText: `As senhas devem ser iguais.`,
                success: 1,
            });
            return;
        }

        let data = {parentName: name,
                    email: email,
                    password: password,
                    children: [...tempChildren]}

        const response = await register(data);
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        if(response.status === 200){
            setPopUp({
                popUp: true,
                popUpTitle: "Aviso",
                popUpText: `Registrado com sucesso.`,
                success: 1,
                route: "/login"
            });
        } else {
            setPopUp({
                popUp: true,
                popUpTitle: "Erro",
                popUpText: `Registro não efetuado.`,
                success: 1,
            });
        }
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
                                <ContainerInput>
                                    <FormInput
                                        name='name'
                                        type='text'
                                        handleChange={handleChange}
                                        value={name}
                                        label='Nome'
                                        required
                                    />
                                </ContainerInput>
                                <ContainerInput>
                                    <FormInput
                                        name='email'
                                        type='email'
                                        handleChange={handleChange}
                                        value={email}
                                        label='Email'
                                        required
                                    />
                                </ContainerInput>
                                <ContainerInput>
                                    <FormInput
                                        name='password'
                                        type='password'
                                        value={password}
                                        handleChange={handleChange}
                                        label='Senha'
                                        required
                                        autocomplete="new-password"
                                    />
                                </ContainerInput>
                                <ContainerInput>
                                    <FormInput
                                        name='repeatPassword'
                                        type='password'
                                        value={repeatPassword}
                                        handleChange={handleChange}
                                        label='Repita a senha'
                                        required
                                        autocomplete="new-password"
                                    />
                                </ContainerInput>
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
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <CustomButton type='button' discreetButton onClick={addInputButton}>
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                            <div style={{paddingRight: 5}}>
                                                Adicionar criança
                                            </div>
                                        <AddIcon style={{width: 22, height: 22, fill: '#424242'}}/>
                                        </div>
                                    </CustomButton>
                                </div>
                                <ButtonsBarContainer>
                                    <CustomButton type='submit' addButton> Cadastrar </CustomButton>
                                </ButtonsBarContainer>
                                <ButtonsBarContainer>
                                    <Link to="/login" style={{textDecoration: 'none', color: '#0277bd'}}>Já tem cadastro?</Link>
                                </ButtonsBarContainer>
                            </div>
                        </form>
                        {popUp.popUp ?
                        <PopUp title={popUp.popUpTitle} string={popUp.popUpText} success={popUp.success} route={popUp.route}/> : null}
                    </SignInContainerInside>
                </SignInContainer>
            </AlignContainer>
        </Container>
    );
}
