import { ISettings } from './settings';

export class EnvSettings implements ISettings {

    getString(key : string) : string | null {
        return process.env[key] || null
    }

    getNumber(key: string) : number {
        return Number(process.env[key] || 0)
    }
}