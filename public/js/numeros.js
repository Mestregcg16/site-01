document.addEventListener("DOMContentLoaded", function () {
    const numberTable = document.getElementById("number-table");
    const toggleSelectionButton = document.getElementById("toggleSelection");

    // Variável global para armazenar os números selecionados
    const selectedNumbers = [];

    // Função para gerar botões de 2 dígitos (de 1 a 1000)
    function generateButtons() {
        let currentRow;
        
        for (let i = 1; i <= 100; i++) {
            if (i % 10 === 1) {
                // Cria uma nova linha a cada 10 botões
                currentRow = document.createElement("tr");
                numberTable.appendChild(currentRow);
            }

            const button = document.createElement("button");
            button.className = "number";
            button.setAttribute("data-value", i);
            button.textContent = i.toString().padStart(2, "0");
             // Verifica se o número é igual a 17
            if (i === 17 || i === 22 || i === 27 || i === 32 || i === 76){
                button.style.backgroundColor = "red";
            }

            const td = document.createElement("td");
            td.appendChild(button);
            currentRow.appendChild(td);
        }
    }

    generateButtons();

    const numberButtons = document.querySelectorAll(".number");

    numberButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            button.classList.toggle("selected");
            updateSelectedNumbers();
        });
    });

    toggleSelectionButton.addEventListener("click", function () {
        const selectedNumbersText = selectedNumbers.join(", ");
        const whatsappURL = `https://api.whatsapp.com/send?phone=${+553497155008}&text=Minha Sorte Está Nos números: ${selectedNumbersText}`;
        window.open(whatsappURL, "_blank");
    });

    // Função para atualizar os números selecionados
    function updateSelectedNumbers() {
        selectedNumbers.length = 0; // Limpa a matriz
        numberButtons.forEach(function (button) {
            if (button.classList.contains("selected") && button.style.backgroundColor !== "red") {
                selectedNumbers.push(button.getAttribute("data-value"));
            }
        });
    }


    // Chama a função inicialmente para exibir os números selecionados no carregamento da página
    updateSelectedNumbers();
});
