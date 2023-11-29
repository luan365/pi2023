"use strict";
// Neste arquivo conversores, vamos sempre converter uma 
// resposta de consulta do Oracle para um tipo que desejarmos
// portanto o intuito desse arquivo typescript é reunir funções
// que convertam de "linha do oracle" para um array javascript onde
// cada elemento represente um elemento de um tipo. 
Object.defineProperty(exports, "__esModule", { value: true });
exports.rowsToAssentos = void 0;
function rowsToAssentos(oracleRows) {
    // vamos converter um array any (resultados do oracle)
    // em um array de Assento
    let assentos = [];
    let assento;
    if (oracleRows !== undefined) {
        oracleRows.forEach((registro) => {
            assento = {
                codigo: registro.codigo,
                numero: registro.numero,
                status: registro.status,
                aeronave: registro.aeronave,
            };
            // inserindo o novo Array convertido.
            assentos.push(assento);
        });
    }
    return assentos;
}
exports.rowsToAssentos = rowsToAssentos;
