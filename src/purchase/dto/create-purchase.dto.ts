export class CreatePurchaseDto {
    total:number;
    Product: string;
    Vendor: string;
    userid: string;
    bankaccountid: string;
    replicationammount: number;
    replicationmetric: string;
    replicationstart: Date;
    replicationend: Date;
}
