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