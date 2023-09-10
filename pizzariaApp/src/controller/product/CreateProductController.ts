import { Request,Response } from "express";
import { CreateProductService } from "../../service/product/CreateProductService";

class CreateProductController {
    async handle(req: Request, res: Response){
        let banner = ''
        const { name,price,description,category_id} = req.body;

        
        // Se não houver arquivo na requisição
        if(!req.file){
            throw new Error("error upload file")
        }else {
            console.log(req.file.originalname);
            const createProductService = new CreateProductService();
    
            const product = await createProductService.execute({ 
                name,
                price,
                description,
                banner,
                category_id
            });
    
            return res.json(product);
        }
    }


}

export { CreateProductController };