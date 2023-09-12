import prismaClient from "../../../prisma";

interface DeleteOrderItemRequest{
    order_item_id: string
}

class DeleteOrderItemService {
    async execute({ order_item_id} : DeleteOrderItemRequest){
        const order_item = await prismaClient.order_Item.delete({
            where:{
                id:order_item_id
            }
        })

        return order_item;
    }
}

export { DeleteOrderItemService };