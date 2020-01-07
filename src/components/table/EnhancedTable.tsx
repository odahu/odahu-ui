import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import {Link as RouterLink, Redirect} from 'react-router-dom';
import {EnhancedTableToolbar} from "./EnhancedTableToolbar";
import {EnhancedTableHead} from "./EnhancedTableHead";


const useTableStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    }),
);

export interface EnhancedReadonlyTableProps<T> {
    readonly: true;
    tableTitle: string;
    onRefreshButtonClick: () => void;
    headers: string[];
    data: Record<string, T extends { id?: string } ? T : never>;
    length: number;
    extractRow: (entity: T) => any[];
    pageUrlPrefix: string;
}

export interface EnhancedTableProps<T> {
    readonly: false;
    tableTitle: string;
    onRefreshButtonClick: () => void;
    onDeleteButtonClick: (selectedIDs: string[]) => void;
    headers: string[];
    data: Record<string, T extends { id?: string } ? T : never>;
    length: number;
    extractRow: (entity: T) => any[];
    newUrlPrefix: string;
    pageUrlPrefix: string;
    newSimilarUrlPrefix?: string;
}

export function EnhancedTable<T>(props: EnhancedTableProps<T> | EnhancedReadonlyTableProps<T>): React.ReactElement {
    const classes = useTableStyles();
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [newClicked, setNewClicked] = useState(false);
    const [newSimilarClicked, setSimilarNewClicked] = useState(false);
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = Object.keys(props.data);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const newButtonClicked = () => {
        setNewClicked(true);
    };

    const newSimilarButtonClicked = () => {
        setSimilarNewClicked(true);
    };

    // Redirect to the page where mew resource will be created
    if (!props.readonly && newClicked) {
        return <Redirect push to={props.newUrlPrefix}/>
    }


    // Redirect to the page where mew resource will be created
    if (!props.readonly && newSimilarClicked) {
        return <Redirect push to={props.newSimilarUrlPrefix ? `${props.newSimilarUrlPrefix}/${selected[0]}` : ''}/>
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {
                    props.readonly ? (
                        <EnhancedTableToolbar
                            readonly={true}
                            tableTitle={props.tableTitle}
                            onRefreshButtonClick={props.onRefreshButtonClick}
                        />
                    ) : (
                        <EnhancedTableToolbar
                            readonly={false}
                            tableTitle={props.tableTitle}
                            numSelected={selected.length}
                            onNewButtonClick={newButtonClicked}
                            onNewSimilarButtonClick={newSimilarButtonClicked}
                            onRefreshButtonClick={props.onRefreshButtonClick}
                            onDeleteButtonClick={() => {
                                props.onDeleteButtonClick(selected);
                                setSelected([]);
                            }}
                        />
                    )
                }
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size='medium'
                        aria-label="enhanced table"
                    >
                        {
                            props.readonly ? (
                                <EnhancedTableHead
                                    readonly={true}
                                    headers={props.headers}
                                />
                            ) : (
                                <EnhancedTableHead
                                    readonly={false}
                                    numSelected={selected.length}
                                    onSelectAllClick={handleSelectAllClick}
                                    rowCount={props.length}
                                    headers={props.headers}
                                />
                            )
                        }
                        <TableBody>
                            {Object.keys(props.data).map(key => props.data[key])
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(String(row.id));
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => handleClick(event, String(row.id))}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                        >
                                            {!props.readonly && (
                                                <TableCell padding="checkbox">
                                                    <Checkbox
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
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
