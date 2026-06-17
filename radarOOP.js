// =========================================================
// SISTEMA DE RADAR OOP - ARQUITETURA CORRIGIDA E ENCAPSULADA
// =========================================================

class Voo {
    // Atributo privado. Ninguém fora da classe pode alterá-lo diretamente.
    #status;

    constructor(codigo, destino) {
        this.codigo = codigo;
        this.destino = destino;
        this.#status = "Aguardando Leitura do Radar";
    }

    // Getter seguro para expor o status apenas para leitura
    get status() { 
        return this.#status; 
    }

    // ENCAPSULAMENTO PERFEITO: A regra de negócio mora aqui dentro!
    avaliarCondicoesClimaticas(velocidadeDoVento) {
        if (velocidadeDoVento > 80) {
            this.#status = "CANCELADO - Risco de Ciclone";
        } else {
            this.#status = "Liberado para Decolagem";
        }
    }
}

// ---------------------------------------------------------
// SIMULAÇÃO DO SISTEMA PRINCIPAL
// ---------------------------------------------------------

// Simulação de dados brutos chegando da Internet (JSON)
const dadosDaApi = [
    { id_voo: "G3-111", cidade: "Curitiba", vento_kmh: 90 },
    { id_voo: "LA-222", cidade: "São Paulo", vento_kmh: 40 }
];

console.log("✈️ Processando dados do Radar Global...\n");

// Array que armazenará os nossos "Objetos Ricos" (Instâncias Reais)
const listaDeVoosHidratados = [];

for (let i = 0; i < dadosDaApi.length; i++) {
    const dadoBruto = dadosDaApi[i];
    
    // CORREÇÃO DO ERRO 1 (Hidratação): Criamos uma instância real usando o 'new Voo()'
    const vooInstancia = new Voo(dadoBruto.id_voo, dadoBruto.cidade);
    
    // CORREÇÃO DO ERRO 2 (Delegação): Chamamos o método correto da classe.
    // O 'if' horroroso sumiu daqui. Quem decide o status agora é o próprio Voo.
    vooInstancia.avaliarCondicoesClimaticas(dadoBruto.vento_kmh); 
    
    // Guardamos o objeto rico, seguro e validado na nossa lista
    listaDeVoosHidratados.push(vooInstancia);
}

// ---------------------------------------------------------
// EXIBIÇÃO NO PAINEL DO AEROPORTO
// ---------------------------------------------------------
console.log("📋 PAINEL DE VÔOS ATUALIZADO VIA OOP:");
listaDeVoosHidratados.forEach(voo => {
    console.log(`Voo ${voo.codigo} para ${voo.destino} | Status: ${voo.status}`);
});