// Neste arquivo conversores, vamos sempre converter uma 
// resposta de consulta do Oracle para um tipo que desejarmos
// portanto o intuito desse arquivo typescript é reunir funções
// que convertam de "linha do oracle" para um array javascript onde
// cada elemento represente um elemento de um tipo. 

import { Trecho } from "./Trecho";

export function rowsToTrechos(oracleRows: unknown[] | undefined) : Array<Trecho> {
  // vamos converter um array any (resultados do oracle)
  // em um array de Trecho
  let aeronaves: Array<Trecho> = [];
  let aeronave;
  if (oracleRows !== undefined){
    oracleRows.forEach((registro: any) => {
      aeronave = {
        codigo: registro.CODIGO,
        fabricante: registro.FABRICANTE,
        modelo: registro.MODELO,
        anoFabricacao: registro.ANO_FABRICACAO,
        totalAssentos: registro.TOTAL_ASSENTOS,
        referencia: registro.REFERENCIA,
      } as Trecho;

      // inserindo o novo Array convertido.
      aeronaves.push(aeronave);
    })
  }
  return aeronaves;
}