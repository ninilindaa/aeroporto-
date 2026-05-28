// 1. IMPORTAÇÕES (Sempre na primeira linha)
import Voo from './models/Voo.js';
import Aeroporto from './models/Aeroporto.js';

// --- DESAFIO DO RADAR (T2.P1.A2) ---
// Criando o aeroporto
let aeroportoCWB = new Aeroporto("Afonso Pena");

// Criando os voos para o radar
let voo1 = new Voo("G3-100", "São Paulo");
let voo2 = new Voo("LA-200", "Rio de Janeiro");

// Testando o Desafio 1 (Adicionar ao radar)
aeroportoCWB.adicionarVooNoRadar(voo1);
aeroportoCWB.adicionarVooNoRadar(voo2);

// Testando o Desafio 2 (Buscar no radar)
console.log("--- BUSCANDO VOO NO RADAR ---");
let vooAchado = aeroportoCWB.buscarVoo("LA-200");
console.log(vooAchado); 


// --- SUA LÓGICA DE CLASSES (HERANÇA) ---

// Voo de Carga herda de Voo
class VooCarga extends Voo {
    constructor(codigo, origem, destino, capacidadeMaxima) {
        super(codigo, destino); // Voo original recebe codigo e destino
        this.origem = origem;
        this.capacidadeMaxima = capacidadeMaxima;
        this.cargaAtual = 0;
    }

    embarcarCarga(toneladas) {
        if (this.cargaAtual + toneladas <= this.capacidadeMaxima) {
            this.cargaAtual += toneladas;
            return `Sucesso! ${toneladas}t embarcadas. Total: ${this.cargaAtual}t.`;
        } else {
            return `ERRO: Capacidade excedida! Máximo: ${this.capacidadeMaxima}t.`;
        }
    }

    comunicarTorre() {
        return `Torre, cargueiro pesado ${this.codigo} se aproximando.`;
    }
}

// Simulando a classe JatoExecutivo (para não dar erro no seu acaoJato)
class JatoExecutivo extends Voo {
    constructor(codigo, destino) {
        super(codigo, destino);
        this.altitude = 0;
        this.modoSupersonico = false;
    }
    decolar() { this.status = "Em voo"; this.altitude = 10000; return "Decolando..."; }
    pousar() { this.status = "No solo"; this.altitude = 0; return "Pousando..."; }
    ativarSupersonico() { this.modoSupersonico = true; return "Modo supersônico ATIVADO!"; }
    desativarSupersonico() { this.modoSupersonico = false; return "Modo supersônico desativado."; }
    comunicarTorre() { return "Jato executivo solicitando prioridade."; }
}

// INSTANCIAÇÃO
const meuJato = new JatoExecutivo("VIP-777", "Nova York");
const meuCargueiro = new VooCarga("CARGO-101", "Santos", "Lisboa", 50);

// --- FUNÇÕES DE INTERFACE (DOM) ---

function acaoJato(comando) {
    let mensagem = "";
    if (comando === 'decolar') mensagem = meuJato.decolar();
    if (comando === 'pousar') mensagem = meuJato.pousar();
    if (comando === 'ativar') mensagem = meuJato.ativarSupersonico();
    if (comando === 'desativar') mensagem = meuJato.desativarSupersonico();
    if (comando === 'torre') mensagem = meuJato.comunicarTorre();

    // Atualiza o HTML (Garanta que esses IDs existam no seu index.html)
    if(document.getElementById('status-jato')) document.getElementById('status-jato').innerText = meuJato.status;
    if(document.getElementById('alt-jato')) document.getElementById('alt-jato').innerText = meuJato.altitude;
    if(document.getElementById('modo-jato')) document.getElementById('modo-jato').innerText = meuJato.modoSupersonico ? "Ativado" : "Desativado";
    
    console.log(mensagem);
}

// IMPORTANTE: Quando usamos type="module", as funções ficam "escondidas". 
// Para o botão do HTML conseguir clicar nelas, precisamos anexá-las à janela (window):
window.acaoJato = acaoJato;