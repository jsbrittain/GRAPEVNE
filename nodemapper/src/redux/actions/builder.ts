import { createAction } from "@reduxjs/toolkit";

export const builderLoadNodemap = createAction("builder/load-nodemap");

export const builderSaveNodemap = createAction("builder/save-nodemap");

export const builderSetAutoValidateConnections = createAction<boolean>(
  "builder/set-auto-validate-connections"
);

export const builderToggleAutoValidateConnections = createAction(
  "builder/toggle-auto-validate-connections"
);

export const builderCompileToJson = createAction("builder/compile-to-json");

export const builderOpenTerminal = createAction("builder/open-terminal");

export const builderBuildAndRun = createAction("builder/build-and-run");

export const builderToggleTerminalVisibility = createAction(
  "builder/toggle-terminal-visibility"
);

export const builderSetSettingsVisibility = createAction<boolean>(
  "builder/set-settings-visibility"
);

export const builderToggleSettingsVisibility = createAction(
  "builder/toggle-settings-visibility"
);

export const builderCleanBuildFolder = createAction(
  "builder/clean-build-folder"
);

export const builderRedraw = createAction("builder/redraw");

export const builderGetRemoteModules = createAction(
  "builder/get-remote-modules"
);

export const builderImportModule = createAction("builder/import-module");

export const builderSelectSnakemakeBackend = createAction<string>(
  "builder/select-snakemake-backend"
);

export const builderSelectCondaBackend = createAction<string>(
  "builder/select-conda-backend"
);

export const builderSetEnvironmentVars = createAction<string>(
  "builder/set-environment_vars"
);

export const builderUpdateModulesList = createAction<string>(
  "builder/update-modules-list"
);

export const builderCheckNodeDependencies = createAction<string>(
  "builder/check-node-dependencies"
);

export const builderUpdateStatusText = createAction<string>(
  "builder/update-status-text"
);

export const builderUpdateNodeInfo = createAction<string>(
  "builder/update-node-info"
);

export const builderUpdateNodeInfoKey = createAction<
  Record<string, string[] | string>
>("builder/update-node-info-key");

export const builderUpdateNodeInfoName = createAction<string>(
  "builder/update-node-info-name"
);

export const builderSetSnakemakeArgs = createAction<string>(
  "builder/set-snakemake-args"
);

export const builderLogEvent = createAction<string>("builder/log-event");

export const builderSetRepositoryTarget = createAction<Record<string, any>>( // eslint-disable-line @typescript-eslint/no-explicit-any
  "builder/set-repository-target"
);

export const builderAddLink = createAction<Record<string, any> | undefined>( // eslint-disable-line @typescript-eslint/no-explicit-any
  "builder/add-link"
);

export const builderNodeSelected = createAction<
  Record<string, any> | undefined // eslint-disable-line @typescript-eslint/no-explicit-any
>("builder/node-selected");

export const builderNodeDeselected = createAction<
  Record<string, any> | undefined // eslint-disable-line @typescript-eslint/no-explicit-any
>("builder/node-deselected");
