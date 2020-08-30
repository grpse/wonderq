export interface IMessagesProcessor  {
    process(id : string) : Promise<boolean>
}