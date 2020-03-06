import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {ApplicationState} from "../../store";
import {EnhancedReadonlyTableProps, EnhancedTable} from "../../components/table/EnhancedTable";
import {ToolchainIntegration} from "../../models/odahuflow/ToolchainIntegration";
import {ToolchainState} from "../../store/toolchains/types";
import {fetchAllToolchainRequest} from "../../store/toolchains/actions";
import {ToolchainURLs} from "./urls";
import {humanDate} from "../../utils/date";

const ToolchainEnhancedTable = (props: EnhancedReadonlyTableProps<ToolchainIntegration>) => <EnhancedTable {...props}/>;

const headers = ['Default Docker Image', 'Entrypoint', 'Created at', 'Updated at'];

export const ToolchainTable: React.FC = () => {
    const toolchainState = useSelector<ApplicationState, ToolchainState>(state => state.toolchains);
    const dispatch = useDispatch();

    const onRefreshButtonClick = () => {
        dispatch(fetchAllToolchainRequest());
    };
    const extractRow = (toolchain: ToolchainIntegration) => [
        toolchain.spec?.defaultImage,
        toolchain.spec?.entrypoint,
        humanDate(toolchain.status?.createdAt),
        humanDate(toolchain.status?.updatedAt)
    ];

    return (
        <ToolchainEnhancedTable
            readonly={true}
            tableTitle="Toolchains"
            headers={headers}
            data={toolchainState.data}
            length={toolchainState.length}
            onRefreshButtonClick={onRefreshButtonClick}
            extractRow={extractRow}
            pageUrlPrefix={ToolchainURLs.Page}
        />
    );
};
