import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {ApplicationState} from "../../store";
import {EnhancedTable, EnhancedTableProps} from "../../components/table/EnhancedTable";
import {ModelPackaging} from "../../models/odahuflow/ModelPackaging";
import {ModelPackagingState} from "../../store/packaging/types";
import {deletePackagingRequest, fetchAllPackagingRequest} from "../../store/packaging/actions";
import {showInfoAlert} from "../../store/alert/actions";
import {Link as RouterLink, Redirect} from "react-router-dom";
import {join} from "path";
import {PackagerURLs} from "../packagers/urls";
import {PackagingURLs} from "./urls";
import {humanDate} from "../../utils/date";
import CloudIcon from '@material-ui/icons/Cloud';
import {DeploymentURLs} from "../deployments/urls";
import {deployableIntegrations} from "../../utils/enums"

const PackagingEnhancedTable = (props: EnhancedTableProps<ModelPackaging>) => <EnhancedTable {...props}/>;

const headers = ['Integration', 'Artifact name', 'State', 'Created at', 'Updated at'];
const extractRow = (packaging: ModelPackaging) => [
    (
        <RouterLink
            key="packager"
            to={join(PackagerURLs.Page, packaging.spec?.integrationName ?? '')}
        >
            {packaging.spec?.integrationName}
        </RouterLink>
    ),
    packaging.spec?.artifactName,
    packaging.status?.state,
    humanDate(packaging.createdAt),
    humanDate(packaging.updatedAt)
];
const extractRowValues = (packaging: ModelPackaging) => [
    packaging.spec?.integrationName,
    packaging.spec?.artifactName,
    packaging.status?.state,
    humanDate(packaging.createdAt),
    humanDate(packaging.updatedAt)
];

export const PackagingTable: React.FC = () => {

    const [redirectTo, setRedirect] = React.useState<string>("")

    const packagingState = useSelector<ApplicationState, ModelPackagingState>(state => state.packagings);
    const dispatch = useDispatch();

    const onDeleteButtonClick = (selectedIDs: string[]) => {
        Promise.all(
            selectedIDs.map(mpID => dispatch(deletePackagingRequest(mpID)))
        ).then(() => {
            dispatch(fetchAllPackagingRequest())
        });
    };

    const onRefreshButtonClick = () => {
        dispatch(fetchAllPackagingRequest());
    };

    if (redirectTo) {
        return <Redirect push to={`${DeploymentURLs.FromPackaging}/${redirectTo}`}/>
    }

    return (
        <PackagingEnhancedTable
            readonly={false}
            tableTitle="Model Packagings"
            headers={headers}
            data={packagingState.data}
            length={packagingState.length}
            onRefreshButtonClick={onRefreshButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
            extractRow={extractRow}
            extractRowValues={extractRowValues}
            newUrlPrefix={PackagingURLs.New}
            pageUrlPrefix={PackagingURLs.Page}
            cloneUrlPrefix={PackagingURLs.Clone}
            oneRowSelectedButtons={[
                {
                    onClick: (id: string) => {
                        const selectedIntegration = packagingState.data[id].spec?.integrationName ?? ""
                        if (deployableIntegrations.includes(selectedIntegration)) {
                            setRedirect(id)
                        } else {
                            dispatch(showInfoAlert(
                                "Not available for deploy",
                                `Only images built on next integrations are available for deploy: ${deployableIntegrations}`
                            ))
                        }
                    },
                    text: "Deploy",
                    icon: CloudIcon
                }
            ]}
        />
    );
};
