// Node -> o Crypto será usado para gerar um hash e não ter arquivos com mesmo nome
import crypto from 'crypto';

// Node -> path para ter o caminho dos diretórios e arquivos 
import {extname,resolve} from 'path';

// Configurando o multer para definir local de armazenamento de arquivo e nome do arquivo
import multer from 'multer';


export default {
    // Parametro folder é qual caminho que irá salvar a imagem
    upload(folder: string){
        return { 
            // diskStorage -> salvar arquivos locamente
            storage: multer.diskStorage({
                // destination: (onde será salvo)
                  // resolve: irá montar o caminho, seguinto do diretório atual até o difertório passado como parâmetro
                destination:resolve(__dirname,'..','..',folder),
                //filename -> Qual será o nome do arquivo
                filename: (request,file,callback) => {
                    // Cria um hash
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    // Faz com que o  nome do arquivo seja hash+nomeOriginalDoArquivo, evita que existam dois arquivos com mesmo nome
                    const fileName = `${fileHash}-${file.originalname}`;

                    // Primeiro parâmetro da callback é o tratamento de erro, nesse caso
                    // será null, pois não tem tratamento de erro
                    // Segundo parâmetro é o nome do arquivo
                    return callback(null,fileName);
                }
            })
        }
    }
}