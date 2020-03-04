import React, {MutableRefObject, useRef} from 'react';
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, Link, TextField} from "@material-ui/core";
import CallToActionIcon from '@material-ui/icons/CallToAction';
import {useDispatch} from "react-redux";
import {showInfoAlert} from "../../store/alert/actions";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    header: {
        fontSize: '16px',
    },
}));

interface LoginCommandProps {
    innerRef: MutableRefObject<any>;
}

const LoginCommand: React.FC<LoginCommandProps> = ({innerRef}) => {
    // URL can contain a port when we use it for development purposes.
    // TODO: the host must be retrivied from server configuration.
    const port = window.location.port === '' ? '' : `:${window.location.port}`;
    const url = `${window.location.protocol}//${window.location.hostname}${port}`;

    return (
        <TextField
            style={{width: '100%'}}
            inputProps={{
                ref: innerRef,
            }}
            multiline
            rows="4"
            disabled
            defaultValue={`odahuflowctl login --url ${url}`}
            variant="outlined"
        />
    )
};

/**
 * Copy a text to clipboard.
 */
function copyToClipboard(value: string): void {
    const temporaryTextArea = document.createElement('textarea');
    temporaryTextArea.value = value;

    document.body.appendChild(temporaryTextArea);
    temporaryTextArea.select();

    document.execCommand('copy');
    document.body.removeChild(temporaryTextArea);
}

export const CLI: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const commandLineTextElem = useRef<HTMLTextAreaElement>(null);

    function clickOnCopyButton() {
        // We use disabled TextField, so we can't select a text inside it.
        // Because we create additional text field for coping.
        copyToClipboard(commandLineTextElem.current?.value ?? '');

        dispatch(showInfoAlert('Info', 'The command has been copied'));
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar variant="square" style={{color: 'black', backgroundColor: 'white'}}>
                        <CallToActionIcon/>
                    </Avatar>
                }
                title={<span className={classes.header}>Getting Started</span>}
            />
            <Divider/>
            <CardContent>
                <LoginCommand innerRef={commandLineTextElem}/>
            </CardContent>
            <Divider/>
            <CardActions>
                <Link href="https://docs.odahu.org/ref_odahuflowctl.html"
                      style={{color: 'inherit', textDecoration: 'none'}}
                      target="_blank">
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </Link>
                <Button size="small" color="primary" onClick={clickOnCopyButton}>
                    Copy
                </Button>
            </CardActions>
        </Card>
    )
};
