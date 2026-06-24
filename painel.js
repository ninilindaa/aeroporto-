// painel.js
import Voo from './Voo.js'; 

const btnRegistrar = document.getElementById("btn-registrar");
const logTexto = document.getElementById("mensagem-texto");

// Elementos onde o resultado vai aparecer
const resCodigo = document.getElementById("res-codigo");
const resRota = document.getElementById("res-rota");
const resStatus = document.getElementById("res-status");

btnRegistrar.addEventListener("click", () => {
    // 1. Pegando os valores que você digitou nos campos
    const codigoInput = document.getElementById("novo-codigo").value;
    const origemInput = document.getElementById("nova-origem").value;
    const destinoInput = document.getElementById("novo-destino").value;

    try {
        // 2. Tentando criar o voo (Isso vai rodar as validações do Voo.js)
        const meuVoo = new Voo(codigoInput, origemInput, destinoInput);

        // 3. SE NÃO DER ERRO, essa parte aqui é executada e aparece na tela:
        resCodigo.innerText = meuVoo.codigo;
        resRota.innerText = `${meuVoo.origem} ✈️ ${meuVoo.destino}`;
        resStatus.innerText = "Pronto para decolar! ✅";
        
        logTexto.innerText = "Voo validado com sucesso! ✨";
        logTexto.style.color = "green";

    } catch (erro) {
        // 4. SE DER ERRO (ex: cidades iguais), ele pula direto para cá:
        logTexto.innerText = "❌ " + erro.message;
        logTexto.style.color = "red";

        // Limpa o painel de baixo para não mostrar dados errados
        resCodigo.innerText = "---";
        resRota.innerText = "---";
        resStatus.innerText = "Erro no Registro";
    }
});
listaDeVoos = JSON.parse(voosSalvos);


// 1. Converta o array 'listaDeVoos' em um Texto JSON:
let arrayConvertidoEmTexto = JSON.stringify(listaDeVoos);

// 2. Salve esse texto no LocalStorage com a "chave" (nome) de "diario_de_voos":
localStorage.setItem("diario_de_voos", arrayConvertidoEmTexto);


// ========================================================
// DESAFIO 1: O BOOT DO SISTEMA (Carregando a Caixa-Preta)
// ========================================================
let listaDeVoos = []; 

let voosSalvos = localStorage.getItem("diario_de_voos");

if (voosSalvos !== null) {
    // PREENCHIDO: Converte o texto do disco de volta para Array
    listaDeVoos = JSON.parse(voosSalvos);
} else {
    listaDeVoos = [];
}

atualizarPainel(); 


// ========================================================
// DESAFIO 2: SALVANDO UM NOVO VOO (Gravando na Caixa-Preta)
// ========================================================
const formulario = document.getElementById("formDespacho");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault(); 

    let codigoDigitado = document.getElementById("inputCodigo").value;
    let destinoDigitado = document.getElementById("inputDestino").value;

    let novoVoo = { codigo: codigoDigitado, destino: destinoDigitado, status: "Embarque" };

    listaDeVoos.push(novoVoo);
    
    // PREENCHIDO: Transforma o Array em Texto e salva no navegador
    let arrayConvertidoEmTexto = JSON.stringify(listaDeVoos);
    localStorage.setItem("diario_de_voos", arrayConvertidoEmTexto);

    atualizarPainel();
    document.getElementById("inputCodigo").value = "";
    document.getElementById("inputDestino").value = "";
});