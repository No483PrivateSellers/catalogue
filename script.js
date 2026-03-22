let produtos = [
  {
    id: 1,
    nome: "Off-White Hoodie",
    categoria: "hoodie",
    preco: 145,
    antigo: 550,
    imagens: [
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/301"
    ]
  },
  {
    id: 2,
    nome: "Off-White Tshirt",
    categoria: "tshirt",
    preco: 85,
    antigo: 365,
    imagens: [
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/302"
    ]
  }
];

// 💾 carregar favoritos guardados
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

let filtroAtual = "all";

function renderProdutos() {
  const container = document.getElementById("products");
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

        <img src="${p.imagens[0]}" onclick="trocarImagem(this, ${p.id})">

        <p>${p.nome}</p>
        <span>€${p.preco}</span>
        <span class="old">PVP €${p.antigo}</span>
      </div>
    `;
  });
}

// ❤️ FAVORITOS (com persistência)
function toggleFav(id) {
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(f => f !== id);
  } else {
    favoritos.push(id);
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  renderProdutos();
}

// 📸 SLIDER DE IMAGENS
function trocarImagem(imgElement, id) {
  const produto = produtos.find(p => p.id === id);

  let atual = produto.imagens.indexOf(imgElement.src);
  let proxima = (atual + 1) % produto.imagens.length;

  imgElement.src = produto.imagens[proxima];
}

// 🔎 FILTROS
function filtrarCategoria(cat) {
  filtroAtual = cat;
  renderProdutos();
}

function toggleFiltros() {
  document.getElementById("filtros").classList.toggle("hidden");
}

// 📲 WHATSAPP COM NÚMERO
function enviarWhatsApp() {
  const numero = "351912345678"; // mete o teu

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

// iniciar
renderProdutos();
