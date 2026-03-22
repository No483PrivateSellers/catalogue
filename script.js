// script.js

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let filtroAtual = "all";
let produtos = [];

// Carregar produtos do JSON
fetch("produtos.json")
  .then(res => res.json())
  .then(data => {
    produtos = data;
    renderProdutos();
  })
  .catch(err => console.error("Erro a carregar produtos:", err));

function renderProdutos() {
  const container = document.getElementById("products");
  if (!container) return;
  container.innerHTML = "";

  let lista = produtos;
  if (filtroAtual !== "all") {
    lista = produtos.filter(p => p.categoria === filtroAtual);
  }

  lista.forEach(p => {
    const fav = favoritos.includes(p.id) ? "❤️" : "🤍";

    container.innerHTML += `
      <div class="card">
        <div class="fav" onclick="toggleFav(${p.id})">${fav}</div>
        <div class="new">NEW</div>
        <img src="${p.imagens[0] ? p.imagens[0] : 'https://via.placeholder.com/300'}" onclick="trocarImagem(this, ${p.id})">
        <p>${p.nome}</p>
        <span>€${p.preco}</span>
        <span class="old">PVP €${p.antigo}</span>
      </div>
    `;
  });
}

function toggleFav(id) {
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(f => f !== id);
  } else {
    favoritos.push(id);
  }
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  renderProdutos();
}

function trocarImagem(imgElement, id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto || !produto.imagens || produto.imagens.length === 0) return;
  let atual = produto.imagens.indexOf(imgElement.src);
  let proxima = (atual + 1) % produto.imagens.length;
  imgElement.src = produto.imagens[proxima];
}

function filtrarCategoria(cat) {
  filtroAtual = cat;
  renderProdutos();
}

function toggleFiltros() {
  document.getElementById("filtros")?.classList.toggle("hidden");
}

function enviarWhatsApp() {
  const numero = "351911119396"; // TEU NÚMERO

  const selecionados = produtos.filter(p => favoritos.includes(p.id));

  if (selecionados.length === 0) {
    alert("Sem favoritos");
    return;
  }

  let mensagem = "Olá, quero estes produtos:%0A";
  selecionados.forEach(p => {
    mensagem += - ${p.nome} €${p.preco}%0A;
  });

  const url = https://wa.me/${numero}?text=${mensagem};
  window.open(url, "_blank");
}
