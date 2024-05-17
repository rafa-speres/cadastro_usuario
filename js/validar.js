//criando os objetos dos elementos de texto do form

var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var barraSenha = document.querySelector("#passStrengthMeter")


/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
nome.addEventListener('focusout', validarNome);

/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/

function validarNome(e){ 
    //declaração da expressão regular para definir o formato de um nome válido
    const regexNome = /^[A-Z][a-zA-Z]$/;
    
    console.log(e); //impressão em console do objeto evento e
    console.log(e.target.value); //impressão em console do valor do objeto 'nome' que originou o evento   

    if(e.target.value.trim().match(regexNome)==null || e.target.value.trim().length <= 6){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "Formato de nome inválido"; 
        nomeHelp.style.color="red";
    }
    else{
        nomeHelp.textContent = "";
    }       
}

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validarNome*/

//declaração de função de forma anônima usando uma expressão de função de seta =>

ano.addEventListener('focusout', () => {
    //declaração da expressão regular para definir o formato de um ano válido
    const regexAno = /^(19[0-9][0-9]|20[0-1][0-9]|202[0-4])$/;
    //tirar (trim) espaços em branco antes e depois da string
    const anoTrimado = ano.value.trim();
    console.log(ano.value);

    if(anoTrimado.match(regexAno)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
        anoHelp.textContent = "Formato de ano inválido";
        anoHelp.style.color="red";
    }
    else{
        //objeto Date
        var date = new Date();
        //obtem o ano atual
        console.log(date.getFullYear()); 
        
        if( parseInt(anoTrimado) > parseInt(date.getFullYear()) ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${date.getFullYear()}.`;
            anoHelp.style.color="red";
        }
        else if( parseInt(anoTrimado) < parseInt(date.getFullYear())-120 ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${date.getFullYear()-120}.`;
            anoHelp.style.color="red";
        }
        else{
            anoHelp.textContent="";
        }        
        
    }
}
);
//declarando o evento listener para o email
email.addEventListener('focusout', validarEmail);

function validarEmail(e){
    const regexEmail = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(br|com|net|org)/;

    console.log(e); //impressão em console do objeto evento e
    console.log(e.target.value); //impressão em console do valor do objeto 'email' que originou o evento   

    if(e.target.value.trim().match(regexEmail)==null){

        emailHelp.textContent = "Formato de email inválido"; 
        emailHelp.style.color="red";
    }
    else{
        emailHelp.textContent = "";
    }     
}

senha.addEventListener('focusout', validarSenha);

function validarSenha(e) {
    // Extrair o valor do campo de senha
    const senhaValue = e.target.value.trim();

    // Obter nome e ano do usuário
    const nomeValue = nome.value.trim();
    const anoValue = ano.value.trim();

    // Expressão regular para verificar se a senha contém o nome ou o ano do usuário
    const regexNomeAno = new RegExp(`(${nomeValue}|${anoValue})`, 'i');

    // Critérios para validação da senha
    const possuiCaractereEspecial = /[@#%&!+]/.test(senhaValue);
    const numeroCaracteresEspeciais = (senhaValue.match(/[@#%&!+]/g) || []).length;
    const possuiNumero = /\d/.test(senhaValue);
    const numeroNumeros = (senhaValue.match(/\d/g) || []).length;
    const possuiLetra = /[a-zA-Z]/.test(senhaValue);
    const numeroLetrasMaiusculas = (senhaValue.match(/[A-Z]/g) || []).length;
    const temTamanhoCorreto = senhaValue.length >= 6 && senhaValue.length <= 20;
    const naoContemNomeOuAno = !regexNomeAno.test(senhaValue);

    // Verificar se a senha atende a todos os critérios
    if (
        possuiCaractereEspecial &&
        numeroCaracteresEspeciais > 0 &&
        possuiNumero &&
        numeroNumeros > 0 &&
        possuiLetra &&
        temTamanhoCorreto &&
        naoContemNomeOuAno
    ) {
        let nivelSeguranca = "";
        if (senhaValue.length > 12 && numeroNumeros>1 && numeroCaracteresEspeciais > 1 && numeroLetrasMaiusculas>1) {
            senhaHelp.textContent = "Senha forte"
            nivelSeguranca = "forte";
            barraSenha.value = 30;
        }else if (senhaValue.length >= 8 && numeroNumeros>0 && numeroCaracteresEspeciais > 0 && numeroLetrasMaiusculas>0) {
            senhaHelp.textContent = "Senha moderada"
            nivelSeguranca = "moderada";
            barraSenha.value = 21;
        } else {
            senhaHelp.textContent = "Senha fraca"
            nivelSeguranca = "fraca";
            barraSenha.value = 10;
        }
        return nivelSeguranca;
    } else {
        senhaHelp.textContent = "Senha inválida";
        barraSenha.value = 0;
    }
}

document.querySelector('button[type="submit"]').addEventListener('click', function(event) {
    event.preventDefault();
    if (nomeHelp.textContent === "" && anoHelp.textContent === "" && emailHelp.textContent === "" && senhaHelp.textContent !== "Senha inválida") {
        document.getElementById("inputResult").textContent = "Parabéns seus dados foram registrados :)";
    } else {
        document.getElementById("inputResult").textContent = "Por favor, corrija os campos.";
    }
});
