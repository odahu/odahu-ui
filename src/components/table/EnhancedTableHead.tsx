import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {Order, useTableStyles} from "./commons";

export interface EnhancedReadonlyTableProps {
    readonly: true;
    headers: string[];
    onRequestSort: (event: React.MouseEvent<unknown>, property: string | number) => void;
    order: Order;
    orderBy: string | number;
}

export interface EnhancedTableProps {
    readonly: false;
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    rowCount: number;
    headers: string[];
    onRequestSort: (event: React.MouseEvent<unknown>, property: string | number) => void;
    order: Order;
    orderBy: string | number;
}

export const EnhancedTableHead: React.FC<EnhancedReadonlyTableProps | EnhancedTableProps> = (props) => {

    const { order, orderBy, onRequestSort  } = props
    const createSortHandler = (index: string | number) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, index);
    };
    const classes = useTableStyles();

    return (
        <TableHead>
            <TableRow>
                {
                    (!props.readonly && props.rowCount > 0) && (
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
                <TableCell
                    align="left"
                    key="ID"
                    className={classes.tableHeaderCell}
                >
                    <TableSortLabel
                        id="sortBtn0"
                        active={orderBy === "id"}
                        direction={orderBy === "id" ? order : "asc"}
                        onClick={createSortHandler("id")}
                        classes={{
                            icon: classes.sortInactive
                        }}
                    >
                        ID

                    </TableSortLabel>
                </TableCell>

                {
                    props.headers.map((header, index) => ( 
                        <TableCell
                            key={header}
                            align="left"
                            className={`
                                ${classes.tableHeaderCell} 
                                ${(header === 'Created at' || header === 'Updated at') && classes.tableDateCell }
                                ${header === 'State' && classes.tableStateCell}`}
                        >
                            <TableSortLabel
                                id={`sortBtn${index+1}`}
                                classes={{
                                    icon: classes.sortInactive
                                }}
                                active={orderBy === index}
                                direction={orderBy === index ? order : "asc"}
                                onClick={createSortHandler(index)}
                            >
                                {header}

                            </TableSortLabel>
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    );
};
