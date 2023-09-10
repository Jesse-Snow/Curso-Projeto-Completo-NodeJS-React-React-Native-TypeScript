import prismaClient from "../../prisma";

interface ProductByCategoryRequest {
    category_id : string;
}

class ListByCategoryService {
    async execute( { category_id } : ProductByCategoryRequest){
        const product = await prismaClient.product.findMany({
            select:{
                id:true,
                name:true,
                price:true,
                description:true,
                banner:true,
                category_id:true
            },
            where: {
                category_id : category_id
            }
        });

        return product;

    }
}

export { ListByCategoryService };