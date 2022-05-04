export interface TransactionInterface {
    createdAt: string,
    description: string,
    entry: boolean,
    id: number,
    userId: number,
    value: number,
}


export interface ResumeInterface {
    input: number,
    output: number,
    total: number
}
