import React, {useEffect} from "react";
import PropTypes from "prop-types";

/* Components */
import Header from "../../components/header/header.component";
import Subheader from "../../components/subheader/subheader.component";
import PopUp from "../../components/popup/popup.component";
import CustomButton from "../../components/custom-button/custom-button.component";

/* Styles */
import {TitleContainer, CalendarContainer, ContainerDeleteButton, ConfigContainer, PeriodContainer, PieceOfPeriod} from "./child-config.styles";

/* Material UI */
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Slider from "@material-ui/core/Slider";

/* Api */
import {deleteChildren, getAllChildren, getOneChildren, updateChildren} from "../../api/ApiChild";

const sunday = 0;
const monday = 1;
const tuesday = 1;
const wednesday = 1;
const thursday = 2;
const friday = 1;
const saturday = 1;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ChildConfig = (props) => {
    const valuetext = (value) => {
        return `${value} h`;
    }

    return (
        <TabPanel value={props.value} index={props.CHILD}>
            <TitleContainer>
                <Typography variant="h5">Gerencie o Máximo de horas diárias de <b>{props.childName}</b></Typography>
            </TitleContainer>
            <Paper variant="outlined">
                <Container>
                    {props.days.map((day, index) => (
                        props.call ?
                        <CalendarContainer key={index}>
                            <Typography id="discrete-slider" gutterBottom>
                                {day.name}
                            </Typography>
                            <ConfigContainer>
                                <Slider
                                    value={props.days[index].maxHours}
                                    min={0}
                                    step={1}
                                    max={24}
                                    marks
                                    onChange={(event,value) => props.handleChangeSlider(event, value,index)}
                                    getAriaValueText={valuetext}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    style={{width: '15vw', color: props.childColor}}
                                />
                                <PeriodContainer onMouseLeave={props.disableToggle} key={index}>
                                    {props.days[index].period.map((element, indexSecondary) => (
                                        <PieceOfPeriod isActive={element}
                                                       childColor={props.childColor}
                                                       onMouseDown={(event) => props.enableToggle(event, element, index, indexSecondary)}
                                                       onMouseUp={props.disableToggle}
                                                       onMouseEnter={(event) => props.select(event, element, index, indexSecondary)}
                                                       key={indexSecondary}/>
                                    ))}
                                </PeriodContainer>
                            </ConfigContainer>
                        </CalendarContainer>
                            : null
                    ))}
                </Container>
                <CalendarContainer>
                    <CustomButton addButton type="submit" onClick={props.handleSubmit}>
                        Salvar
                    </CustomButton>
                </CalendarContainer>
            </Paper>
            <ContainerDeleteButton>
                <CustomButton type="button" deleteButton onClick={props.deleteChild}> Deletar </CustomButton>
            </ContainerDeleteButton>
        </TabPanel>
    );
};

const GameConfig = (props) => {
    return (
        <TabPanel value={props.value} index={props.GAME}>
        </TabPanel>
    );
};

const colors = ["#116cbc", "#ff3d00", "#7986cb", "#11bcb7", "#bc6111", "#4089C9", "#616161", "#2C8C89"];

export default function ChildConfigPage(props) {
    const [value, setValue] = React.useState(0);
    const [children, setChildren] = React.useState([]);
    const [call, setCall] = React.useState(false);
    const [childInfo, setChildInfo] = React.useState([{name: "Domingo", maxHours: 1},
        {name: "Segunda", maxHours: 0},
        {name: "Terça", maxHours: 0},
        {name: "Quarta", maxHours: 0},
        {name: "Quinta", maxHours: 0},
        {name: "Sexta", maxHours: 0},
        {name: "Sábado", maxHours: 0}]);
    const [childName, setChildName] = React.useState('');
    const [child, setChild] = React.useState({});
    const [popUp, setPopUp] = React.useState({
        popUp: false,
        popUpTitle: "",
        popUpText: "",
        success: 1,
        acceptable: true
    });
    const [mouseEvent, setMouseEvent] = React.useState(false);
    const [childColor, setChildColor] = React.useState('#424242');
    const [arrayOfConfigs, setArrayOfConfigs] = React.useState([{value: 1, isActive: false}, {value: 2, isActive: false}, {value: 3, isActive: false}, {value: 4, isActive: false}]);

    const [tabs] = React.useState({
        CHILD: 0,
        GAME: 1});

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleSubmit = async () => {
        let tempChild = child;
        for(let i=0; i<child.days.length; i++) {
            tempChild.days[i].maxTime = childInfo[i].maxHours;
        }

        let data = tempChild;

        const response = await updateChildren("5fbd3c79176adb4148996c2a", props.match.params.childId,  data);
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        if(response.status === 200){
            setPopUp({
                popUp: true,
                popUpTitle: "Aviso",
                popUpText: `Configurações da criança atualizadas com sucesso!`,
                success: 1,
                acceptable: false
            });
        } else {
            setPopUp({
                popUp: true,
                popUpTitle: "Erro",
                popUpText: `Configurações da criança não puderam ser atualizadas.`,
                success: 1,
                acceptable: false
            });
        }

    };

    useEffect(() => {
        const callApiFindAllChildren = async (parent) => {
            const response = await getAllChildren(parent);
            const body = await response.json();

            return body.payload
        };

        const callApiGetOneChildren = async (child) => {
            const response = await getOneChildren(child);
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
                for(let i=0;i<res.length;i++) {
                    if(res[i].id === props.match.params.childId) {
                        setChildColor(res[i].color);
                    }
                }
                setChildren(res);
            })
            .catch(err => console.log(err));

        callApiGetOneChildren(props.match.params.childId)
            .then(res => {
                let tempChildInfo = [];
                let days= ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

                for(let i=0; i<res.days.length;i++) {
                    tempChildInfo[i] = {name: days[i], maxHours: res.days[i].maxTime, period: res.days[i].period};
                }
                setChildInfo(tempChildInfo);
                setChildName(res.name);
                setChild(res);
                setCall(true);
            })
            .catch(err => console.log(err));
    }, [props.match.params.childId, arrayOfConfigs]);

    const handleChangeSlider = (event, value, index) => {
        let daysCopy = [...childInfo];
        if(daysCopy[index].maxHours !== value) {
            daysCopy[index].maxHours = value;
            setChildInfo(daysCopy);
        }
    }

    const deleteChildModal = () => {
        setPopUp({
            popUp: true,
            popUpTitle: "Deletando uma criança",
            popUpText: `Deseja mesmo deletar ${childName}?`,
            success: 1,
            acceptable: true,
            action1Name: "Sim",
            action2Name: "Não"
        });
    };

    const deleteChild = async () => {
        if(children.length <= 1) {
            setPopUp({
                popUp: true,
                popUpTitle: "Erro",
                popUpText: `O número de crianças não pode ser inferior a 1.`,
                success: 1,
                acceptable: false,
            });
            return;
        }
        const response = await deleteChildren(props.match.params.childId);
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        if(response.status === 200){
            setPopUp({
                popUp: true,
                popUpTitle: "Aviso",
                popUpText: `Criança deletada com sucesso.`,
                success: 2,
                acceptable: false,
                route: `/`
            });
        } else {
            setPopUp({
                popUp: true,
                popUpTitle: "Erro",
                popUpText: `Criança não pode ser deletada.`,
                success: 1,
                acceptable: false,
            });
        }
    }

    const select = (event, element, index, indexSecondary) => {
        if(mouseEvent) {
            let configCopy = [...childInfo];
            configCopy[index].period[indexSecondary] = !element;
            setChildInfo(configCopy);
        }
    };

    const enableToggle = (event, element, index, indexSecondary) => {
        if(!mouseEvent) {
            let configCopy = [...childInfo];
            configCopy[index].period[indexSecondary] = !element;
            setChildInfo(configCopy);
        }
        setMouseEvent(true);
    };

    const disableToggle = () => {
        setMouseEvent(false);
    };

    return (
        <div>
            <Header/>
            <Subheader/>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                    <Tab label="Calendário" {...a11yProps(0)} />
                    <Tab label="Jogos" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <ChildConfig value={value} index={tabs.CHILD} CHILD={tabs.CHILD} days={childInfo} childName={childName} handleChangeSlider={handleChangeSlider}
                         call={call} handleSubmit={handleSubmit} deleteChild={deleteChildModal} childColor={childColor} select={select} enableToggle={enableToggle}
                         disableToggle={disableToggle} arrayOfConfigs={arrayOfConfigs}/>
            <GameConfig value={value} index={tabs.GAME} GAME={tabs.GAME}/>
            {popUp.popUp ?
                <PopUp title={popUp.popUpTitle} string={popUp.popUpText} success={popUp.success} route={popUp.route} acceptable={popUp.acceptable} acceptFunction={deleteChild}
                       action1={popUp.action1Name} action2={popUp.action2Name}/> : null}
        </div>
    );
}