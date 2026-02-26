// 1. Definição da Classe Voo
class Voo {
    constructor(codigo, origem, destino) {
        // Atributos (Características)
        this.codigo = codigo;
        this.origem = origem;
        this.destino = destino;
        this.status = "No Solo";
        this.altitude = 0;
    }

    // Método para atualizar a interface (DOM)
    atualizarPainel() {
        document.getElementById("txt-codigo").innerText = this.codigo;
        document.getElementById("txt-origem").innerText = this.origem;
        document.getElementById("txt-destino").innerText = this.destino;
        document.getElementById("txt-status").innerText = this.status;
        document.getElementById("txt-altitude").innerText = this.altitude;

        const img = document.getElementById("img-aviao");
        const txtStatus = document.getElementById("txt-status");

        // Lógica visual baseada no estado do objeto
        if (this.status === "Em Voo") {
            img.classList.add("voando");
            txtStatus.className = "status-voo";
        } else {
            img.classList.remove("voando");
            txtStatus.className = "status-solo";
        }
    }

    // Método para Decolar
    decolar() {
        if (this.status === "No Solo") {
            this.status = "Em Voo";
            this.altitude = 500;
            console.log(`Voo ${this.codigo} decolou com sucesso!`);
            this.atualizarPainel();
        } else {
            alert("O avião já está no ar!");
        }
    }

    // Método para Ganhar Altitude
    ganharAltitude() {
        if (this.status === "Em Voo") {
            this.altitude += 1000;
            console.log(`Altitude atual: ${this.altitude} pés.`);
            this.atualizarPainel();
        } else {
            alert("O avião precisa decolar primeiro!");
        }
    }

    // Método para Pousar
    pousar() {
        if (this.status === "Em Voo") {
            this.status = "No Solo";
            this.altitude = 0;
            console.log(`Voo ${this.codigo} pousou em ${this.destino}.`);
            this.atualizarPainel();
        } else {
            alert("O avião já está no solo!");
        }
    }
}

// 2. Criando o Objeto (Instanciando a Classe)
const meuVoo = new Voo("AD-2024", "São Paulo (GRU)", "Lisboa (LIS)");

// 3. Inicializar o painel na tela
meuVoo.atualizarPainel();