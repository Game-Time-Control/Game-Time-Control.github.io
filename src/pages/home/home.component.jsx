import React, {useContext, useEffect} from "react";
import {Link} from "react-router-dom";

/* Components */
import Header from "../../components/header/header.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import PopUp from "../../components/popup/popup.component";

/* Material UI */
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

/* Styles */
import {ChildLabel, ContainerChildIcon, MainContainer, ContainerButtons} from "./home.styles";

/* Api */
import {getAllChildren} from "../../api/ApiChild";
import {downloadClient} from "../../api/Api";

/* Context */
import {authContext} from "../../contexts/AuthContext";

const colors = ["#116cbc", "#ff3d00", "#7986cb", "#11bcb7", "#bc6111", "#4089C9", "#616161", "#2C8C89"];

export default function Home() {
    const [children, setChildren] = React.useState([]);
    const { auth } = useContext(authContext);

    const [popUp, setPopUp] = React.useState({
        popUp: false,
        popUpTitle: "Erro",
        popUpText: "Algo estranho aconteceu, por favor faça login novamente.",
        success: 1
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

    const callApiDownloadClient = async () => {
        const response = await downloadClient();
    };

    return (
        <div>
            <Header/>
            { popUp.popUp ?
                <PopUp title={popUp.popUpTitle} string={popUp.popUpText} success={popUp.success} route={popUp.route}/> : null}
            <MainContainer>
                <Typography variant="h5" component="h4" style={{paddingBottom: 50}}> Deseja configurar qual criança?</Typography>
                <ContainerButtons>
                    {children.map((children, index) => (
                        <ContainerChildIcon key={index}>
                            <Button component={Link}
                                    to={`/child/${children.id}`}>
                                <Avatar variant="rounded" style={{
                                    width: 100,
                                    height: 100,
                                    backgroundColor: children.color,
                                    fontSize: 30
                                }}>{children.name[0].toUpperCase()}</Avatar>
                            </Button>
                            <ChildLabel> {children.name} </ChildLabel>
                        </ContainerChildIcon>
                    ))}
                </ContainerButtons>
            </MainContainer>
        </div>
    );
}