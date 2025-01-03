export function addSelectRowOfTable() {
    const tables = document.querySelectorAll(".table");
    if (!tables)
        return;
    console.log(tables);
    tables.forEach((table) => {
        table.addEventListener("click", (event) => {
            const target = event.target;
            const row = target.closest("tr");
            if (!row || row.rowIndex === 0)
                return;
            const selectedRow = table.querySelector(".selected");
            if (selectedRow) {
                selectedRow.classList.remove("selected");
            }
            // Agregar la clase 'selected' a la fila clicada
            row.classList.add("selected");
        });
    });
}
