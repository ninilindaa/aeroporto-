// Voo.js
export default class Voo {
    constructor(codigo, origem, destino) {
        if (codigo === "") {
            throw new Error("O voo precisa de um código!");
        }
        if (origem.toLowerCase() === destino.toLowerCase()) {
            throw new Error("A origem não pode ser igual ao destino!");
        }

        this.codigo = codigo.toUpperCase();
        this.origem = origem;
        this.destino = destino;
    }
}