import Voo from './Voo.js';

export default class Aeroporto {
    constructor(nomeDaBase) {
        this.nome = nomeDaBase;
        this.listaDeVoos = []; 
    }

    // DESAFIO 1: Adicionar voo
    adicionarVooNoRadar(novoVoo) {
        this.listaDeVoos.push(novoVoo);
        console.log(`Voo ${novoVoo.codigo} adicionado ao radar do aeroporto ${this.nome}.`);
    }

    // DESAFIO 2: Buscar voo
    buscarVoo(codigoProcurado) {
        // .find() procura o voo pelo código
        let vooEncontrado = this.listaDeVoos.find(v => v.codigo === codigoProcurado);
        
        if (vooEncontrado) {
            return vooEncontrado;
        } else {
            return `ERRO: Voo ${codigoProcurado} não detectado!`;
        }
    }
}