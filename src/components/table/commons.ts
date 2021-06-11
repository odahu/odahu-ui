import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export type Order = 'asc' | 'desc';

export const useTableStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        tableContainer: {
            maxHeight: '65vh'
        },
        table: {
            minWidth: 1400
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
        tableHeaderCell: {
            flexDirection: 'row-reverse'
        },
        tableDateCell: {
            width: '200px'
        },
        tableStateCell: {
            width: '120px'
        },
        sortInactive: {
            opacity: 0.15,
            marginLeft: '-5px'
        },
        columnCell: {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: '225px',
            cursor: 'default'
        }
    }),
);