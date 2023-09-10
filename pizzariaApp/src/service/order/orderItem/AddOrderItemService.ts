import prismaClient from "../../../prisma";

interface AddOrderItemRequest { 
    order_id: string;
    product_id: string;
    amount: number;
}

class AddOrderItemService { 
    async execute({ order_id,product_id,amount} : AddOrderItemRequest){
        const orderItem = await prismaClient.order_Item.create({
            data:{
                order_id:order_id,
                product_id:product_id,
                amount:amount
            }
        });

        return orderItem;
    }
}

export { AddOrderItemService };