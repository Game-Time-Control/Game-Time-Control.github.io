import React, {useEffect} from "react";
import {Link} from "react-router-dom";

/* Styles */
import {useStyles} from "../header/header.styles";

/* Material UI */
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

/* Icons */
import {ReactComponent as More} from "../../assets/plus.svg";

/* Components */
import PopUp from "../popup/popup.component";

/* Api */
import {getAllChildren} from "../../api/ApiChild";
import Button from "@material-ui/core/Button";

export default function Subheader() {
    const classes = useStyles();
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
        const callApiFindAllChildren = async (parent) => {
            const response = await getAllChildren(parent);
            const body = await response.json();

            return body.payload
        };

        callApiFindAllChildren("5fbd3c79176adb4148996c2a")
            .then(res => {
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
            acceptable: true
        });
    };

    const handleChange = event => {
        const {value, name} = event.target;
        if (name === 'name')
            setName(value);
    };

    const acceptAdd = () => {
        handleClose();
        setIsRowsInput(false);
        // const response = await deleteUser(auth, props.match.params.userId, props.match.params.companyId);
        // const body = await response.json();
        //
        // if (response.status !== 200) throw Error(body.message);
        //
        // if(response.status === 200){
            setPopUp({
                popUp: true,
                popUpTitle: "Aviso",
                popUpText: `Criança adicionada com sucesso`,
                success: 1,
                acceptable: false,
                first: false,
                second: false
            });
        // } else {
        //     setPopUp({
        //         popUp: true,
        //         popUpTitle: "Erro",
        //         popUpText: `Criança não pode ser adicionada`,
        //         success: 1,
        //         acceptable: false,
        //         first: false,
        //         second: false
        //     });
        // }

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
                            <IconButton className={classes.avatar} component={Link}
                                        to={`/child/${children.id}`}>
                                <Avatar className={classes.orange}>{children.name[0]+children.name[1]}</Avatar>
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
                <PopUp title={popUp.popUpTitle} string={popUp.popUpText} success={popUp.success} route={popUp.route} acceptable={popUp.acceptable} acceptFunction={acceptAdd} handleClose={handleClose} rowsInput={rowsInput} handleChange={handleChange} isRowsInput={isRowsInput}/> : null}
        </div>
    );
}