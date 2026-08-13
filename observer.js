// SISTEMA DE NOTIFICAÇÃO ANTIGO - ALTAMENTE ACOPLADO
class Voo {
    constructor(id, status) {
        this.id = id;
        this.status = status;
    }

    // O PROBLEMA: A classe Voo conhece detalhes de todos os outros sistemas!
    atualizarStatus(novoStatus) {
        this.status = novoStatus;
        console.log(`\n📢 Status do Voo ${this.id} alterado para: ${novoStatus}`);
        
        // Chamadas manuais e rígidas (se um sistema falha, o voo trava!)
        this.notificarPainelAeroporto();
        this.notificarAppPassageiro();
        this.notificarEquipeLimpeza();
    }

    notificarPainelAeroporto() { console.log("🖥️ [PAINEL] Atualizando portão no saguão..."); }
    notificarAppPassageiro() { console.log("📱 [APP] Enviando Push Notification para passageiros..."); }
    notificarEquipeLimpeza() { console.log("🧹 [LIMPEZA] Equipe enviada para o novo portão..."); }
}

const vooG3 = new Voo("G3-1500", "Embarcando");
vooG3.atualizarStatus("Portão Alterado");