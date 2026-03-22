let produtos = [];
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let filtroAtual = "all";
let idiomaAtual = "pt"; // padrão PT

// Carregar produtos.json
fetch("produtos.json")
  .then(res => res.json())
  .then(data => {
    produtos = data;
    atualizarTextoInterface();
    renderProdutos();
  })
  .catch(err => console.error("Erro a carregar produtos:", err));

// Renderizar produtos
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
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(f => f !== id);
  } else {
    favoritos.push(id);
  }
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  renderProdutos();
}

// Troca de imagens
function trocarImagem(imgElement, id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto || !produto.imagens || produto.imagens.length === 0) return;
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
  const url = https://wa.me/${numero}?text=${mensagem};
  window.open(url, "_blank");
}

// Idioma
function mudarIdioma(idioma) {
  idiomaAtual = idioma;
  atualizarTextoInterface();
  renderProdutos();
}

function atualizarTextoInterface() {
  const titulo = document.getElementById("loja-title");
  const filtros = document.getElementById("filtros");
  const whatsappBtn = document.getElementById("whatsapp");

  if (idiomaAtual === "pt") {
    titulo.textContent = "Minha Loja";
    whatsappBtn.textContent = "Enviar WhatsApp";
    filtros.innerHTML = `
      <button onclick="filtrarCategoria('all')">Todos</button>
      <button onclick="filtrarCategoria('clothes')">Clothes</button>
      <button onclick="filtrarCategoria('sneakers')">Sneakers</button>
      <button onclick="filtrarCategoria('accessories')">Accessories</button>
    `;
  } else {
    titulo.textContent = "My Store";
    whatsappBtn.textContent = "Send WhatsApp";
    filtros.innerHTML = `
      <button onclick="filtrarCategoria('all')">All</button>
      <button onclick="filtrarCategoria('clothes')">Clothes</button>
      <button onclick="filtrarCategoria('sneakers')">Sneakers</button>
      <button onclick="filtrarCategoria('accessories')">Accessories</button>
    `;
  }
}
