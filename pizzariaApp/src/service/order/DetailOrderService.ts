import prismaClient from "../../prisma";

interface DetailOrderRequest {
    order_id: string;
}

class DetailOrderService { 
    async execute( { order_id}: DetailOrderRequest){
        const order = await prismaClient.order_Item.findMany({
            // Para que inclua também as tabelas que estão relacionadas
            include: { 
                product:true,
                order:true,
            },
            where:{
                order_id: order_id
            }
        });

        return order;
    }
}

export { DetailOrderService };
