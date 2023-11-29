// Neste arquivo conversores, vamos sempre converter uma 
// resposta de consulta do Oracle para um tipo que desejarmos
// portanto o intuito desse arquivo typescript é reunir funções
// que convertam de "linha do oracle" para um array javascript onde
// cada elemento represente um elemento de um tipo. 

import { Assento } from "./Assento";

export function rowsToAssentos(oracleRows: unknown[] | undefined) : Array<Assento> {
  // vamos converter um array any (resultados do oracle)
  // em um array de Assento
  let assentos: Array<Assento> = [];
  let assento;
  if (oracleRows !== undefined){
    oracleRows.forEach((registro: any) => {
      assento = {
        codigo : registro.codigo, 
        numero : registro .numero,
        status : registro.status, 
        aeronave : registro.aeronave,
            } as Assento;

      // inserindo o novo Array convertido.
      assentos.push(assento);
    })
  }
  return assentos;
}