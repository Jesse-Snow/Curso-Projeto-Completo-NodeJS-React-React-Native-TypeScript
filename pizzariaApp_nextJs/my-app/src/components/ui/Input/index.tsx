import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

// Note que fora do diretório pages, não é necessário usar 'export default' nos components
/* Também é possível passar e aceitar quantos props quiser ao utilizar ...rest como parâmetro e 
   no elemento.
   E com o Typescript é possível tipar quais serão os Props, nesse caso, quero somente 
   props do elemento input do html
*/
export function Input({...rest}: InputProps){
    return (
        <input className={styles.input} {...rest} />
    )
}

export function TextArea({...rest}: TextAreaProps){
    return (
        <textarea className={styles.input} {...rest} />
    )
}