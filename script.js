// --- 1. CLASSES ---
class Voo {
    constructor(codigo, origem, destino) {
        this.codigo = codigo;
        this.origem = origem;
        this.destino = destino || "Destino Não Informado";
        this.altitude = 0;
        this.status = "No Pátio";
    }
    decolar() {
        this.status = "Nas Nuvens ☁️";
        this.altitude = 10000;
        return `O voo ${this.codigo} saiu de ${this.origem} e está brilhando no céu!`;
    }
    pousar() {
        this.status = "Descansando";
        this.altitude = 0;
        return `O voo ${this.codigo} chegou em ${this.destino} com segurança! 💖`;
    }
    comunicarTorre() {
        return `Oi Torre! Aqui é o voo ${this.codigo} pedindo licença! ✨`;
    }
}

class JatoExecutivo extends Voo {
    constructor(codigo, origem, destino) {
        super(codigo, origem, destino);
        this.modoSupersonico = false;
    }
    ativarSupersonico() {
        this.modoSupersonico = true;
        this.altitude = 55000;
        return "🌈 UAU! Estamos quebrando a barreira do som!";
    }
    desativarSupersonico() {
        this.modoSupersonico = false;
        this.altitude = 10000;
        return "Voltando para a velocidade fofinha.";
    }
}

class VooCarga extends Voo {
    constructor(codigo, origem, destino, capacidadeMaxima) {
        super(codigo, origem, destino);
        this.capacidadeMaxima = capacidadeMaxima;
        this.cargaAtual = 0;
    }
    embarcarCarga(toneladas) {
        if (this.cargaAtual + toneladas <= this.capacidadeMaxima) {
            this.cargaAtual += toneladas;
            return `✅ Oba! ${toneladas}t de mimos embarcados!`;
        }
        return `❌ Poxa, o limite é ${this.capacidadeMaxima}t.`;
    }
}

class VooSeguro {
    #codigo; #combustivel;
    constructor(codigo) { this.#codigo = codigo; this.#combustivel = 100; }
    get lerCombustivel() { return `O tanque do voo ${this.#codigo} está em ${this.#combustivel}%`; }
    get apenasCodigo() { return this.#codigo; }
    set abastecer(q) { this.#combustivel = Math.min(100, this.#combustivel + q); }
    set gastar(q) { this.#combustivel = Math.max(0, this.#combustivel - q); }
}

// --- 2. INSTÂNCIAS ---
const meuJato = new JatoExecutivo("VIP-PINK", "Paris", "Tóquio");
const meuCargueiro = new VooCarga("CANDY-77", "Brasil", "Disney", 200);
const meuVooSeguro = new VooSeguro("SAFE-001");

// --- 3. INICIALIZAÇÃO DA TELA ---
window.onload = function() {
    document.getElementById('id-jato').innerText = meuJato.codigo;
    document.getElementById('id-carga').innerText = meuCargueiro.codigo;
    document.getElementById('cap-max').innerText = meuCargueiro.capacidadeMaxima;
    document.getElementById('id-seguro').innerText = meuVooSeguro.apenasCodigo;
    document.getElementById('painelCombustivel').innerText = meuVooSeguro.lerCombustivel;
};

// --- 4. FUNÇÕES DE CONTROLE (O que o HTML clica) ---
function exibir(msg) { document.getElementById('mensagem-texto').innerText = msg; }

window.controlarJato = function(acao) {
    if (acao === 'decolar') exibir(meuJato.decolar());
    if (acao === 'pousar') exibir(meuJato.pousar());
    if (acao === 'ativar') exibir(meuJato.ativarSupersonico());
    if (acao === 'desativar') exibir(meuJato.desativarSupersonico());
    if (acao === 'torre') exibir(meuJato.comunicarTorre());

    document.getElementById('status-jato').innerText = meuJato.status;
    document.getElementById('alt-jato').innerText = meuJato.altitude;
    document.getElementById('modo-jato').innerText = meuJato.modoSupersonico ? "ATIVADO 🌈" : "DESATIVADO";
}

window.controlarCarga = function(acao) {
    if (acao === 'embarcar') {
        const peso = parseFloat(document.getElementById('input-peso').value);
        exibir(meuCargueiro.embarcarCarga(peso || 0));
        document.getElementById('carga-info').innerText = meuCargueiro.cargaAtual;
    }
    if (acao === 'decolar') exibir(meuCargueiro.decolar());
    if (acao === 'pousar') exibir(meuCargueiro.pousar());
    if (acao === 'torre') exibir(meuCargueiro.comunicarTorre());
    document.getElementById('status-carga').innerText = meuCargueiro.status;
}

window.controlarSeguro = function(acao) {
    if (acao === 'abastecer') meuVooSeguro.abastecer = 10;
    if (acao === 'gastar') meuVooSeguro.gastar = 15;
    document.getElementById('painelCombustivel').innerText = meuVooSeguro.lerCombustivel;
}