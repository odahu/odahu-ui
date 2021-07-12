import React, {Dispatch} from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import {Link as RouterLink} from 'react-router-dom';
import {Order, useTableStyles} from "./commons";


export interface EnhancedTableBodyProps<T> {
    readonly: boolean;
    selected: string[];
    setSelected: Dispatch<string[]>;
    data: Record<string, T extends { id?: string } ? T : never>;
    extractRow: (entity: T) => any[];
    extractRowValues: (entity: T) => any[];
    pageUrlPrefix: string;
    page: number;
    rowsPerPage: number;
    orderBy: string | number;
    order: Order;
    tableTitle: string;
}

function descendingComparator<T, K>(a: any, b: any, orderBy: string | number) {
    if(new Date(b[orderBy]).toString() !== 'Invalid Date' && new Date(a[orderBy]).toString() !== 'Invalid Date') {
        if (new Date(b[orderBy]) < new Date(a[orderBy])) {
            return -1;
        }
        if (new Date(b[orderBy]) > new Date(a[orderBy])) {
            return 1;
        }
    } else {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
    }
    return 0;
}


function getComparator(
    order: Order,
    orderBy: string | number,
    extractRow: (record: any) => any[]
): (a: any, b: any) => number {

    if (typeof orderBy == "number") {
        return (a, b) => {
            const ea = extractRow(a)
            const eb = extractRow(b)
            if (order === 'desc') {
                return descendingComparator(ea, eb, orderBy)
            } else {
                return -descendingComparator(ea, eb, orderBy);
            }
        }
    }

    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export function EnhancedTableBody<T>(props: EnhancedTableBodyProps<T>): React.ReactElement {
    const classes = useTableStyles();
    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = props.selected.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(props.selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(props.selected.slice(1));
        } else if (selectedIndex === props.selected.length - 1) {
            newSelected = newSelected.concat(props.selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                props.selected.slice(0, selectedIndex),
                props.selected.slice(selectedIndex + 1),
            );
        }

        props.setSelected(newSelected);
    };

    const isSelected = (name: string) => props.selected.indexOf(name) !== -1;

    const onCopyText = (elem: string) => {
        window.navigator.clipboard.writeText(elem);
    }

    return (
        <TableBody>
            {stableSort(
                Object.keys(props.data).map(key => props.data[key]),
                getComparator(props.order, props.orderBy, props.extractRowValues)
            )
                .slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
                .map((row, index) => {
                    const isItemSelected = isSelected(String(row.id));
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.id}
                        >
                            {!props.readonly && (
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        onClick={event => handleClick(event, String(row.id))}
                                        checked={isItemSelected}
                                        inputProps={{'aria-labelledby': labelId}}
                                    />
                                </TableCell>
                            )}
                            <TableCell align="left">
                                <RouterLink to={`${props.pageUrlPrefix}/${row.id}`}>
                                    {row?.id}
                                </RouterLink>
                            </TableCell>
                            {props.extractRow(row).map((elem, index) => (
                                props.tableTitle === 'Model Deployments' || props.tableTitle === 'Model Packagings' ? 
                                (
                                    <TableCell className={classes.columnCell} key={index} align="left">
                                        {index === 1 ? 
                                        (
                                            <Tooltip title="Copy to clipboard" placement="top" enterDelay={0} arrow>
                                                <FileCopyIcon color="action" fontSize="small" onClick={() => onCopyText(elem)}/>
                                            </Tooltip>
                                        ) : ''} {elem}
                                    </TableCell>
                                ) : props.tableTitle === 'Toolchains' || props.tableTitle === 'Packagers' ? 
                                (
                                    <TableCell className={classes.columnCell} key={index} align="left">
                                        {index === 0 ? 
                                        (
                                            <Tooltip title="Copy to clipboard" placement="top" enterDelay={0} arrow>
                                                <FileCopyIcon color="action" fontSize="small" onClick={() => onCopyText(elem)}/>
                                            </Tooltip>
                                        ) : ''} {elem}
                                    </TableCell>
                                ) : props.tableTitle === 'Connections' && index === 1 ?
                                (
                                    <TableCell className={classes.columnCell} key={index} align="left">
                                        <Tooltip title="Copy to clipboard" placement="top" enterDelay={0} arrow>
                                            <FileCopyIcon color="action" fontSize="small" onClick={() => onCopyText(elem)}/>
                                        </Tooltip>
                                        {elem}
                                    </TableCell>
                                ) : (<TableCell key={index} align="left">{elem}</TableCell>) 
                            ))}
                        </TableRow>
                    );
                })}
        </TableBody>
    );
}
