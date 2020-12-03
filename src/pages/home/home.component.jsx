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

export default function Home() {
    const [value, setValue] = React.useState(0);
    const [children, setChildren] = React.useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                                <Avatar style={{
                                    width: 100,
                                    height: 100,
                                    backgroundColor: "#ff3d00",
                                    borderRadius: 2,
                                    fontSize: 30
                                }}>{children.name[0]}</Avatar>
                            </Button>
                            <ChildLabel> {children.name} </ChildLabel>
                        </ContainerChildIcon>
                    ))}
                </ContainerButtons>
            </MainContainer>
        </div>
    );
}