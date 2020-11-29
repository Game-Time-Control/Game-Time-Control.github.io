import React, {useEffect} from "react";
import PropTypes from "prop-types";

/* Components */
import Header from "../../components/header/header.component";
import ChildCalendar from "./child-calendar/child-calendar.component";

/* Styles */
import {TitleContainer} from "./child-config.styles";

/* Material UI */
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography"

/* Api */
import {getOneChildren} from "../../api/ApiChild";

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
    return (
        <TabPanel value={props.value} index={props.CHILD}>
            <TitleContainer>
                <Typography variant="h5">Gerencie o tempo de <b>{props.childInfo.name}</b></Typography>
            </TitleContainer>
            <ChildCalendar/>
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
    const [childInfo, setChildInfo] = React.useState([]);
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
                setChildInfo(res);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <Header/>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                    <Tab label="Calendário" {...a11yProps(0)} />
                    <Tab label="Jogos" {...a11yProps(1)} />
                </Tabs>
            </AppBar>

            <ChildConfig value={value} index={tabs.CHILD} CHILD={tabs.CHILD} childInfo={childInfo}/>
            <GameConfig value={value} index={tabs.GAME} GAME={tabs.GAME}/>
        </div>
    );
}