export interface IRepository<DataType extends Object> {
    find(clause : FindClause, limit : number) : Promise<DataType[]>
    save(data : DataType) : Promise<{ id : string }>
    update(ids : string[], updateFieldsValues : UpdateFieldsValues) : Promise<void>
    delete(id : string) : Promise<void>
}

export type FindClause = { [field:string] : string | number | boolean }
export type UpdateFieldsValues = { [field:string] : string | number | boolean }