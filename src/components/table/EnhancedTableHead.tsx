import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";


export interface EnhancedReadonlyTableProps {
    readonly: true;
    headers: string[];
}


export interface EnhancedTableProps {
    readonly: false;
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    rowCount: number;
    headers: string[];
}

export const EnhancedTableHead: React.FC<EnhancedReadonlyTableProps | EnhancedTableProps> = (props) => {
    return (
        <TableHead>
            <TableRow>
                {
                    !props.readonly && (
                        <TableCell key="select" padding="checkbox">
                            <Checkbox
                                indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
                                checked={props.numSelected !== 0 && props.numSelected === props.rowCount}
                                onChange={props.onSelectAllClick}
                                inputProps={{'aria-label': 'select all desserts'}}
                            />
                        </TableCell>
                    )
                }
                <TableCell align="right" key="ID">ID</TableCell>
                {
                    props.headers.map(header => (
                        <TableCell key={header} align="right">{header}</TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    );
};
