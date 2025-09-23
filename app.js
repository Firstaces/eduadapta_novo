// ====== Util: toast ======
function mostrarMensagem(texto, tipo = "info") {
  const cores = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };
  const mensagem = document.createElement("div");
  mensagem.className = `fixed top-4 right-4 ${cores[tipo]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
  mensagem.textContent = texto;
  document.body.appendChild(mensagem);
  setTimeout(() => mensagem.classList.remove("translate-x-full"), 50);
  setTimeout(() => {
    mensagem.classList.add("translate-x-full");
    setTimeout(() => mensagem.remove(), 300);
  }, 3000);
}

// ====== Navegação suave ======
function smoothScroll(target) {
  const el = document.querySelector(target);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ====== Kiwify ======
const linksKiwify = {
  matematica: "https://pay.kiwify.com.br/txcrsAa",
  portugues: "https://pay.kiwify.com.br/DV9ypUt",
  ciencias: "https://pay.kiwify.com.br/cvNKE4d",
  completo: "https://pay.kiwify.com.br/zj7MksG",
  escola: "https://pay.kiwify.com.br/E07JP7j",
};

function comprarKit(tipo) {
  const url = linksKiwify[tipo];
  if (url) window.open(url, "_blank", "noopener");
  else
    mostrarMensagem("Link de compra não configurado para este kit.", "error");
}

// ====== Atividades: abrir em nova aba ======
function abrirAtividadeEmNovaAba(materia) {
  const html = gerarAtividadeHTML(materia);

  // se por algum motivo vier vazio, evita abrir página em branco
  if (!html || !html.trim()) {
    mostrarMensagem(
      "Não gerou conteúdo da atividade. Tente novamente.",
      "error"
    );
    return;
  }

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const win = window.open(url, "_blank", "noopener");
  if (!win) {
    mostrarMensagem(
      "O navegador bloqueou a abertura. Ative pop-ups e tente de novo.",
      "error"
    );
    URL.revokeObjectURL(url);
    return;
  }

  // libera o URL depois de um tempinho
  setTimeout(() => URL.revokeObjectURL(url), 60 * 1000);
  mostrarMensagem(
    "Abrimos a atividade em nova aba. Use Imprimir → Salvar como PDF.",
    "success"
  );
}

// ====== (Opcional) Baixar como .html local ======
// function baixarAtividadeHTML(materia) {
//   const html = gerarAtividadeHTML(materia);
//   const nomes = {
//     matematica: 'EduAdapta-Matematica-Consumo-Combustivel.html',
//     portugues: 'EduAdapta-Portugues-Interpretacao-Texto.html',
//     ciencias: 'EduAdapta-Ciencias-Sistema-Digestivo.html'
//   };
//   const blob = new Blob([html], { type: 'text/html' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = nomes[materia] || 'EduAdapta-Atividade.html';
//   document.body.appendChild(a);
//   a.click();
//   a.remove();
//   URL.revokeObjectURL(url);
//   mostrarMensagem('📥 Arquivo HTML baixado. Abra no navegador e salve como PDF se quiser.', 'success');
// }

// ====== Geração do HTML das atividades ======
function gerarAtividadeHTML(materia) {
  let titulo = "";
  let conteudo = "";

  if (materia === "matematica") {
    titulo = "Matemática - Consumo de Combustível";
    conteudo = `
      <div style="max-width: 800px; margin: 0 auto; line-height: 1.6;">
        <h1 style="color: #2563eb; text-align: center; margin-bottom: 30px;">🧮 EduAdapta - Matemática</h1>
        <div style="background: #dbeafe; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
          <h2 style="color: #1e40af; margin-top: 0;">📊 Atividade: Consumo de Combustível</h2>
          <p><strong>Objetivo:</strong> Aprender sobre função linear através do consumo de combustível</p>
          <p><strong>Tempo:</strong> 45 minutos</p>
          <p><strong>Nível:</strong> Ensino Médio Adaptado</p>
        </div>
        <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #374151;">📖 Situação-Problema</h3>
          <p>João trabalha como motorista de aplicativo. Ele precisa calcular quanto gasta de combustível para planejar suas viagens.</p>
          <p><strong>Dados importantes:</strong></p>
          <ul>
            <li>O carro de João faz 12 km com 1 litro de gasolina</li>
            <li>O preço da gasolina é R$ 5,50 por litro</li>
            <li>João quer saber quanto gastará em diferentes distâncias</li>
          </ul>
        </div>
        <div style="background: #fff7ed; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #ea580c;">🤔 Questões para Resolver</h3>
          <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px;">
            <p><strong>Questão 1:</strong> Se João rodar 60 km, quantos litros de gasolina ele gastará?</p>
            <p style="margin-left: 20px;">a) 3 litros<br>b) 5 litros<br>c) 7 litros<br>d) 10 litros</p>
          </div>
          <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px;">
            <p><strong>Questão 2:</strong> Quanto João gastará em dinheiro para rodar 60 km?</p>
            <p style="margin-left: 20px;">a) R$ 22,50<br>b) R$ 27,50<br>c) R$ 33,00<br>d) R$ 38,50</p>
          </div>
          <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px;">
            <p><strong>Questão 3:</strong> Se João tem R$ 55,00 para gasolina, quantos quilômetros ele pode rodar?</p>
            <p style="margin-left: 20px;">a) 100 km<br>b) 120 km<br>c) 140 km<br>d) 160 km</p>
          </div>
        </div>
        <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #16a34a;">✅ Respostas e Explicações</h3>
          <div style="margin-bottom: 15px;">
            <p><strong>Resposta 1: b) 5 litros</strong></p>
            <p><em>Explicação:</em> 60 km ÷ 12 km/litro = 5 litros</p>
          </div>
          <div style="margin-bottom: 15px;">
            <p><strong>Resposta 2: b) R$ 27,50</strong></p>
            <p><em>Explicação:</em> 5 litros × R$ 5,50 = R$ 27,50</p>
          </div>
          <div style="margin-bottom: 15px;">
            <p><strong>Resposta 3: b) 120 km</strong></p>
            <p><em>Explicação:</em> R$ 55,00 ÷ R$ 5,50 = 10 litros<br>10 litros × 12 km/litro = 120 km</p>
          </div>
        </div>
        <div style="background: #fef3c7; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #d97706;">💡 Dica para o Professor</h3>
          <p>Esta atividade trabalha função linear de forma prática. Você pode usar objetos concretos como carrinhos de brinquedo e recipientes para representar litros, ajudando na visualização do conceito.</p>
        </div>
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #e0e7ff; border-radius: 10px;">
          <p><strong>🎯 Esta é uma amostra gratuita do EduAdapta!</strong></p>
          <p>Acesse <strong>www.eduadapta.com.br</strong> para mais atividades adaptadas</p>
          <p style="font-size: 14px; color: #6b7280;">Material baseado na BNCC - Ensino Médio Adaptado</p>
        </div>
      </div>
    `;
  } else if (materia === "portugues") {
    titulo = "Português - Interpretação de Texto";
    conteudo = `
      <div style="max-width: 800px; margin: 0 auto; line-height: 1.6;">
        <h1 style="color: #059669; text-align: center; margin-bottom: 30px;">📚 EduAdapta - Português</h1>
        <div style="background: #d1fae5; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
          <h2 style="color: #047857; margin-top: 0;">📖 Atividade: Interpretação de Texto</h2>
          <p><strong>Objetivo:</strong> Desenvolver habilidades de leitura e interpretação</p>
          <p><strong>Tempo:</strong> 40 minutos</p>
          <p><strong>Nível:</strong> Ensino Médio Adaptado</p>
        </div>
        <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #374151;">📝 Texto: "O Primeiro Dia de Trabalho"</h3>
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #059669;">
            <p>Maria acordou muito cedo naquela segunda-feira. Era seu primeiro dia de trabalho na padaria do seu João. Ela estava nervosa, mas também muito animada.</p>
            <p>Chegou à padaria às 6 horas da manhã. Seu João a recebeu com um sorriso e disse:</p>
            <p>— Bom dia, Maria! Seja bem-vinda! Hoje você vai aprender a organizar os pães na vitrine e atender os clientes.</p>
            <p>Maria colocou o avental e começou a trabalhar. Primeiro, ela organizou os pães franceses, depois os doces e por último os bolos. Os primeiros clientes chegaram às 6h30.</p>
            <p>— Bom dia! O que a senhora deseja? — perguntou Maria para a primeira cliente.</p>
            <p>— Quero 10 pães franceses e um bolo de chocolate — respondeu a senhora.</p>
            <p>Maria ficou feliz. Seu primeiro atendimento havia sido um sucesso! Ao final do dia, seu João disse que ela havia se saído muito bem e que podia voltar no dia seguinte.</p>
          </div>
        </div>
        <div style="background: #fff7ed; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #ea580c;">🤔 Questões de Interpretação</h3>
          <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px;">
            <p><strong>Questão 1:</strong> Em que dia da semana Maria começou a trabalhar?</p>
            <p style="margin-left: 20px;">a) Domingo<br>b) Segunda-feira<br>c) Terça-feira<br>d) Sábado</p>
          </div>
          <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px;">
            <p><strong>Questão 2:</strong> Que horas Maria chegou à padaria?</p>
            <p style="margin-left: 20px;">a) 5h30<br>b) 6h00<br>c) 6h30<br>d) 7h00</p>
          </div>
          <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px;">
            <p><strong>Questão 3:</strong> Qual foi a primeira tarefa de Maria?</p>
            <p style="margin-left: 20px;">a) Atender clientes<br>b) Fazer pães<br>c) Organizar pães na vitrine<br>d) Limpar a padaria</p>
          </div>
          <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px;">
            <p><strong>Questão 4:</strong> O que a primeira cliente comprou?</p>
            <p style="margin-left: 20px;">a) 5 pães e um doce<br>b) 10 pães e um bolo de chocolate<br>c) 15 pães franceses<br>d) Apenas um bolo</p>
          </div>
          <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px;">
            <p><strong>Questão 5:</strong> Como Maria se sentiu no final do dia?</p>
            <p style="margin-left: 20px;">a) Triste<br>b) Cansada<br>c) Feliz<br>d) Preocupada</p>
          </div>
        </div>
        <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #16a34a;">✅ Respostas Corretas</h3>
          <div style="margin-bottom: 10px;"><p><strong>1. b) Segunda-feira</strong> - O texto diz "naquela segunda-feira"</p></div>
          <div style="margin-bottom: 10px;"><p><strong>2. b) 6h00</strong> - "Chegou à padaria às 6 horas da manhã"</p></div>
          <div style="margin-bottom: 10px;"><p><strong>3. c) Organizar pães na vitrine</strong> - Seu João disse que ela iria "organizar os pães na vitrine"</p></div>
          <div style="margin-bottom: 10px;"><p><strong>4. b) 10 pães e um bolo de chocolate</strong> - A cliente pediu exatamente isso</p></div>
          <div style="margin-bottom: 10px;"><p><strong>5. c) Feliz</strong> - "Maria ficou feliz" após o primeiro atendimento</p></div>
        </div>
        <div style="background: #fef3c7; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #d97706;">💡 Atividade Extra</h3>
          <p><strong>Dramatização:</strong> Os alunos podem representar a cena da padaria, praticando diálogos e expressões do cotidiano.</p>
          <p><strong>Vocabulário:</strong> Explore palavras como "vitrine", "avental", "atendimento" e seus significados.</p>
        </div>
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #e0e7ff; border-radius: 10px;">
          <p><strong>🎯 Esta é uma amostra gratuita do EduAdapta!</strong></p>
          <p>Acesse <strong>www.eduadapta.com.br</strong> para mais atividades adaptadas</p>
          <p style="font-size: 14px; color: #6b7280;">Material baseado na BNCC - Ensino Médio Adaptado</p>
        </div>
      </div>
    `;
  } else if (materia === "ciencias") {
    titulo = "Ciências - Sistema Digestivo";
    conteudo = `
      <div style="max-width: 800px; margin: 0 auto; line-height: 1.6;">
        <h1 style="color: #7c3aed; text-align: center; margin-bottom: 30px;">🔬 EduAdapta - Ciências</h1>
        <div style="background: #ede9fe; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
          <h2 style="color: #6d28d9; margin-top: 0;">🍎 Atividade: Sistema Digestivo</h2>
          <p><strong>Objetivo:</strong> Compreender como nosso corpo processa os alimentos</p>
          <p><strong>Tempo:</strong> 50 minutos</p>
          <p><strong>Nível:</strong> Ensino Médio Adaptado</p>
        </div>
        <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #374151;">🍽️ O Que Acontece Quando Comemos?</h3>
          <p>Imagine que você acabou de comer um delicioso sanduíche. Vamos acompanhar a viagem desse alimento pelo seu corpo!</p>
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4 style="color: #7c3aed;">1️⃣ BOCA</h4>
            <p>• Os dentes cortam e trituram o alimento</p>
            <p>• A saliva ajuda a amolecer a comida</p>
            <p>• A língua forma o "bolo alimentar"</p>
          </div>
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4 style="color: #7c3aed;">2️⃣ ESÔFAGO</h4>
            <p>• É como um "tubo" que leva a comida para o estômago</p>
            <p>• Tem movimentos que empurram o alimento para baixo</p>
          </div>
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4 style="color: #7c3aed;">3️⃣ ESTÔMAGO</h4>
            <p>• É como uma "bolsa" que mistura e quebra os alimentos</p>
            <p>• Produz sucos que ajudam na digestão</p>
            <p>• Transforma tudo em uma "papa"</p>
          </div>
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4 style="color: #7c3aed;">4️⃣ INTESTINO DELGADO</h4>
            <p>• É bem comprido (cerca de 6 metros!)</p>
            <p>• Absorve os nutrientes dos alimentos</p>
            <p>• Manda os nutrientes para o sangue</p>
          </div>
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4 style="color: #7c3aed;">5️⃣ INTESTINO GROSSO</h4>
            <p>• Absorve a água que sobrou</p>
            <p>• Forma as fezes com o que não serve mais</p>
            <p>• Elimina os restos pela ânus</p>
          </div>
        </div>
        <div style="background: #fff7ed; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #ea580c;">🤔 Vamos Testar o Conhecimento?</h3>
          <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px;">
            <p><strong>Questão 1:</strong> Onde começa a digestão?</p>
            <p style="margin-left: 20px;">a) No estômago<br>b) Na boca<br>c) No intestino<br>d) No esôfago</p>
          </div>
          <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px;">
            <p><strong>Questão 2:</strong> Qual é a função do estômago?</p>
            <p style="margin-left: 20px;">a) Só guardar comida<br>b) Misturar e quebrar alimentos<br>c) Absorver água<br>d) Eliminar restos</p>
          </div>
          <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px;">
            <p><strong>Questão 3:</strong> Onde os nutrientes são absorvidos?</p>
            <p style="margin-left: 20px;">a) Estômago<br>b) Esôfago<br>c) Intestino delgado<br>d) Boca</p>
          </div>
          <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px;">
            <p><strong>Questão 4:</strong> Qual a ordem correta da digestão?</p>
            <p style="margin-left: 20px;">a) Boca → Estômago → Esôfago → Intestinos<br>b) Boca → Esôfago → Estômago → Intestinos<br>c) Estômago → Boca → Esôfago → Intestinos<br>d) Esôfago → Boca → Estômago → Intestinos</p>
          </div>
        </div>
        <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #16a34a;">✅ Respostas e Explicações</h3>
          <div style="margin-bottom: 15px;"><p><strong>1. b) Na boca</strong></p><p><em>A digestão começa quando mastigamos e a saliva age sobre os alimentos.</em></p></div>
          <div style="margin-bottom: 15px;"><p><strong>2. b) Misturar e quebrar alimentos</strong></p><p><em>O estômago produz sucos digestivos e movimentos que quebram os alimentos.</em></p></div>
          <div style="margin-bottom: 15px;"><p><strong>3. c) Intestino delgado</strong></p><p><em>É no intestino delgado que os nutrientes passam para o sangue.</em></p></div>
          <div style="margin-bottom: 15px;"><p><strong>4. b) Boca → Esôfago → Estômago → Intestinos</strong></p><p><em>Esta é a sequência natural do caminho dos alimentos.</em></p></div>
        </div>
        <div style="background: #fef3c7; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #d97706;">💡 Experimento Simples</h3>
          <p><strong>Simulando a Digestão:</strong></p>
          <p>• Use um saco plástico como "estômago"</p>
          <p>• Coloque pedaços de pão e água</p>
          <p>• Amasse para simular os movimentos digestivos</p>
          <p>• Observe como o alimento se transforma!</p>
        </div>
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #e0e7ff; border-radius: 10px;">
          <p><strong>🎯 Esta é uma amostra gratuita do EduAdapta!</strong></p>
          <p>Acesse <strong>www.eduadapta.com.br</strong> para mais atividades adaptadas</p>
          <p style="font-size: 14px; color: #6b7280;">Material baseado na BNCC - Ensino Médio Adaptado</p>
        </div>
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EduAdapta - ${titulo}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f9fafb; }
    @media print { body { background-color: white; }
  </style>
</head>
<body>
  ${conteudo}
</body>
</html>`;
}

// ====== Login modal ======
function abrirLogin() {
  document.getElementById("loginModal").classList.remove("hidden");
}
function fecharLogin() {
  document.getElementById("loginModal").classList.add("hidden");
}

// ====== Bind de eventos na carga ======
document.addEventListener("DOMContentLoaded", () => {
  // botões de scroll
  document.querySelectorAll(".btn-scroll").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-scroll");
      smoothScroll(target);
    });
  });

  // âncoras do menu
  document.querySelectorAll(".nav-anchor").forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        smoothScroll(href);
        const mobileMenu = document.getElementById("mobileMenu");
        if (mobileMenu) mobileMenu.classList.add("hidden");
      }
    });
  });

  // menu mobile
  const menuBtn = document.getElementById("btn-menu-mobile");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const menu = document.getElementById("mobileMenu");
      if (menu) menu.classList.toggle("hidden");
    });
  }

  // abrir/fechar login
  const areaCliente = document.getElementById("btn-area-cliente");
  if (areaCliente) areaCliente.addEventListener("click", abrirLogin);

  const fecharLoginBtn = document.getElementById("btn-fechar-login");
  if (fecharLoginBtn) fecharLoginBtn.addEventListener("click", fecharLogin);

  const modal = document.getElementById("loginModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) fecharLogin();
    });
  }

  // form login
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      if (email && password) {
        alert(
          "Login realizado com sucesso! Redirecionando para área do cliente..."
        );
        fecharLogin();
        // window.location.href = '/area-cliente';
      }
    });
  }

  // botões das atividades
  document.querySelectorAll(".btn-atividade").forEach((btn) => {
    btn.addEventListener("click", () => {
      const materia = btn.getAttribute("data-materia");
      abrirAtividadeEmNovaAba(materia);
    });
  });
});
