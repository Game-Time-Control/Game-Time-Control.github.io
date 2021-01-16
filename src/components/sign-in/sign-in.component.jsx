import React, {useContext} from 'react';
import {useHistory, Link} from "react-router-dom";

/* Material UI */

/* Components */
import CustomButton from '../custom-button/custom-button.component';
import PopUp from "../popup/popup.component";

/* Style */
import {
    SignInContainer,
    SignInLogo,
    ButtonsBarContainer,
    Title,
    GroupContainer,
    FormInputContainer,
    FormInputLabel
} from './sign-in.styles';

/* Icon */
import TimeControl from "../../assets/timeControl.png";

//
// /* Api */
// import {login} from '../../api/ApiUser';
import {authContext} from "../../contexts/AuthContext";

import PropTypes from "prop-types";
import {login} from "../../api/ApiParent";

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

FormInput.propTypes = {
    handleChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
};

export default function SignIn(props) {
    const {setAuthData} = useContext(authContext);
    const [email, setEmail] = React.useState(''); //permission is the same way of width
    const [password, setPassword] = React.useState('');

    let history = useHistory();

    const [popUp, setPopUp] = React.useState({
        popUp: false,
        popUpTitle: "",
        popUpText: "",
        success: 1,
    });

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            let user = await login(email, password);

            if(user.status === 200) {
                const body = await user.json();
                setAuthData({
                    // token: body.token,
                    user: body.data,
                });

                history.replace('/home');
            } else if (user.status === 404) {
                setPopUp({
                    popUp: true,
                    popUpTitle: "Erro",
                    popUpText: `Usuário não cadastrado.`,
                    success: 1,
                });
            }
            else {
                setPopUp({
                    popUp: true,
                    popUpTitle: "Erro",
                    popUpText: `Verifique seu email e senha.`,
                    success: 1,
                });
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = event => {
        const {value, name} = event.target;
        if (name === 'password')
            setPassword(value);
        else
            setEmail(value);
    };

    return (

        <SignInContainer>
            <SignInLogo src={TimeControl}/>
            <Title> Fazer login </Title>

            <form onSubmit={handleSubmit}>
                <div style={{width: '250px'}}>
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
                    <ButtonsBarContainer>
                        <CustomButton type='submit' addButton systemType={props.systemType}> Entrar </CustomButton>
                    </ButtonsBarContainer>
                    <ButtonsBarContainer>
                        <Link to="/register" style={{textDecoration: 'none', color: '#0277bd'}}>Não tem cadastro?</Link>
                    </ButtonsBarContainer>
                </div>
            </form>
            { popUp.popUp ?
                <PopUp title={popUp.popUpTitle} string={popUp.popUpText} success={popUp.success}/> : null}
        </SignInContainer>

    );
}
