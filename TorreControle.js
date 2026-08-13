class TorreDeControle {
    // 1. Criar uma variável estática para armazenar a única instância
    static instancia;

    constructor() {
        // 2. Regra de Ouro do Singleton:
        // Se já existe uma instância, não cria uma nova, retorna a que já existe!
        if (TorreDeControle.instancia) {
            return TorreDeControle.instancia;
        }

        // Se for a primeira vez, inicializa os dados
        this.pistaOcupada = false;
        this.nomeDaTorre = "Torre Central 🎀";
        
        // 3. Salva essa primeira instância na variável estática
        TorreDeControle.instancia = this;
    }

    autorizarPouso(codigoVoo) {
        if (this.pistaOcupada) {
            return `❌ [RECUSADO] Pista ocupada! Voo ${codigoVoo} aguarde.`;
        } else {
            this.pistaOcupada = true;
            return `✅ [AUTORIZADO] Voo ${codigoVoo} pousando via ${this.nomeDaTorre}.`;
        }
    }
}

// TESTE DO CONSERTO:
const torreNorte = new TorreDeControle();
const torreSul = new TorreDeControle();

console.log(torreNorte === torreSul); // Deve retornar TRUE (são a mesma torre agora!)