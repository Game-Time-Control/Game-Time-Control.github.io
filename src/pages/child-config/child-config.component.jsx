import React, {useEffect} from "react";
import PropTypes from "prop-types";

/* Components */
import Header from "../../components/header/header.component";
import Subheader from "../../components/subheader/subheader.component";

/* Styles */
import {TitleContainer, CalendarContainer} from "./child-config.styles";

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
import {getOneChildren} from "../../api/ApiChild";

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
        return `${value}°C`;
    }

    return (
        <TabPanel value={props.value} index={props.CHILD}>
            <TitleContainer>
                <Typography variant="h5">Gerencie o tempo de <b>{props.childName}</b></Typography>
            </TitleContainer>
            <Paper variant="outlined">
                {console.log(props.days)}
                <Container>
                    {props.days.map((day, index) => (
                        props.call ?
                        <CalendarContainer key={index}>
                            {console.log(props.days)}
                            <Typography id="discrete-slider" gutterBottom>
                                {day.name}
                            </Typography>
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
                                style={{width: '15vw'}}
                            />
                        </CalendarContainer>
                            : null
                    ))}
                </Container>
            </Paper>
        </TabPanel>
    );
};

const GameConfig = (props) => {
    return (
        <TabPanel value={props.value} index={props.GAME}>
        </TabPanel>
    );
};

export default function ChildConfigPage(props) {
    const [value, setValue] = React.useState(0);
    const [call, setCall] = React.useState(false);
    const [childInfo, setChildInfo] = React.useState([{name: "Domingo", maxHours: 1},
        {name: "Segunda", maxHours: 0},
        {name: "Terça", maxHours: 0},
        {name: "Quarta", maxHours: 0},
        {name: "Quinta", maxHours: 0},
        {name: "Sexta", maxHours: 0},
        {name: "Sábado", maxHours: 0}]);
    const [childName, setChildName] = React.useState('');

    const [tabs] = React.useState({
        CHILD: 0,
        GAME: 1});

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const callApiGetOneChildren = async (child) => {
            const response = await getOneChildren(child);
            const body = await response.json();

            return body.payload
        };

        callApiGetOneChildren(props.match.params.childId)
            .then(res => {
                let tempChildInfo = [{name: "Domingo", maxHours: res.days[sunday].maxTime},
                    {name: "Segunda", maxHours: res.days[monday].maxTime},
                    {name: "Terça", maxHours: res.days[tuesday].maxTime},
                    {name: "Quarta", maxHours: res.days[wednesday].maxTime},
                    {name: "Quinta", maxHours: res.days[thursday].maxTime},
                    {name: "Sexta", maxHours: res.days[friday].maxTime},
                    {name: "Sábado", maxHours: res.days[saturday].maxTime}]
                setChildInfo(tempChildInfo);
                setChildName(res.name);
                setCall(true);
            })
            .catch(err => console.log(err));
    }, [props.match.params.childId]);

    const handleChangeSlider = (event, value, index) => {
        let daysCopy = [...childInfo];
        if(daysCopy[index].maxHours !== value) {
            daysCopy[index].maxHours = value;
            setChildInfo(daysCopy);
        }
    }

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
            <ChildConfig value={value} index={tabs.CHILD} CHILD={tabs.CHILD} days={childInfo} childName={childName} handleChangeSlider={handleChangeSlider} call={call}/>
            <GameConfig value={value} index={tabs.GAME} GAME={tabs.GAME}/>
        </div>
    );
}