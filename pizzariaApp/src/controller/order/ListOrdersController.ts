import { Request,Response } from "express";
import { ListOrdersService } from "../../service/order/ListOrdersService";

class ListOrdersController { 
    async handle(req: Request,res:Response){
        const listNotDraftOrdersService = new ListOrdersService();

        const orders = await listNotDraftOrdersService.execute();

        return res.json(orders);
    }
}

export { ListOrdersController };