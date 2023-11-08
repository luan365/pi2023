"use strict";
// Neste arquivo conversores, vamos sempre converter uma 
// resposta de consulta do Oracle para um tipo que desejarmos
// portanto o intuito desse arquivo typescript é reunir funções
// que convertam de "linha do oracle" para um array javascript onde
// cada elemento represente um elemento de um tipo. 
Object.defineProperty(exports, "__esModule", { value: true });
exports.rowsToTrechos = void 0;
function rowsToTrechos(oracleRows) {
    // vamos converter um array any (resultados do oracle)
    // em um array de Trecho
    let trechos = [];
    let trecho;
    if (oracleRows !== undefined) {
        oracleRows.forEach((registro) => {
            trecho = {
                nome: registro.NOME,
                origem: registro.ORIGEM,
                destino: registro.DESTINO,
                aeronave: registro.AERONAVE,
            };
            // inserindo o novo Array convertido.
            trechos.push(trecho);
        });
    }
    return trechos;
}
exports.rowsToTrechos = rowsToTrechos;
