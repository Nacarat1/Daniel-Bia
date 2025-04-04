function playVideo(container) {
  container.querySelector("img").style.display = "none";
  container.querySelector("iframe").style.display = "block";
}

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

setInterval(calcularTempo, 1000);
calcularTempo();
