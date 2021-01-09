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

    const [popup, setPopup] = React.useState(false);
    const [popupText, setPopupText] = React.useState('');
    const [popupTitle, setPopupTitle] = React.useState('');
    const [success, setSuccess] = React.useState(1);


    const handleSubmit = async event => {
        event.preventDefault();
            setAuthData({
                token: true,
                user: {userId: '5fbd3c79176adb4148996c2a'},
                system: props.systemType
            });
        history.replace('/home');
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
            { popup ?
                <PopUp title={popupTitle} string={popupText} success={success}/> : null}
        </SignInContainer>

    );
}
