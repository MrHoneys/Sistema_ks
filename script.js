// Dimensões das carretas cadastradas
const carretas = [
    { nome: "Carreta de 14m", comprimento: 14, largura: 2.5, alturaMaxima: 2.7, quantidadeMaxima: 28 },
    { nome: "Carreta de 14.6m", comprimento: 14.6, largura: 2.5, alturaMaxima: 2.7, quantidadeMaxima: 28 },
    { nome: "Carreta de 15.2m", comprimento: 15.2, largura: 2.5, alturaMaxima: 2.7, quantidadeMaxima: 30 },
];

// Dimensões dos Trucks cadastrados
const trucks = [
    { nome: "Truck de 10.4m", comprimento: 10.4, largura: 2.4, alturaMaxima: 2.7, quantidadeMaxima: 20 },
];

// Dimensões de VAN
const van = [
    { nome: "VAN 01", comprimento: 3.10, largura: 1.10, alturaMaxima: 1.9, quantidadeMaxima: 3 }
];

// Dimensões dos Containers
const container = [
    { nome: "CONTAINER 40'HC", comprimento: 12, largura: 2.35, alturaMaxima: 2.58, quantidadeMaxima: 21 }
];

// Mapeamento de tipo de veículo
const tiposVeiculo = {
    carreta: carretas,
    truck: trucks,
    van: van,
    container: container
};

document.getElementById("pallet-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const vehicleType = document.getElementById("vehicle-type").value;
    const length = parseFloat(document.getElementById("length").value);
    const width = parseFloat(document.getElementById("width").value);
    const height = parseFloat(document.getElementById("height").value);

    const resultsTableBody = document.getElementById("results-table-body");
    resultsTableBody.innerHTML = ""; // Limpa a tabela

    const veiculos = tiposVeiculo[vehicleType] || [];

    veiculos.forEach(veiculo => {
        const palletsPorComprimento = Math.floor(veiculo.comprimento / length);
        const palletsPorLargura = Math.floor(veiculo.largura / width);
        const totalPallets = palletsPorComprimento * palletsPorLargura;

        const camadas = Math.floor(veiculo.alturaMaxima / height);
        const alturaValida = camadas >= 1;
        const quantidadeValida = totalPallets <= veiculo.quantidadeMaxima;

        let mensagemValidacao = '';
        if (!alturaValida) {
            mensagemValidacao = "<span class='text-red-500 font-semibold'>❌ Altura Excede</span>";
        } else if (!quantidadeValida) {
            mensagemValidacao = "<span class='text-red-500 font-semibold'>❌ Quantidade Excede</span>";
        } else {
            mensagemValidacao = "<span class='text-green-400 font-semibold'>✔️ Compatível</span>";
        }

        const cubagemTotal = length * width * height * totalPallets;
        const cabeDoisLados = (width * 2 <= veiculo.largura);
        const capacidadeLargura = cabeDoisLados ? "CABE 2" : "CABE 1";

        const row = document.createElement("tr");
        row.classList.add("hover:bg-gray-600");

        row.innerHTML = `
            <td class="px-6 py-3 border-b text-gray-300">${veiculo.nome}</td>
            <td class="px-6 py-3 border-b text-gray-300">${totalPallets}</td>
            <td class="px-6 py-3 border-b text-gray-300">${height.toFixed(2)}</td>
            <td class="px-6 py-3 border-b">${camadas} camada(s)</td>
            <td class="px-6 py-3 border-b">${capacidadeLargura}</td>
            <td class="px-6 py-3 border-b text-gray-300">${cubagemTotal.toFixed(3)} m³</td>
            <td class="px-6 py-3 border-b">${mensagemValidacao}</td>
        `;
        resultsTableBody.appendChild(row);
    });

    document.getElementById("results").classList.remove("hidden");
});
