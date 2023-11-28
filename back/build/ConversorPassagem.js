"use strict";
// Neste arquivo conversores, vamos sempre converter uma 
// resposta de consulta do Oracle para um tipo que desejarmos
// portanto o intuito desse arquivo typescript é reunir funções
// que convertam de "linha do oracle" para um array javascript onde
// cada elemento represente um elemento de um tipo. 
Object.defineProperty(exports, "__esModule", { value: true });
exports.rowsToPassagens = void 0;
function rowsToPassagens(oracleRows) {
    // vamos converter um array any (resultados do oracle)
    // em um array de Passagem
    let Passagens = [];
    let Passagem;
    if (oracleRows !== undefined) {
        oracleRows.forEach((registro) => {
            Passagem = {
                codigo: registro.CODIGO,
                letra: registro.LETRA,
                numero: registro.NUMERO,
                idVoo: registro.IDVOO
            };
            // inserindo o novo Array convertido.
            Passagens.push(Passagem);
        });
    }
    return Passagens;
}
exports.rowsToPassagens = rowsToPassagens;
