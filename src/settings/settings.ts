export interface ISettings {
    getString(key : string) : string | null
    getNumber(key : string) : number
}