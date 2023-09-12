import { Request,Response } from "express";
import { DeleteOrderItemService } from "../../../service/order/orderItem/DeleteOrderItemService";

class DeleteOrderItemController { 
    async handle(req: Request,res: Response){
        const order_item_id  = req.query.order_item_id as string;

        const deleteOrderItemService = new DeleteOrderItemService();

        const order_item = await deleteOrderItemService.execute({order_item_id});

        return res.json(order_item);
    }
}

export { DeleteOrderItemController };