import prismaClient from "../../prisma";

interface OrderDeleteRequest {
    order_id: string;
}

class DeleteOrderService {
    async execute({ order_id } : OrderDeleteRequest){
        const order = await prismaClient.order.delete({
            where: { 
                id: order_id
            }
        });

        return order;
    }
}

export { DeleteOrderService };