export interface ProductCreate
{
    name: string;
    sellPrice: number;
    importPrice: number;
    quantity: number;
    imageUrl: string;
    description: string;
    categoryId: number;
}