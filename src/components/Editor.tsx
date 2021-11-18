import React, {useRef} from 'react';
import AceEditor from "react-ace";
import {Button} from "@material-ui/core";

import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-github";
import {dump, safeLoad} from "js-yaml";
import {showErrorAlert} from "../store/alert/actions";
import {useDispatch} from "react-redux";
import {SaveButtonClick} from "./actions";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {saveAsFile} from "../utils/file";

export const useEditorStyles = makeStyles(() =>
    createStyles({
        editor: {
            borderWidth: "1px",
            borderStyle: "solid",
            minWidth: "100%"
        },
        buttonContainer: {
            marginTop: "15px"
        },
        button: {
            margin: '5px'
        },
        warning: {
            color: '#d14000', 
            fontSize: '13px'
        }
    }),
);

export interface ReadonlyEditorProps {
    readonly: true;
    entity: any;
    fileName: string;
    warning?: boolean;
}

export interface EditorProps {
    readonly: false;
    entity: any;
    fileName: string;
    saveButtonClick: SaveButtonClick<any>;
    warning?: boolean;
}

export const Editor: React.FC<EditorProps | ReadonlyEditorProps> = (props) => {
    const classes = useEditorStyles();
    const editor = useRef<AceEditor | null>(null);
    // TODO: convert to yaml lazy
    const yamlFormattedValue = dump(props.entity);

    // TODO: fix typing
    const dispatch: any = useDispatch();

    // Get editor content and save as a file
    function onClickDownloadButton() {
        saveAsFile(editor.current?.editor.getValue(), props.fileName);
    }

    // Extract editor content and pass to the external handler
    function onClickSaveButton() {
        if (props.readonly) {
            return;
        }

        try {
            const entity = safeLoad(editor.current?.editor.getValue());
            props.saveButtonClick.handle(entity, dispatch);
        } catch (err) {
            dispatch(showErrorAlert("Error", String(err)));
        }
    }

    return (
        <>
            {props?.warning && 
                <div className={classes.warning}> 
                    WARNING: To submit edited connection please retype the encrypted credentials (covered by {'*****'}).
                </div>
            }
            <AceEditor
                className={classes.editor}
                style={{height: props?.warning ? '475px':'500px'}}
                mode="yaml"
                theme="github"
                name="UNIQUE_ID_OF_DIV"
                editorProps={{$blockScrolling: true}}
                value={yamlFormattedValue}
                ref={editor}
                readOnly={props.readonly}
            />
            <div className={classes.buttonContainer}>
                <Button
                    id="editorDownloadBtn"
                    variant="outlined"
                    className={classes.button}
                    onClick={onClickDownloadButton}
                >
                    Download File
                </Button>
                {!props.readonly && (
                    <Button
                        id="editorSubmitBtn"
                        variant="outlined"
                        className={classes.button}
                        onClick={onClickSaveButton}
                    >
                        Submit
                    </Button>
                )}
            </div>
        </>
    )
};
