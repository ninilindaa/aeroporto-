// --- 1. A CLASSE MÃE (BASE PARA TODOS OS VOOS) ---
class Voo {
    constructor(codigo, origem, destino) {
        this.codigo = codigo;
        this.origem = origem;
        this.destino = destino;
        this.altitude = 0;
        this.status = "No Pátio";
    }

    decolar() {
        this.status = "Em Voo";
        this.altitude = 10000;
        return `Voo ${this.codigo} decolou!`;
    }

    pousar() {
        this.status = "Pousado";
        this.altitude = 0;
        return `Voo ${this.codigo} pousou com segurança.`;
    }

    // Desafio de Polimorfismo: Cada um falará algo diferente
    comunicarTorre() {
        return `Torre, aqui é o voo ${this.codigo} solicitando instruções.`;
    }
}

// --- 2. AS SUBCLASSES (HERANÇA) ---

// Jato Executivo herda de Voo
class JatoExecutivo extends Voo {
    constructor(codigo, origem, destino) {
        super(codigo, origem, destino); // super() envia os dados para a classe Voo
        this.modoSupersonico = false;
    }

    ativarSupersonico() {
        this.modoSupersonico = true;
        this.altitude = 50000;
        return "Modo Supersônico ATIVADO! Quebrando a barreira do som.";
    }

    desativarSupersonico() {
        this.modoSupersonico = false;
        this.altitude = 10000;
        return "Modo Supersônico desativado. Voltando à altitude normal.";
    }

    // Sobrescrevendo o método da torre (Polimorfismo)
    comunicarTorre() {
        return `Torre, voo VIP ${this.codigo} na escuta, prioridade de pouso!`;
    }
}

// Voo de Carga herda de Voo
class VooCarga extends Voo {
    constructor(codigo, origem, destino, capacidadeMaxima) {
        super(codigo, origem, destino);
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

    // Sobrescrevendo o método da torre (Polimorfismo)
    comunicarTorre() {
        return `Torre, cargueiro pesado ${this.codigo} se aproximando.`;
    }
}

// --- 3. CRIANDO OS OBJETOS (INSTANCIAÇÃO) ---
// Criamos um jato e um cargueiro específicos
const meuJato = new JatoExecutivo("VIP-777", "Rio de Janeiro", "Nova York");
const meuCargueiro = new VooCarga("CARGO-101", "Santos", "Lisboa", 50); // 50 toneladas de limite

// --- 4. FUNÇÕES PARA A INTERFACE (DOM) ---
// Essas funções ligam os botões do HTML com o código acima

function acaoJato(comando) {
    let mensagem = "";
    if (comando === 'decolar') mensagem = meuJato.decolar();
    if (comando === 'pousar') mensagem = meuJato.pousar();
    if (comando === 'ativar') mensagem = meuJato.ativarSupersonico();
    if (comando === 'desativar') mensagem = meuJato.desativarSupersonico();
    if (comando === 'torre') mensagem = meuJato.comunicarTorre();

    // Atualiza o HTML do Jato
    document.getElementById('status-jato').innerText = meuJato.status;
    document.getElementById('alt-jato').innerText = meuJato.altitude;
    document.getElementById('modo-jato').innerText = meuJato.modoSupersonico
    }
