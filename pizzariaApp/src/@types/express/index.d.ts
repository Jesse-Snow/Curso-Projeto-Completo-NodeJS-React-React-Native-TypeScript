// Adicionando propriedade na interface Request do Express
declare namespace Express { 
    export interface Request { 
        user_id: string
    }
}