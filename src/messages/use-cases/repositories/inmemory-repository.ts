import { v4 } from 'uuid'
import { IRepository, FindClause, UpdateFieldsValues } from './repository'

export class InMemoryRepository<DataType extends DataObject> implements IRepository<DataType> {
    
    private store : { [id:string] : DataType } = {}

    async find(clause : FindClause, limit : number) : Promise<DataType[]> {
        const resultStorePack : DataType[] = []

        for (const data of Object.values(this.store)) {
            let shouldAddToResult = true
            for (const key of Object.keys(clause)) {
                if (data[key] !== clause[key]) {
                    shouldAddToResult = false
                    break
                }
            }

            if (shouldAddToResult) {
                resultStorePack.push({ ...data })
            }
        }

        return resultStorePack.slice(0, limit)
    }

    async save(data: DataType): Promise<{ id : string }> {
        const id = data.id || v4()
        this.store[id] = { ...data, id }
        return { id }
    }

    async update(ids : string[], fieldsValues : UpdateFieldsValues) : Promise<void> {
        for (const id of ids) {
            if (this.store[id]) {
                for (const field of Object.keys(fieldsValues)) {
                    this.store[id] = { ...this.store[id], [field]: fieldsValues[field] }
                }
            }
        }
    }

    async delete(id: string): Promise<void> {
        delete this.store[id]
    }

}

type DataObject = {
    id: string
    [key:string] : DataObjectRecursive
}

type DataObjectRecursive = number | boolean | string | undefined | { [key:string] : DataObjectRecursive }