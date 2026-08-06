
class Passagem {

    constructor(codigoReserva, assento, valor) {
        this.codigoReserva = codigoReserva;
        this.assento = assento;
        this.valor = valor;
    
        
        this.validada = false;
    }

    confirmarEmbarque() {
        this.validada = true;
        console.log("Passagem " + this.codigoReserva + " foi usada com sucesso.");
    }
}

export default Passagem;