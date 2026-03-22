const produtos = [
  {
    id: 1,
    nome: "Off-White Hoodie",
    preco: 145,
    antigo: 550,
    imagem: "https://via.placeholder.com/300"
  },
  {
    id: 2,
    nome: "Off-White Tshirt",
    preco: 85,
    antigo: 365,
    imagem: "https://via.placeholder.com/300"
  }
];

let favoritos = [];

const container = document.getElementById("products");

produtos.forEach(p => {
  container.innerHTML += `
    <div class="card">
      <div class="fav" onclick="toggleFav(${p.id})">♡</div>
      <div class="new">NEW</div>
      <img src="${p.imagem}">
      <p>${p.nome}</p>
      <span class="price">€${p.preco}</span>
      <span class="old">PVP €${p.antigo}</span>
    </div>
  `;
});

function toggleFav(id) {
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(f => f !== id);
  } else {
    favoritos.push(id);
  }
  alert("Favoritos: " + favoritos.join(", "));
}

function enviarWhatsApp() {
  const selecionados = produtos.filter(p => favoritos.includes(p.id));

  if (selecionados.length === 0) {
    alert("Sem favoritos!");
    return;
  }

  let mensagem = "Quero estes produtos:%0A";

  selecionados.forEach(p => {
    mensagem += - ${p.nome} €${p.preco}%0A;
  });

  const url = https://wa.me/?text=${mensagem};
  window.open(url, "_blank");
}
