import prismaClient from "../../prisma";

interface FinishOrderRequest{
    order_id: string
}

class FinishOrderService {
    async execute( { order_id} : FinishOrderRequest){
        const order = await prismaClient.order.update({
            data:{
                status:true
            },
            where:{
                id:order_id
            }
        });

        return order;
    }
}

export { FinishOrderService };