import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {editPageStyles} from "./EditablePage";

export type TableElement = React.ReactElement | string | null | undefined

export interface TableParameterViewProps {
    style?: React.CSSProperties;
    headers: string[];
    values: TableElement[][] | null | undefined;
}

export function checkValuePresent(values: any): null | boolean {
    return (values !== null && values !== undefined && Object.values(values).length !== 0) ? true : null
}

export const TableParameterView: React.FC<TableParameterViewProps> = (
    {style, headers, values}
) => {
    const classes = editPageStyles();

    if (values === null || values === undefined || values.length === 0) {
        return null;
    }

    return (
        <TableContainer style={Object.assign({maxWidth: '30%', minWidth: '30%'}, style ?? {})}
                        className={classes.fields} component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {
                            headers.map(header => <TableCell key={header} align="right">{header}</TableCell>)
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {values.map((value, index) => (
                        <TableRow key={index}>
                            {value.map((field, index) => <TableCell key={index} align="right">{field}</TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};
