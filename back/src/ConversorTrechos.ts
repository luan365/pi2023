// Neste arquivo conversores, vamos sempre converter uma 
// resposta de consulta do Oracle para um tipo que desejarmos
// portanto o intuito desse arquivo typescript é reunir funções
// que convertam de "linha do oracle" para um array javascript onde
// cada elemento represente um elemento de um tipo. 

import { Trecho } from "./Trecho";

export function rowsToTrechos(oracleRows: unknown[] | undefined) : Array<Trecho> {
  // vamos converter um array any (resultados do oracle)
  // em um array de Trecho
  let trechos: Array<Trecho> = [];
  let trecho;
  if (oracleRows !== undefined){
    oracleRows.forEach((registro: any) => {
      trecho = {
        nome: registro.NOME,
        origem: registro.ORIGEM,
        destino: registro.DESTINO,
        aeronave: registro.AERONAVE,
      } as Trecho;

      // inserindo o novo Array convertido.
      trechos.push(trecho);
    })
  }
  return trechos;
}