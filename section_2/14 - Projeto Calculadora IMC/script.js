/*
    Abaixo de 17: Muito abaixo do Peso
    Entre 17 e 18,49 : Abaixo do Peso
    Entre 18,5 e 24,99 : Peso normal
    Entre 25 e 29,99 : Acima do Peso   

    peso / (altura*altura)
*/

let peso;
let altura;
let imc;
let resultado;

function handleSubmit(event){
    event.preventDefault();

    let peso = document.getElementById("id_peso").value;
    console.log(peso)
    let altura = document.getElementById("id_altura").value;
    console.log(altura)
    
    
    imc = peso / ( altura * altura);
    if(imc < 17){
        document.getElementById("id_resultado").
                    innerHTML = "<br/>Seu resultado foi<br/>".
                        concat("IMC: ".
                        concat(imc.toFixed(2).
                        concat("- Muito abaixo do Peso")));
    }else if(imc >= 17 && imc <= 18.49){
        document.getElementById("id_resultado").
                    innerHTML = "<br/>Seu resultado foi<br/>".
                        concat("IMC: ".
                        concat(imc.toFixed(2).
                        concat("- Abaixo do Peso")));
    }else if(imc >= 19.5 && imc <= 24.99){
        document.getElementById("id_resultado").
                    innerHTML = "<br/>Seu resultado foi<br/>".
                        concat("IMC: ".
                        concat(imc.toFixed(2).
                        concat("- Peso normal")));
    }else if(imc >= 25 && imc <= 29.99){
        document.getElementById("id_resultado").
                    innerHTML = "<br/>Seu resultado foi<br/>".
                        concat("IMC: ".
                        concat(imc.toFixed(2).
                        concat("- Acima do Peso")));
    }

}