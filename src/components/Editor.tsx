import React, {useRef} from 'react';
import AceEditor from "react-ace";
import {Button} from "@material-ui/core";

import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-github";
import FileSaver from "file-saver";
import {dump, safeLoad} from "js-yaml";
import {showErrorAlert} from "../store/alert/actions";
import {useDispatch} from "react-redux";
import {SaveButtonClick} from "./actions";
import {createStyles, makeStyles} from "@material-ui/core/styles";

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
        }
    }),
);

export interface ReadonlyEditorProps {
    readonly: true;
    entity: any;
    fileName: string;
}

export interface EditorProps {
    readonly: false;
    entity: any;
    fileName: string;
    saveButtonClick: SaveButtonClick<any>;
}

//
export const Editor: React.FC<EditorProps | ReadonlyEditorProps> = (props) => {
    const classes = useEditorStyles();
    // TODO: add a proper type for ace editor
    const editor = useRef<any>(null);
    // TODO: convert to yaml lazy
    const yamlFormattedValue = dump(props.entity);

    // TODO: fix typing
    const dispatch: any = useDispatch();

    // Get editor content and save as a file
    function onClickDownloadButton() {
        const blob = new Blob([editor.current.editor.getValue()], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, props.fileName);
    }

    // Extract editor content and pass to the external handler
    function onClickSaveButton() {
        if (props.readonly) {
            return;
        }

        try {
            const entity = safeLoad(editor.current.editor.getValue());
            props.saveButtonClick.handle(entity, dispatch);
        } catch (err) {
            dispatch(showErrorAlert("Error", String(err)));
        }
    }

    return (
        <>
            <AceEditor
                className={classes.editor}
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
                    variant="outlined"
                    className={classes.button}
                    onClick={onClickDownloadButton}
                >
                    Download File
                </Button>
                {!props.readonly && (
                    <Button
                        variant="outlined"
                        className={classes.button}
                        onClick={onClickSaveButton}
                    >
                        Save Changes
                    </Button>
                )}
            </div>
        </>
    )
};
