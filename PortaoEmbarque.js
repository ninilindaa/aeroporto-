

class PortaoEmbarque {
  
    constructor(codigoPortao) {
        this.codigoPortao = codigoPortao;
        this.estaAberto = false;
        this.vooVinculado = null;
    }

    liberarEntrada(idVoo) {
        this.vooVinculado = idVoo;
        this.estaAberto = true;
        console.log("Portão " + this.codigoPortao + " liberado para o voo " + idVoo);
    }
}

export default PortaoEmbarque;