import React from "react";

/* Components */

/* Styles */
import {CalendarContainer} from "./child-calendar.styles";

/* Material UI */
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

function valuetext(value) {
    return `${value}°C`;
}

export default function ChildCalendar() {

    return (
        <div>
            <Paper variant="outlined">
                <Container>
                    <CalendarContainer>
                        <Typography id="discrete-slider" gutterBottom>
                            Horas permitidas no dia
                        </Typography>
                        <Slider
                            defaultValue={30}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={24}
                            style={{width: '20vw'}}
                        />
                    </CalendarContainer>
                </Container>
            </Paper>
        </div>
    );
}