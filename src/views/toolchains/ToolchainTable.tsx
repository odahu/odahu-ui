import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {ApplicationState} from "../../store";
import {EnhancedReadonlyTableProps, EnhancedTable} from "../../components/table/EnhancedTable";
import {ToolchainIntegration} from "../../models/odahuflow/ToolchainIntegration";
import {ToolchainState} from "../../store/toolchains/types";
import {ToolchainURLPagePrefix} from "./ToolchainPage";
import {fetchAllToolchainRequest} from "../../store/toolchains/actions";

const ToolchainEnhancedTable = (props: EnhancedReadonlyTableProps<ToolchainIntegration>) => <EnhancedTable {...props}/>;

export const ToolchainTable: React.FC = () => {
    const toolchainState = useSelector<ApplicationState, ToolchainState>(state => state.toolchains);
    const dispatch = useDispatch();
    const headers = ['Default Docker Image', 'Entrypoint'];

    return (
        <ToolchainEnhancedTable
            readonly={true}
            tableTitle="Toolchains"
            headers={headers}
            data={toolchainState.data}
            length={toolchainState.length}
            onRefreshButtonClick={() => {
                dispatch(fetchAllToolchainRequest());
            }}
            extractRow={toolchain => [
                toolchain.spec?.defaultImage,
                toolchain.spec?.entrypoint,
            ]}
            pageUrlPrefix={ToolchainURLPagePrefix}
        />
    );
};
