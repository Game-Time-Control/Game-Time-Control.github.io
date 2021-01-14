import React, {useContext, useEffect} from "react";
import {Link} from "react-router-dom";

/* Styles */
import {useStyles} from "./subheader.styles";

/* Material UI */
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

/* Icons */
import {ReactComponent as More} from "../../assets/plus.svg";

/* Components */
import PopUp from "../popup/popup.component";

/* Api */
import {addChildren, getAllChildren} from "../../api/ApiChild";
import Button from "@material-ui/core/Button";

/* Context */
import {authContext} from "../../contexts/AuthContext";

const colors = ["#116cbc", "#ff3d00", "#7986cb", "#11bcb7", "#bc6111", "#4089C9", "#616161", "#2C8C89"];

export default function Subheader() {
    const classes = useStyles();

    const { auth } = useContext(authContext);

    const [children, setChildren] = React.useState([]);
    const [name, setName] = React.useState('');
    const [isRowsInput, setIsRowsInput] = React.useState(false);

    let rowsInput = [{name: "name", type: "text", value: name, label: "Nome", placeholder: "", required: true, maxLength: 40}];


    const [popUp, setPopUp] = React.useState({
        popUp: false,
        popUpTitle: "",
        popUpText: "",
        success: 1,
        acceptable: true
    });

    useEffect(() => {
        const callApiFindAllChildren = async (token, parent) => {
            const response = await getAllChildren(token, parent);

            if(response.status !== 200) {
                setPopUp({
                    popUp: true,
                    popUpTitle: "Erro",
                    popUpText: "Algo estranho aconteceu, por favor faça login novamente.",
                    success: 2,
                    route: "/login"
                })
                return;
            }
            const body = await response.json();

            return body
        };

        callApiFindAllChildren(auth.data.user.token, auth.data.user.userId)
            .then(res => {
                for(let i=0, temp=0; i < res.length; i++, temp++) {
                    res[i]["color"] = colors[temp];
                    if(i+1%(colors.length)===0) {
                        temp=0;
                    }
                }

                setChildren(res);
            })
            .catch(err => console.log(err));
    }, []);

    const handleClose = () => {
        popUp.popUp = false;
    };

    const addChildModal = () => {
        setIsRowsInput(true);
        setPopUp({
            popUp: true,
            popUpTitle: "Nova criança",
            popUpText: `Informe o nome da criança que deseja adicionar.`,
            success: 1,
            acceptable: true,
            action1Name: "Adicionar",
            action2Name: "Cancelar"
        });
    };

    const handleChange = event => {
        const {value, name} = event.target;
        if (name === 'name')
            setName(value);
    };

    const acceptAdd = async () => {
        handleClose();
        setIsRowsInput(false);
        if (name.length === 0) {
            setPopUp({
                popUp: true,
                popUpTitle: "Erro",
                popUpText: `Insira o nome da criança.`,
                success: 1,
                acceptable: false
            });
            return;
        }


        let data = {name: name};
        const response = await addChildren(auth.data.user.token, auth.data.user.userId, data);
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        if(response.status === 200){
            setPopUp({
                popUp: true,
                popUpTitle: "Aviso",
                popUpText: `Criança adicionada com sucesso`,
                success: 1,
                acceptable: false
            });
        } else {
            setPopUp({
                popUp: true,
                popUpTitle: "Erro",
                popUpText: `Criança não pode ser adicionada`,
                success: 1,
                acceptable: false
            });
        }

    };

    return (
        <div className={classes.root}>
            <div className={classes.subAppbar}>
                <div className={classes.mainTitle}>
                    Família
                </div>
                <div>
                    {children.map((children, index) => (
                        <Tooltip key={index} title={children.name} aria-label={children.name}>
                            <IconButton component={Link}
                                        to={`/child/${children.id}`}>
                                <Avatar style={{width: 60, height: 60, backgroundColor: children.color}}>{children.name[0].toUpperCase()}</Avatar>
                            </IconButton>
                        </Tooltip>
                    ))}
                    {/*<IconButton className={classes.avatar} component={Link} to='/child2'>*/}
                    {/*    <Avatar className={classes.silver}>N</Avatar>*/}
                    {/*</IconButton>*/}
                    <IconButton className={classes.avatar} component={Button} type='submit' onClick={addChildModal}>
                        <More className={classes.moreIcon}/>
                    </IconButton>
                </div>
            </div>
            {popUp.popUp ?
                <PopUp title={popUp.popUpTitle} string={popUp.popUpText} success={popUp.success} route={popUp.route} acceptable={popUp.acceptable} acceptFunction={acceptAdd}
                       handleClose={handleClose} rowsInput={rowsInput} handleChange={handleChange} isRowsInput={isRowsInput} action1={popUp.action1Name}
                       action2={popUp.action2Name}/> : null}
        </div>
    );
}