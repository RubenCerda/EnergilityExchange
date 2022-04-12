export interface ICheckView {
    monthDate: number
    yearDate: number
    totalAmount: number
}

export interface ICheckHeaderGraph {
    fromDate: string
    toDate: string
    companyId: any
    docTypeId: any
    filters: string,
    pageNumber: number,
    limit: number
}

export interface ICheckProperty {
    fromDate: string
    companyId: any
    docTypeId: any
    filters: string
}