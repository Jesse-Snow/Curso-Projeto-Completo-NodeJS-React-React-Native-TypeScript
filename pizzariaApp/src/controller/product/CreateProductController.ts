import { Request,Response } from "express";
import { CreateProductService } from "../../service/product/CreateProductService";

class CreateProductController {
    async handle(req: Request, res: Response){
        const { name,price,description,category_id} = req.body;

        
        // Se não houver arquivo na requisição
        if(!req.file){
            throw new Error("error upload file")
        }else {
            const { originalname, filename} = req.file;
            const createProductService = new CreateProductService();
    
            const product = await createProductService.execute({ 
                name : name,
                price : price,
                description : description,
                banner : filename, 
                category_id : category_id
            });
    
            return res.json(product);
        }
    }


}

export { CreateProductController };