// A função playVideo esconde a imagem e exibe o iframe
function playVideo(container) {
  container.querySelector("img").style.display = "none";
  container.querySelector("iframe").style.display = "block";
}

// A função calcularTempo atualiza o contador de tempo
function calcularTempo() {
  const dataInicial = new Date("2025-03-05T02:12:00");
  const dataAtual = new Date();
  let anos = dataAtual.getFullYear() - dataInicial.getFullYear();
  let meses = dataAtual.getMonth() - dataInicial.getMonth();
  let dias = dataAtual.getDate() - dataInicial.getDate();
  let horas = dataAtual.getHours() - dataInicial.getHours();
  let minutos = dataAtual.getMinutes() - dataInicial.getMinutes();
  let segundos = dataAtual.getSeconds() - dataInicial.getSeconds();

  if (segundos < 0) {
    segundos += 60;
    minutos--;
  }
  if (minutos < 0) {
    minutos += 60;
    horas--;
  }
  if (horas < 0) {
    horas += 24;
    dias--;
  }
  if (dias < 0) {
    meses--;
    let ultimoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 0);
    dias += ultimoMes.getDate();
  }
  if (meses < 0) {
    meses += 12;
    anos--;
  }

  horas = String(horas).padStart(2, "0");
  minutos = String(minutos).padStart(2, "0");
  segundos = String(segundos).padStart(2, "0");

  document.getElementById(
    "resultado"
  ).innerText = `${anos} anos - ${meses} mês - ${dias} dias - ${horas}:${minutos}:${segundos}`;
}

// Inicia o contador
setInterval(calcularTempo, 1000);
calcularTempo();

// A função salvarAventuras pega os itens da lista e salva no localStorage
function salvarAventuras() {
  const aventurasSalvas = [];
  const todasAsLi = document.querySelectorAll("#lista1 li, #lista2 li");

  todasAsLi.forEach((li) => {
    aventurasSalvas.push({
      texto: li.textContent,
      cor: li.classList.contains("verde") ? "verde" : "",
      lista: li.parentNode.id,
    });
  });

  localStorage.setItem("aventuras", JSON.stringify(aventurasSalvas));
}

// A função carregarAventuras busca os dados do localStorage ou carrega a lista padrão
function carregarAventuras() {
  const aventurasSalvas = JSON.parse(localStorage.getItem("aventuras"));

  if (aventurasSalvas && aventurasSalvas.length > 0) {
    aventurasSalvas.forEach((aventura) => {
      const novoLi = document.createElement("li");
      novoLi.textContent = aventura.texto;
      if (aventura.cor === "verde") {
        novoLi.classList.add("verde");
      }
      document.getElementById(aventura.lista).appendChild(novoLi);
    });
  } else {
    // Lista padrão para o primeiro acesso
    const listaPadrao1 = [
      { texto: "Saltar de Asa Delta", cor: "" },
      { texto: "Churrasco em família", cor: "" },
      { texto: "Vinagrete feito pela Bia", cor: "" },
      { texto: "Escalar a pedra da Gávea", cor: "" },
      { texto: "Ver NFL", cor: "verde" },
      { texto: "Assistir Fragmentado", cor: "" },
      { texto: "Ler o Manifesto Comunista", cor: "" },
      { texto: "Ir ao Maracanã", cor: "verde" },
      { texto: "Ver álbuns de fotos do outro", cor: "verde" },
      { texto: "Passear com a Telma", cor: "" },
      { texto: "Assistir os vencedores do Oscar - Filme estrangeiro", cor: "" },
    ];
    const listaPadrao2 = [
      { texto: "Sair de madrugada para cachoeira", cor: "" },
      { texto: "Ver o nascer do sol na praia", cor: "" },
      { texto: "Ficar em Araçatiba", cor: "" },
      { texto: "Treinar Boxe juntos", cor: "" },
      { texto: "Treino juntos", cor: "verde" },
      { texto: "Aula experimental de Jiu Jitsu", cor: "" },
      { texto: "Visitar as igrejas do avô", cor: "" },
      { texto: 'Nomes dos filhos ""', cor: "" },
      { texto: "Parque inflável/jump", cor: "" },
      { texto: "Comer na Tia Léia", cor: "" },
      { texto: "Assistir a Trilogia do Batman", cor: "" },
    ];

    listaPadrao1.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.texto;
      if (item.cor === "verde") {
        li.classList.add("verde");
      }
      document.getElementById("lista1").appendChild(li);
    });
    listaPadrao2.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.texto;
      if (item.cor === "verde") {
        li.classList.add("verde");
      }
      document.getElementById("lista2").appendChild(li);
    });

    salvarAventuras();
  }
}

// Inicia o carregamento das aventuras ao carregar a página
document.addEventListener("DOMContentLoaded", carregarAventuras);

// A função mostrarInput alterna a visibilidade da caixa de entrada
function mostrarInput() {
  const inputDiv = document.getElementById("inputContainer");
  inputDiv.style.display = inputDiv.style.display === "flex" ? "none" : "flex";
}

// A função adicionarItem adiciona o item e esconde a caixa de entrada
function adicionarItem() {
  const texto = document.getElementById("novoItemInput").value.trim();
  if (!texto) return;

  const todasLis = [...document.querySelectorAll("#lista1 li, #lista2 li")];
  const jaExiste = todasLis.find((li) => li.textContent === texto);

  if (jaExiste) {
    jaExiste.classList.add("verde");
    salvarAventuras();
  } else {
    const novoLi = document.createElement("li");
    novoLi.textContent = texto;

    let alternar =
      document.getElementById("lista1").children.length <=
      document.getElementById("lista2").children.length;

    if (alternar) {
      document.getElementById("lista1").appendChild(novoLi);
    } else {
      document.getElementById("lista2").appendChild(novoLi);
    }

    salvarAventuras();
  }

  document.getElementById("novoItemInput").value = "";
  document.getElementById("inputContainer").style.display = "none";
}
