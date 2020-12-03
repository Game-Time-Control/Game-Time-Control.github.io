import React, {useEffect} from "react";
import {Link} from "react-router-dom";

/* Components */
import Header from "../../components/header/header.component";

/* Material UI */
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

/* Styles */
import {ChildLabel, ContainerChildIcon, MainContainer, ContainerButtons} from "./home.styles";

/* Api */
import {getAllChildren} from "../../api/ApiChild";

const colors = ["#116cbc", "#ff3d00", "#7986cb", "#11bcb7", "#bc6111", "#4089C9", "#616161", "#2C8C89"];

export default function Home() {
    const [children, setChildren] = React.useState([]);

    useEffect(() => {
        const callApiFindAllChildren = async (parent) => {
            const response = await getAllChildren(parent);
            const body = await response.json();

            return body.payload
        };

        callApiFindAllChildren("5fbd3c79176adb4148996c2a")
            .then(res => {
                let temp;
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

    return (
        <div>
            <Header/>
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