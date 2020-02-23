import {ConnectionSpecPlugin, ConnectionTypes} from "./types";
import {ConnectionAzureBlobSpecPlugin} from "./types/azureblob";
import {ConnectionDockerSpecPlugin} from "./types/docker";
import {ConnectionECRSpecPlugin} from "./types/ecr";
import {ConnectionGCSSpecPlugin} from "./types/gcs";
import {ConnectionGITSpecPlugin} from "./types/git";
import {ConnectionS3SpecPlugin} from "./types/s3";

const allConnectionPlugin: ConnectionSpecPlugin[] = [
    ConnectionAzureBlobSpecPlugin,
    ConnectionDockerSpecPlugin,
    ConnectionECRSpecPlugin,
    ConnectionGCSSpecPlugin,
    ConnectionGITSpecPlugin,
    ConnectionS3SpecPlugin,
];

export const connectionPluginsMapping: Map<ConnectionTypes, ConnectionSpecPlugin>
    = new Map(allConnectionPlugin.map(plugin => [plugin.type, plugin]));
