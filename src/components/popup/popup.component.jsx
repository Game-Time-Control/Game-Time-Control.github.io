import React from 'react';
import {useHistory} from "react-router-dom";

/* Material UI */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/* Styles */
import {StyledInput, CentralizedElement, StyledLabel} from "./popup.styles";

export default function PopUp(props) {
    const [open, setOpen] = React.useState(true);
    let history = useHistory();

    const handleClose = () => {
        setOpen(false);
        if(props.success === 1){
            window.location.reload()
        } else if(props.success === 2){
            history.replace(props.route)
        }

    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.string}
                    </DialogContentText>

                    {props.isRowsInput ? props.rowsInput.map((row, index) => (
                            <CentralizedElement key={index}>
                                <StyledLabel>{row.label}</StyledLabel>
                                <StyledInput
                                    name={row.name}
                                    type={row.type}
                                    onChange={props.handleChange}
                                    value={row.value}
                                    required={row.required}
                                    maxLength={row.maxLength}
                                />
                            </CentralizedElement>
                        )) : null}
                </DialogContent>
                <DialogActions>
                    {props.acceptable ?
                        <Button type='submit' onClick={props.acceptFunction} color="primary">
                            {props.action1}
                        </Button>
                        : null}
                    {props.acceptable ?
                        <Button onClick={handleClose} color="primary">
                            {props.action2}
                        </Button>
                        :
                        <Button onClick={handleClose} color="primary">
                            Ok
                        </Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}
