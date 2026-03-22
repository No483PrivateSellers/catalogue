let produtos = [
  {
    id: 1,
    nome: "Off-White Hoodie",
    nome_en: "Off-White Hoodie",
    categoria: "clothes",
    preco: 145,
    antigo: 550,
    imagens: ["https://via.placeholder.com/300x300?text=Hoodie1", "https://via.placeholder.com/300x300?text=Hoodie2"]
  },
  {
    id: 2,
    nome: "Off-White Tshirt",
    nome_en: "Off-White T-Shirt",
    categoria: "clothes",
    preco: 85,
    antigo: 365,
    imagens: ["https://via.placeholder.com/300x300?text=Tshirt1", "https://via.placeholder.com/300x300?text=Tshirt2"]
  },
  {
    id: 3,
    nome: "Nike Sneakers",
    nome_en: "Nike Sneakers",
    categoria: "sneakers",
    preco: 120,
    antigo: 200,
    imagens: ["https://via.placeholder.com/300x300?text=Sneakers1", "https://via.placeholder.com/300x300?text=Sneakers2"]
  },
  {
    id: 4,
    nome: "Adidas Jacket",
    nome_en: "Adidas Jacket",
    categoria: "clothes",
    preco: 180,
    antigo: 350,
    imagens: ["https://via.placeholder.com/300x300?text=Jacket1", "https://via.placeholder.com/300x300?text=Jacket2"]
  },
  {
    id: 5,
    nome: "Cap",
    nome_en: "Cap",
    categoria: "accessories",
    preco: 35,
    antigo: 70,
    imagens: ["https://via.placeholder.com/300x300?text=Cap1", "https://via.placeholder.com/300x300?text=Cap2"]
  }
];

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let filtroAtual = "all";
let idiomaAtual = "pt";

// Renderizar produtos
function renderProdutos() {
  const container = document.getElementById("products");
  if (!container) return;
  container.innerHTML = "";

  let lista = produtos;
  if (filtroAtual !== "all") lista = produtos.filter(p => p.categoria === filtroAtual);

  lista.forEach(p => {
    const fav = favoritos.includes(p.id) ? "❤️" : "🤍";
    const nomeProduto = idiomaAtual === "pt" ? p.nome : (p.nome_en || p.nome);

    container.innerHTML += `
      <div class="card">
        <div class="fav" onclick="toggleFav(${p.id})">${fav}</div>
        <div class="new">NEW</div>
        <img src="${p.imagens[0]}" onclick="trocarImagem(this, ${p.id})" />
        <p>${nomeProduto}</p>
        <span class="price">€${p.preco}</span>
        <span class="old">€${p.antigo}</span>
      </div>
    `;
  });
}

// Favoritos
function toggleFav(id) {
  favoritos = favoritos.includes(id) ? favoritos.filter(f => f !== id) : [...favoritos, id];
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  renderProdutos();
}

// Troca de imagens
function trocarImagem(imgElement, id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;
  let atual = produto.imagens.indexOf(imgElement.src);
  let proxima = (atual + 1) % produto.imagens.length;
  imgElement.src = produto.imagens[proxima];
}

// Filtros
function filtrarCategoria(cat) {
  filtroAtual = cat;
  renderProdutos();
}

// Toggle filtros
function toggleFiltros() {
  document.getElementById("filtros")?.classList.toggle("hidden");
}

// WhatsApp
function enviarWhatsApp() {
  const numero = "351911119396";
  const selecionados = produtos.filter(p => favoritos.includes(p.id));
  if (selecionados.length === 0) {
    alert(idiomaAtual === "pt" ? "Sem favoritos" : "No favorites");
    return;
  }
  let mensagem = idiomaAtual === "pt" ? "Olá, quero estes produtos:%0A" : "Hello, I want these products:%0A";
  selecionados.forEach(p => {
    const nomeProduto = idiomaAtual === "pt" ? p.nome : (p.nome_en || p.nome);
    mensagem += - ${nomeProduto} €${p.preco}%0A;
  });
  window.open(https://wa.me/${numero}?text=${mensagem}, "_blank");
}

// Idioma
function mudarIdioma(idioma) {
  idiomaAtual = idioma;
  renderProdutos();
}

// Iniciar
renderProdutos();
