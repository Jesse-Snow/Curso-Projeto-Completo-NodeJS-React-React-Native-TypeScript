import { Request,Response } from "express";
import { AddOrderItemService } from "../../../service/order/orderItem/AddOrderItemService";

class AddOrderItemController { 
    async handle(req:Request,res:Response){
        const { order_id,product_id,amount} = req.body;

        const addOrderItemService = new AddOrderItemService();

        const orderItem = await addOrderItemService.execute({order_id,product_id,amount});

        return res.json(orderItem);
    }
}

export { AddOrderItemController };