// Dimensões das carretas cadastradas
const carretas = [
  { nome: "Carreta de 14m", comprimento: 14, largura: 2.5, alturaMaxima: 3, quantidadeMaxima: 28 },
  { nome: "Carreta de 14.6m", comprimento: 14.6, largura: 2.5, alturaMaxima: 3, quantidadeMaxima: 28 },
  { nome: "Carreta de 15m", comprimento: 15, largura: 2.5, alturaMaxima: 3, quantidadeMaxima: 30 },
  { nome: "Carreta de 15.4m", comprimento: 15.4, largura: 2.5, alturaMaxima: 3, quantidadeMaxima: 30 }
];

// Dimensões dos Trucks cadastrados
const trucks = [
  { nome: "Truck de 10.4m", comprimento: 10.4, largura: 2.5, alturaMaxima: 4, quantidadeMaxima: 20 },
];

// Dimensões de outros cadastrados
const outros = [
  { nome: "Saveiro", comprimento: 1.60, largura:1.0, alturaMaxima:1.2, quantidadeMaxima: 1 }
];

  // Função para verificar capacidade de uma disposição
  function verificarCapacidade(carreta, comprimento, largura, quantidade) {
    const palletsNoComprimento = Math.floor(carreta.comprimento / comprimento);
    const palletsNaLargura = Math.floor(carreta.largura / largura);
    const totalPallets = palletsNoComprimento * palletsNaLargura;
  
    const podeCarregar = totalPallets >= quantidade && carreta.quantidadeMaxima >= quantidade;
  
    return {
      podeCarregar,
      quantidadeCabivel: totalPallets,
      quantidadeEmbarcada: podeCarregar ? quantidade : 0, // Embarca exatamente a quantidade informada
      capacidadeNaLargura: palletsNaLargura > 1 ? "CABE 2" : "CABE 1",
      cubagemTotal: totalPallets * comprimento * largura * carreta.alturaMaxima,
    };
  }
  
  // Função principal para calcular capacidade
  function calcularCapacidade() {
    const comprimentoPalete = parseFloat(document.getElementById('comprimento').value);
    const larguraPalete = parseFloat(document.getElementById('largura').value);
    const alturaPalete = parseFloat(document.getElementById('altura').value);
    const quantidadePaletes = parseInt(document.getElementById('quantidade').value);
  
    let tabela = `
      <table class="w-full text-left text-gray-300">
        <thead class="bg-gray-700">
          <tr>
            <th class="py-2 px-4">Veículo</th>
            <th class="py-2 px-4">Disposição</th>
            <th class="py-2 px-4">Capacidade na Largura</th>
            <th class="py-2 px-4">Cubagem Total (m³)</th>
            <th class="py-2 px-4">Quantidade que Cabe</th>
            <th class="py-2 px-4">Quantidade Embarcada</th>
          </tr>
        </thead>
        <tbody>
    `;
  
    // Verifica carretas e trucks
    let encontrouVeiculos = false;
    [...carretas, ...trucks].forEach(carreta => {
      let linha = '';
      const original = verificarCapacidade(carreta, comprimentoPalete, larguraPalete, quantidadePaletes);
      const invertida = verificarCapacidade(carreta, larguraPalete, comprimentoPalete, quantidadePaletes);
  
      if (original.podeCarregar) {
        linha = `
          <tr class="border-b border-gray-700">
            <td class="py-2 px-4">${carreta.nome}</td>
            <td class="py-2 px-4">Original (C: ${comprimentoPalete}, L: ${larguraPalete})</td>
            <td class="py-2 px-4">${original.capacidadeNaLargura}</td>
            <td class="py-2 px-4">${original.cubagemTotal.toFixed(2)}</td>
            <td class="py-2 px-4">${original.quantidadeCabivel}</td>
            <td class="py-2 px-4">${original.quantidadeEmbarcada}</td>
          </tr>
        `;
      } else if (invertida.podeCarregar) {
        linha = `
          <tr class="border-b border-gray-700">
            <td class="py-2 px-4">${carreta.nome}</td>
            <td class="py-2 px-4">Invertida (C: ${larguraPalete}, L: ${comprimentoPalete})</td>
            <td class="py-2 px-4">${invertida.capacidadeNaLargura}</td>
            <td class="py-2 px-4">${invertida.cubagemTotal.toFixed(2)}</td>
            <td class="py-2 px-4">${invertida.quantidadeCabivel}</td>
            <td class="py-2 px-4">${invertida.quantidadeEmbarcada}</td>
          </tr>
        `;
      }
  
      if (linha) {
        tabela += linha;
        encontrouVeiculos = true;
      }
    });
  
    tabela += '</tbody></table>';
  
    // Exibe o resultado ou mensagem de erro
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = encontrouVeiculos
      ? tabela
      : '<p class="text-red-500">Nenhum veículo pode carregar a carga com as dimensões informadas.</p>';
  }
  