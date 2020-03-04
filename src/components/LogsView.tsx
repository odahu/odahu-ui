import React, {useEffect, useRef, useState} from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-plain_text";
import "ace-builds/src-noconflict/theme-github";
import {useDispatch} from "react-redux";
import {Button, Collapse, LinearProgress} from "@material-ui/core";
import {AsyncAction} from "../store";
import {isEntityCompleted} from "../utils/enities";
import {saveAsFile} from "../utils/file";
import {createStyles, makeStyles} from "@material-ui/core/styles";


export const useLogsViewStyles = makeStyles(() =>
    createStyles({
        editor: {
            paddingTop: '5px',
            borderWidth: "1px",
            borderStyle: "solid",
            minWidth: "100%",
            minHeight: '90%'
        },
        buttonContainer: {
            marginTop: "15px"
        },
        button: {
            margin: '5px'
        }
    }),
);

export interface LoggedEntity {
    id?: string;
    status?: {
        state?: string;
    };
}

export interface LogsViewProps {
    entity: LoggedEntity;
    fileName: string;
    fetchLogsRequest: (id: string) => AsyncAction<Promise<string>>;
    fetchEntityRequest: (id: string) => AsyncAction<Promise<LoggedEntity>>;
}

const defaultUpdateTimeout = 5000;
export const LogsView: React.FC<LogsViewProps> = (
    {entity, fileName, fetchLogsRequest, fetchEntityRequest}
) => {
    const classes = useLogsViewStyles();
    const editor = useRef<AceEditor | null>(null);
    const [logs, setLogs] = useState<string>('');
    const [timerID, setTimerID] = useState<null | number>(null);
    const [isProgressBarVisible, setProgressBarVisible] = useState<boolean>(true);
    const dispatch: any = useDispatch();

    function cleanupTimer(timerID: number | null) {
        if (timerID !== null) {
            window.clearInterval(timerID);
        }

        setTimerID(null);
    }

    function fetchLogs() {
        return dispatch(fetchLogsRequest(entity.id ?? '')).then((res: string) => {
            setLogs(res);
        });
    }

    function refreshLogs() {
        // TODO: need to update entity before fetch logs
        dispatch(fetchEntityRequest(entity.id as string)).then((entity: LoggedEntity) => {
            if (entity.status?.state === "scheduling") {
                setLogs('The container is scheduling...');

                return;
            } else if (isEntityCompleted(entity)) {
                cleanupTimer(timerID);

                return fetchLogs();
            } else {
                return fetchLogs();
            }
        }).catch((err: string) => {
            // TODO: consider proper logging
            console.log(err);
        }).finally(() => {
            if (isEntityCompleted(entity)) {
                setProgressBarVisible(false);
                cleanupTimer(timerID);
            }
        });
    }

    // Get editor content and save as a file
    function onClickDownloadButton() {
        saveAsFile(editor.current?.editor.getValue(), fileName);
    }

    useEffect(() => {
        cleanupTimer(timerID);
        setTimerID(window.setInterval(refreshLogs, defaultUpdateTimeout));
        refreshLogs();

        return () => {
            cleanupTimer(timerID);
        }
    }, []);

    return (
        <>
            <Collapse in={isProgressBarVisible}>
                <LinearProgress color="secondary"/>
            </Collapse>
            <AceEditor
                className={classes.editor}
                mode="plain_text"
                theme="github"
                name="UNIQUE_ID_OF_DIV"
                editorProps={{$blockScrolling: true}}
                value={logs.length === 0 && isEntityCompleted(entity) ? "Logs not found" : logs}
                ref={editor}
                readOnly
            />
            <div className={classes.buttonContainer}>
                <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={onClickDownloadButton}
                >
                    Download Log File
                </Button>
            </div>
        </>
    )
};
