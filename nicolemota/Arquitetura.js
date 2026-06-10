
/* 
=========================================================
RELATÓRIO DE CONSULTORIA ARQUITETURAL
Consultores: [Seu Nome] e [Nome do seu Colega/IA]

1. O que é uma Classe Abstrata e por que a classe genérica 'Voo' não deve ser instanciada no nosso sistema do aeroporto?
R: Uma classe abstrata funciona como um modelo para outras classes, não podendo ser usada para criar objetos diretamente. No aeroporto, 'Voo' é apenas um conceito. Se permitirmos instanciar um 'Voo' genérico, o sistema não saberá se deve cobrar por passageiro ou por carga, gerando erros financeiros.

2. Como o JavaScript usa a propriedade 'new.target' para simular a proteção de uma classe abstrata?
R: O 'new.target' identifica qual classe foi chamada pelo operador 'new'. Se fizermos uma verificação dentro do constructor da classe mãe (Voo), podemos disparar um erro caso o 'new.target' seja a própria classe 'Voo', impedindo sua criação direta, mas permitindo que as classes filhas funcionem.

3. Defina Polimorfismo com suas palavras e explique como ele resolveu o problema das taxas do Cargueiro e do Voo Comercial.
R: Polimorfismo é a capacidade de diferentes classes filhas usarem um método com o mesmo nome (como calcularTaxaEmbarque), mas com comportamentos diferentes. Isso resolveu o problema porque agora cada tipo de voo calcula sua própria taxa de forma justa: o comercial por passageiro e o cargueiro por peso.
=========================================================
*/

// SISTEMA DE TAXAS DO AEROPORTO - VERSÃO CORRIGIDA (ARQUITETURA SÊNIOR)

class Voo {
    constructor(codigo) {
        // SOLUÇÃO PARTE 1: Bloqueio de Instância Direta (Classe Abstrata)
        if (new.target === Voo) {
            throw new Error("🚫 Erro de Arquitetura: Não é possível instanciar um Voo genérico (Voo Fantasma). Escolha Comercial ou Carga.");
        }
        this.codigo = codigo;
    }

    // Método base (será sobrescrito pelo Polimorfismo)
    calcularTaxaEmbarque() {
        throw new Error("O método calcularTaxaEmbarque deve ser implementado na classe filha.");
    }
}

class VooComercial extends Voo {
    constructor(codigo, qtdPassageiros) {
        super(codigo);
        this.qtdPassageiros = qtdPassageiros;
    }

    // SOLUÇÃO PARTE 2: Polimorfismo - Taxa por Passageiro
    calcularTaxaEmbarque() {
        return this.qtdPassageiros * 50.00;
    }
}

class VooCarga extends Voo {
    constructor(codigo, toneladas) {
        super(codigo);
        this.toneladas = toneladas;
    }

    // SOLUÇÃO PARTE 2: Polimorfismo - Taxa por Tonelada
    calcularTaxaEmbarque() {
        return this.toneladas * 120.00;
    }
}

// --- TESTES DE VALIDAÇÃO ---

try {
    console.log("--- 🛫 Testando Proteção de Arquitetura ---");
    
    // Tentativa 1: Isso deve dar erro agora (Voo Fantasma)
    // let vooFantasma = new Voo("GEN-000"); 

    // Tentativa 2: Voo Comercial (Polimorfismo em ação)
    let voo1 = new VooComercial("AZUL-2024", 100);
    console.log(`Voo Comercial ${voo1.codigo}: Taxa R$ ${voo1.calcularTaxaEmbarque()}`);

    // Tentativa 3: Voo de Carga (Polimorfismo em ação)
    let cargueiro = new VooCarga("CARGO-BR", 50); // 50 toneladas
    console.log(`Voo Carga ${cargueiro.codigo}: Taxa R$ ${cargueiro.calcularTaxaEmbarque()}`);

} catch (erro) {
    console.error("ALERTA DE SEGURANÇA:", erro.message);
}