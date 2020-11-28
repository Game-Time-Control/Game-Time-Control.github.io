import React from "react";
/* Components */
import Header from "../../components/header/header.component";

/* Material UI */
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default function Home() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Header/>
            <div style={{backgroundColor: '#424242', color: '#fff', height: '35vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                Home (clique em uma criança)
            </div>
        </div>
    );
}