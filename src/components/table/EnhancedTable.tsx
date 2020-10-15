import React, {useState} from 'react';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import {Redirect} from 'react-router-dom';
import {EnhancedTableToolbar, ExtraToolbarButton} from "./EnhancedTableToolbar";
import {EnhancedTableHead} from "./EnhancedTableHead";
import {EnhancedTableBody} from "./EnhancedTableBody";
import {Order, useTableStyles} from "./commons";
import {SvgIconProps} from "@material-ui/core/SvgIcon/SvgIcon";


export interface EnhancedReadonlyTableProps<T> {
    readonly: true;
    tableTitle: string;
    onRefreshButtonClick: () => void;
    headers: string[];
    data: Record<string, T extends { id?: string } ? T : never>;
    length: number;
    extractRow: (entity: T) => any[];
    extractRowValues: (entity: T) => any[];
    pageUrlPrefix: string;
}

interface SingleSelectedButton {
    onClick: (id: string) => void;
    text: string;
    icon: (props: SvgIconProps) => JSX.Element;
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
    extractRowValues: (entity: T) => any[];
    newUrlPrefix: string;
    pageUrlPrefix: string;
    cloneUrlPrefix?: string;
    oneRowSelectedButtons?: SingleSelectedButton[];
}

export function EnhancedTable<T>(props: EnhancedTableProps<T> | EnhancedReadonlyTableProps<T>): React.ReactElement {
    const classes = useTableStyles();
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [newClicked, setNewClicked] = useState(false);
    const [newCloneClicked, setCloneNewClicked] = useState(false);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<string|number>('id');


    const selectedAndExisted = selected.filter((value) => value in props.data)
    if (selected.length > selectedAndExisted.length) {
        // Means that some selected rows were deleted in Redux store
        setSelected(selectedAndExisted)
    }

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: string | number) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = Object.keys(props.data);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const newButtonClicked = () => {
        setNewClicked(true);
    };

    const newCloneButtonClicked = () => {
        setCloneNewClicked(true);
    };

    // Redirect to the page where mew resource will be created
    if (!props.readonly && newClicked) {
        return <Redirect push to={props.newUrlPrefix}/>
    }

    // Redirect to the page where new resource will be created
    if (!props.readonly && newCloneClicked) {
        return <Redirect push to={props.cloneUrlPrefix ? `${props.cloneUrlPrefix}/${selected[0]}` : ''}/>
    }

    // bind selected IDs to event handlers
    let extraButtons: ExtraToolbarButton[] = [];
    if (!props.readonly && selected.length === 1) {
        const oneRowButtons: ExtraToolbarButton[] = (props.oneRowSelectedButtons ?? []).map(
            v => {
                return {
                    ...v,
                    onClick: () => {
                        v.onClick(selected[0])
                    }
                }
            })
        extraButtons = extraButtons.concat(oneRowButtons)
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
                            onNewCloneButtonClick={newCloneButtonClicked}
                            onRefreshButtonClick={props.onRefreshButtonClick}
                            onDeleteButtonClick={() => {
                                props.onDeleteButtonClick(selected);
                                setSelected([]);
                            }}
                            extraButtons={extraButtons}
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
                                    onRequestSort={handleRequestSort}
                                    orderBy={orderBy}
                                    order={order}
                                />
                            ) : (
                                <EnhancedTableHead
                                    readonly={false}
                                    numSelected={selected.length}
                                    onSelectAllClick={handleSelectAllClick}
                                    rowCount={props.length}
                                    headers={props.headers}
                                    onRequestSort={handleRequestSort}
                                    orderBy={orderBy}
                                    order={order}
                                />
                            )
                        }
                        <EnhancedTableBody
                            readonly={props.readonly}
                            selected={selected}
                            setSelected={setSelected}
                            data={props.data}
                            extractRow={props.extractRow}
                            extractRowValues={props.extractRowValues}
                            pageUrlPrefix={props.pageUrlPrefix}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            orderBy={orderBy}
                            order={order}
                        />
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
