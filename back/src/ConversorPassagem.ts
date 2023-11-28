// Neste arquivo conversores, vamos sempre converter uma 
// resposta de consulta do Oracle para um tipo que desejarmos
// portanto o intuito desse arquivo typescript é reunir funções
// que convertam de "linha do oracle" para um array javascript onde
// cada elemento represente um elemento de um tipo. 

import { Passagem } from "./Passagem";

export function rowsToPassagens(oracleRows: unknown[] | undefined) : Array<Passagem> {
  // vamos converter um array any (resultados do oracle)
  // em um array de Passagem
  let Passagens: Array<Passagem> = [];
  let Passagem;
  if (oracleRows !== undefined){
    oracleRows.forEach((registro: any) => {
      Passagem = {
        codigo: registro.CODIGO, 
        letra : registro.LETRA,
        numero: registro.NUMERO, 
        idVoo : registro.IDVOO
      } as Passagem;

      // inserindo o novo Array convertido.
      Passagens.push(Passagem);
    })
  }
  return Passagens;
}