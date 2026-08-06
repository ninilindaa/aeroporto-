/* 
=========================================================
RELATÓRIO DE AUDITORIA (SERIALIZAÇÃO E RE-HIDRATAÇÃO)
Auditores: [Seu Nome] e [IA Gemini]

1. Por que o formato JSON (JSON.stringify) não consegue salvar "métodos" (funções) de uma classe, salvando apenas os "atributos" (dados textuais)?
R: O JSON foi projetado para ser um formato de troca de dados simples e universal. Funções contêm lógica de execução e dependem do contexto da memória (escopo). Para manter a segurança e a leveza, o JSON descarta funções e salva apenas os valores (strings, números, etc).

2. O que o JavaScript perde na memória quando converte um Objeto para JSON? (Explique o que é o Prototype).
R: Perde o Prototype (Protótipo). O Prototype é o que liga um objeto à sua classe "mãe". Quando vira JSON, essa ligação é cortada. O objeto deixa de ser uma instância de "Voo" e vira um objeto genérico (POJO), perdendo o acesso aos métodos que estavam na classe.

3. Defina o que é "Re-hidratar um Objeto". Como nós consertamos o código do Júnior aplicando essa técnica?
R: Re-hidratar é o processo de pegar os dados crus do JSON e usá-los para criar uma nova instância real da classe usando o comando 'new'. No código, nós pegamos o código e a origem do objeto "morto" e criamos um 'new Voo(dados.codigo, dados.origem)', devolvendo a ele seus "poderes" (métodos).
=========================================================
*/

// Esperar o botão aparecer na tela para garantir que o código funcione
document.addEventListener("DOMContentLoaded", function() {
    
    const btnRegistrar = document.getElementById('btn-registrar');

    if (btnRegistrar) {
        btnRegistrar.addEventListener('click', () => {
            console.log("--- Iniciando Processo de Logbook ---");

            // 1. Pegar dados dos inputs
            const cod = document.getElementById('novo-codigo').value;
            const ori = document.getElementById('nova-origem').value;
            const des = document.getElementById('novo-destino').value;

            if (!cod || !ori) {
                alert("Por favor, preencha o código e a origem! ✈️");
                return;
            }

            // 2. CRIAR O OBJETO ORIGINAL (Ele tem métodos!)
            const vooOriginal = new Voo(cod, ori, des);
            console.log("Voo Original Criado:", vooOriginal);

            // 3. SALVAR NO DISCO (Stringify - Aqui os métodos "morrem")
            localStorage.setItem("meuLogbook", JSON.stringify(vooOriginal));
            console.log("Voo salvo no LocalStorage (em formato de texto).");

            // 4. LER DO DISCO (Parse - O objeto volta sem métodos)
            const dadosDoDisco = JSON.parse(localStorage.getItem("meuLogbook"));
            console.log("Objeto recuperado (Morto/Sem métodos):", dadosDoDisco);

            // 5. TENTAR USAR O MÉTODO (Vai dar erro no console, por isso usamos Try/Catch)
            try {
                console.log("Tentando decolar o objeto vindo do disco...");
                dadosDoDisco.decolar(); 
            } catch (erro) {
                console.error("❌ ERRO DO JÚNIOR CONFIRMADO: " + erro.message);
                document.getElementById('mensagem-texto').innerText = "Pane no Sistema! O objeto perdeu os métodos. Veja o console (F12).";
            }

            // 6. A CURA (RE-HIDRATAÇÃO)
            console.log("Aplicando Re-hidratação...");
            // Criamos um novo objeto REAL usando a classe Voo e os dados que salvamos
            const vooHidratado = new Voo(dadosDoDisco.codigo, dadosDoDisco.origem, dadosDoDisco.destino);
            
            // Restauramos o status que estava salvo (caso não fosse o padrão)
            vooHidratado.status = dadosDoDisco.status;

            // 7. AGORA O MÉTODO VOLTA A FUNCIONAR!
            const mensagemSucesso = vooHidratado.decolar();
            console.log("✅ Sucesso! Voo Re-hidratado decolou.");

            // 8. ATUALIZAR A TELA
            document.getElementById('res-codigo').innerText = vooHidratado.codigo;
            document.getElementById('res-rota').innerText = `${vooHidratado.origem} para ${vooHidratado.destino}`;
            document.getElementById('res-status').innerText = vooHidratado.status;
            document.getElementById('mensagem-texto').innerText = "Objeto Re-hidratado: " + mensagemSucesso;
        });
    } else {
        console.error("Botão 'btn-registrar' não encontrado! Verifique se o ID no HTML está correto.");
    }
});