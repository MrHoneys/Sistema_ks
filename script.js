// Dimensões das carretas cadastradas
const carretas = [
    { nome: "Carreta de 14m", comprimento: 14, largura: 2.5, alturaMaxima: 2.7, quantidadeMaxima: 28 },
    { nome: "Carreta de 14.6m", comprimento: 14.6, largura: 2.5, alturaMaxima: 2.7, quantidadeMaxima: 28 },
    { nome: "Carreta de 15.2m", comprimento: 15.2, largura: 2.5, alturaMaxima: 2.7, quantidadeMaxima: 30 },
];

// Dimensões dos Trucks cadastrados
const trucks = [
    { nome: "Truck de 10.4m", comprimento: 10.4, largura: 2.5, alturaMaxima: 2.7, quantidadeMaxima: 20 },
];

// Dimensões de outros cadastrados
const van = [
    { nome: "VAN 01", comprimento: 3.10, largura: 1.10, alturaMaxima: 1.9, quantidadeMaxima: 3 }
];

document.getElementById("pallet-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtém o tipo de veículo selecionado
    const vehicleType = document.getElementById("vehicle-type").value;

    // Obtém as dimensões do pallet
    const length = parseFloat(document.getElementById("length").value);
    const width = parseFloat(document.getElementById("width").value);
    const height = parseFloat(document.getElementById("height").value);

    // Limpa resultados anteriores
    const resultsTableBody = document.getElementById("results-table-body");
    resultsTableBody.innerHTML = ""; // Limpa a tabela antes de mostrar novos resultados

    // Seleciona os veículos com base no tipo escolhido
    const veiculos = vehicleType === 'carreta' ? carretas : 
                     vehicleType === 'truck' ? trucks : 
                     van;

    // Calcula a capacidade de cada veículo considerando o comprimento, largura e altura do pallet
    veiculos.forEach(veiculo => {
        const palletsPorComprimento = Math.floor(veiculo.comprimento / length);
        const palletsPorLargura = Math.floor(veiculo.largura / width);
        const totalPallets = palletsPorComprimento * palletsPorLargura;

        // Verifica se a altura do pallet excede a altura máxima do veículo
        const alturaValida = height <= veiculo.alturaMaxima;

        // Validação da quantidade
        const quantidadeValida = totalPallets <= veiculo.quantidadeMaxima;

        // Verifica qual deve ser a mensagem de validação
        let mensagemValidacao = '';
        if (!alturaValida) {
            mensagemValidacao = "<span class='text-red-500 font-semibold'>❌ Inválido Altura</span>";
        } else if (!quantidadeValida) {
            mensagemValidacao = "<span class='text-red-500 font-semibold'>❌ Inválido Quantidade</span>";
        } else {
            mensagemValidacao = "<span class='text-green-400 font-semibold'>✔️ Válido</span>";
        }

        // Calcula a quantidade de camadas possíveis
        const camadas = Math.floor(veiculo.alturaMaxima / height);

        // Calcula a cubagem total (m³)
        const cubagemTotal = length * width * height * totalPallets;

        // Verifica a capacidade na largura
        const cabeDoisLados = (width * 2 <= veiculo.largura);
        const capacidadeLargura = cabeDoisLados ? "CABE 2" : "CABE 1";

        // Cria uma linha da tabela com os resultados
        const row = document.createElement("tr");
        row.classList.add("hover:bg-gray-600");

        row.innerHTML = `
            <td class="px-6 py-3 border-b text-gray-300">${veiculo.nome}</td>
            <td class="px-6 py-3 border-b text-gray-300">${totalPallets}</td>
            <td class="px-6 py-3 border-b text-gray-300">${height.toFixed(2)}</td>
            <td class="px-6 py-3 border-b">${camadas} camadas</td>
            <td class="px-6 py-3 border-b">${capacidadeLargura}</td>
            <td class="px-6 py-3 border-b text-gray-300">${cubagemTotal.toFixed(3)} m³</td>
            <td class="px-6 py-3 border-b">${mensagemValidacao}</td>
        `;
        resultsTableBody.appendChild(row);
    });

    // Exibe os resultados
    document.getElementById("results").classList.remove("hidden");
});