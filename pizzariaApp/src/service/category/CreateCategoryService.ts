import prismaClient from "../../prisma";

interface CategoryRequest {
    name : string;
}

class CreateCategoryService {
    async execute( { name } : CategoryRequest){

        if(name === ''){
            throw new Error("Nome está vazio!")
        }

        const category = prismaClient.category.create({
            select: { 
                id:true,
                name: true
            },
            data: {
                name: name
            }
        })


        return category;
    }
}

export { CreateCategoryService };