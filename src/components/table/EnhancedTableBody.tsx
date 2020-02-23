import React, {Dispatch} from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import {Link as RouterLink} from 'react-router-dom';


export interface EnhancedTableBodyProps<T> {
    readonly: boolean;
    selected: string[];
    setSelected: Dispatch<string[]>;
    data: Record<string, T extends { id?: string } ? T : never>;
    extractRow: (entity: T) => any[];
    pageUrlPrefix: string;
    page: number;
    rowsPerPage: number;
}

export function EnhancedTableBody<T>(props: EnhancedTableBodyProps<T>): React.ReactElement {
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

    return (
        <TableBody>
            {Object.keys(props.data).map(key => props.data[key])
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
                            <TableCell align="right">
                                <RouterLink to={`${props.pageUrlPrefix}/${row.id}`}>
                                    {row?.id}
                                </RouterLink>
                            </TableCell>
                            {props.extractRow(row).map((elem, index) => (
                                <TableCell key={index} align="right">{elem}</TableCell>
                            ))}
                        </TableRow>
                    );
                })}
        </TableBody>
    );
}
