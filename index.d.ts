import { Plugin } from 'rollup';

export interface UserscriptHeaderOptions {
    /**
     * The current working directory, used to
     * find project.json for header defaults.
     * @default process.cwd()
     */
    cwd?: string;

    /**
     * Values that will overwrite the default
     * generated header.
     */
    overwrite?: object;
}

export default function userscriptHeader(options?: UserscriptHeaderOptions) : Plugin;