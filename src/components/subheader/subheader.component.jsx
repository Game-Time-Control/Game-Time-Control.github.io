import React, {useEffect} from "react";
import {useStyles} from "../header/header.styles";

import {getAllChildren} from "../../api/ApiChild";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import {ReactComponent as More} from "../../assets/plus.svg";

export default function Subheader() {
    const classes = useStyles();
    const [children, setChildren] = React.useState([]);

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
                    <IconButton className={classes.avatar} component={Link} to='/child/add'>
                        <More className={classes.moreIcon}/>
                    </IconButton>
                </div>
            </div>

        </div>
    );
}