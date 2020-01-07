import React, {useEffect, useRef, useState} from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-plain_text";
import "ace-builds/src-noconflict/theme-github";
import {useDispatch} from "react-redux";
import {Button, Collapse, LinearProgress} from "@material-ui/core";
import FileSaver from "file-saver";
import {AsyncAction} from "../store";

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
}

export const LogsView: React.FC<LogsViewProps> = (
    {entity, fileName, fetchLogsRequest}
) => {
    // TODO: add a proper type for ace editor
    const editor = useRef<any>(null);
    const [logs, setLogs] = useState('');
    const [timerID, setTimerID] = useState<null | number>(null);
    const [isProgressBarVisible, setProgressBarVisible] = useState<boolean>(true);
    const dispatch: any = useDispatch();

    function cleanupTimer() {
        if (timerID !== null) {
            window.clearInterval(timerID);
        }

        setTimerID(null);
    }

    function refreshLogs() {
        const currentState = entity.status?.state;
        if (currentState === "scheduling") {
            setLogs('The container is scheduling...');

            return;
        }

        // TODO: need to update entity before fetch logs
        dispatch(fetchLogsRequest(entity.id ?? '')).then((res: string) => {
            setLogs(res);
        }).catch((err: string) => {
            // TODO: consider proper logging
            console.log(err);
        }).finally(() => {
            if (currentState === 'succeeded' || currentState === 'failed') {
                setProgressBarVisible(false);
                cleanupTimer();

                if (logs.length === 0) {
                    setLogs("Logs not found");
                }
            }
        });
    }

    // Get editor content and save as a file
    function onClickDownloadButton() {
        const blob = new Blob([editor.current.editor.getValue()], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, fileName);
    }

    useEffect(() => {
        setTimerID(window.setInterval(refreshLogs, 5000));
        refreshLogs();

        return () => {
            cleanupTimer();
        }
    }, []);

    return (
        <>
            <Collapse in={isProgressBarVisible}>
                <LinearProgress color="secondary"/>
            </Collapse>
            <AceEditor
                style={{
                    paddingTop: '5px',
                    borderWidth: "1px",
                    borderStyle: "solid",
                    minWidth: "100%",
                    minHeight: '90%'
                }}
                mode="plain_text"
                theme="github"
                name="UNIQUE_ID_OF_DIV"
                editorProps={{$blockScrolling: true}}
                value={logs}
                ref={editor}
                readOnly
            />
            <div style={{marginTop: "15px"}}>
                <Button
                    variant="outlined"
                    style={{margin: '5px'}}
                    onClick={onClickDownloadButton}
                >
                    Download Log File
                </Button>
            </div>
        </>
    )
};
