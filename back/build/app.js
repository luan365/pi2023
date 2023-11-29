"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// recursos/modulos necessarios.
const express_1 = __importDefault(require("express"));
const oracledb_1 = __importDefault(require("oracledb"));
const cors_1 = __importDefault(require("cors"));
const ConversorPassagem_1 = require("./ConversorPassagem");
// criamos um arquivo para conter só a constante de conexão do oracle. com isso deixamos o código mais limpo por aqui
const OracleConnAtribs_1 = require("./OracleConnAtribs");
// conversores para facilitar o trabalho de conversão dos resultados Oracle para vetores de tipos nossos.
const Conversores_1 = require("./Conversores");
const ConversorTrechos_1 = require("./ConversorTrechos");
// validadores para facilitar o trabalho de validação.
const Validadores_1 = require("./Validadores");
// preparar o servidor web de backend na porta 3000
const app = (0, express_1.default)();
const port = 3000;
// preparar o servidor para dialogar no padrao JSON 
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Acertando a saída dos registros oracle em array puro javascript.
oracledb_1.default.outFormat = oracledb_1.default.OUT_FORMAT_OBJECT;
// servicos de backend
//------------------------------------------------------------------
app.get("/listarAeronaves", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined, };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        // atenção: mudamos a saída para que o oracle entregue um objeto puro em JS no rows.
        // não mais um array dentro de array.
        let resultadoConsulta = yield connection.execute(`SELECT * FROM AERONAVES`);
        cr.status = "SUCCESS";
        cr.message = "Dados obtidos";
        // agora sempre vamos converter as linhas do oracle em resultados do nosso TIPO.
        cr.payload = ((0, Conversores_1.rowsToAeronaves)(resultadoConsulta.rows));
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        if (connection !== undefined) {
            yield connection.close();
        }
        res.send(cr);
    }
}));
//------------------------------------------------------------------
app.post("/criarAssentos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    // Obtendo os parâmetros da requisição
    const { fileiras, colunas, idVoo } = req.body;
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        // Preparando a chamada à função pCriarAssentos
        const plsql = `
      BEGIN
        pCriarAssentos(:fileiras, :colunas, :idVoo);
      END;
    `;
        const bindVars = {
            fileiras,
            colunas,
            idVoo,
        };
        // Executando a chamada à função
        yield connection.execute(plsql, bindVars);
        cr.status = "SUCCESS";
        cr.message = "Assentos criados com sucesso";
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao Oracle. Sem detalhes";
        }
    }
    finally {
        if (connection !== undefined) {
            yield connection.close();
        }
        res.send(cr);
    }
}));
//------------------------------------------------------------------
app.get("/listarAssentos/:codigoAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        const codigoAeronave = req.query.codigo;
        // Obter informações sobre os assentos da aeronave
        const resultadoConsulta = `SELECT * FROM ASSENTOS WHERE AERONAVE = :1 ORDER BY NUMERO`;
        const dado = [codigoAeronave];
        console.log(dado);
        yield connection.execute(resultadoConsulta, dado);
        cr.status = "SUCCESS";
        cr.message = "Dados obtidos";
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao Oracle. Sem detalhes";
        }
    }
    finally {
        if (connection !== undefined) {
            yield connection.close();
        }
        res.send(cr);
    }
}));
//------------------------------------------------------------------
app.get("/listarTrechos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined, };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        // atenção: mudamos a saída para que o oracle entregue um objeto puro em JS no rows.
        // não mais um array dentro de array.
        let resultadoConsulta = yield connection.execute(`SELECT * FROM TRECHOS`);
        cr.status = "SUCCESS";
        cr.message = "Dados obtidos";
        // agora sempre vamos converter as linhas do oracle em resultados do nosso TIPO.
        cr.payload = ((0, ConversorTrechos_1.rowsToTrechos)(resultadoConsulta.rows));
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        if (connection !== undefined) {
            yield connection.close();
        }
        res.send(cr);
    }
}));
//------------------------------------------------------------------
app.put("/alterarAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtenha aeronave e código da requisição.
    const aero = req.body;
    const codigo = aero.codigo;
    // Defina um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    // Valide a aeronave.
    let [valida, mensagem] = (0, Validadores_1.aeronaveValida)(aero);
    if (!valida) {
        // Se a aeronave não for válida, envie uma resposta de erro.
        cr.message = mensagem;
        res.send(cr);
    }
    else {
        // Continue o processo porque passou na validação.
        let connection;
        try {
            const cmdUpdateAero = `UPDATE AERONAVES 
      SET FABRICANTE = :1, MODELO = :2, ANO_FABRICACAO = :3, TOTAL_ASSENTOS = :4, REFERENCIA = :5
      WHERE CODIGO = :6`;
            const dados = [
                aero.fabricante,
                aero.modelo,
                aero.anoFabricacao,
                aero.totalAssentos,
                aero.referencia,
                codigo,
            ];
            for (let i = 0; i < dados.length; i++)
                console.log("dados: " + `${dados[i]}`);
            console.log(codigo + " e " + aero.codigo);
            connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
            let resUpdate = yield connection.execute(cmdUpdateAero, dados);
            // Importante: efetuar o commit para gravar no Oracle.
            yield connection.commit();
            // Obter a informação de quantas linhas foram atualizadas.
            const rowsUpdated = resUpdate.rowsAffected;
            if (rowsUpdated !== undefined && rowsUpdated === 1) {
                cr.status = "SUCCESS";
                cr.message = "Aeronave atualizada.";
            }
        }
        catch (e) {
            if (e instanceof Error) {
                cr.message = e.message;
                console.log(e.message);
            }
            else {
                cr.message = "Erro ao conectar ao Oracle. Sem detalhes";
            }
        }
        finally {
            // Fechar a conexão.
            if (connection !== undefined) {
                yield connection.close();
            }
            // Enviar a resposta da requisição.
            res.send(cr);
        }
    }
}));
//------------------------------------------------------------------
app.put("/inserirAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    // UAU! Agora com um tipo definido podemos simplesmente converter tudo que 
    // chega na requisição para um tipo nosso!
    const aero = req.body;
    console.log(aero);
    // antes de prosseguir, vamos validar a aeronave!
    // se não for válida já descartamos.
    let [valida, mensagem] = (0, Validadores_1.aeronaveValida)(aero);
    if (!valida) {
        // já devolvemos a resposta com o erro e terminamos o serviço.
        cr.message = mensagem;
        res.send(cr);
    }
    else {
        // continuamos o processo porque passou na validação.
        let connection;
        try {
            const cmdInsertAero = `INSERT INTO AERONAVES 
      (CODIGO, FABRICANTE, MODELO, ANO_FABRICACAO, TOTAL_ASSENTOS, REFERENCIA)
      VALUES
      (SEQ_AERONAVES.NEXTVAL, :1, :2, :3, :4, :5)`;
            const dados = [aero.fabricante, aero.modelo, aero.anoFabricacao, aero.totalAssentos, aero.referencia];
            connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
            let resInsert = yield connection.execute(cmdInsertAero, dados);
            // importante: efetuar o commit para gravar no Oracle.
            yield connection.commit();
            // obter a informação de quantas linhas foram inseridas. 
            // neste caso precisa ser exatamente 1
            const rowsInserted = resInsert.rowsAffected;
            if (rowsInserted !== undefined && rowsInserted === 1) {
                cr.status = "SUCCESS";
                cr.message = "Aeronave inserida.";
            }
        }
        catch (e) {
            if (e instanceof Error) {
                cr.message = e.message;
                console.log(e.message);
            }
            else {
                cr.message = "Erro ao conectar ao oracle. Sem detalhes";
            }
        }
        finally {
            //fechar a conexao.
            if (connection !== undefined) {
                yield connection.close();
            }
            res.send(cr);
        }
    }
}));
//------------------------------------------------------------------
app.delete("/excluirAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // excluindo a aeronave pelo código dela:
    const codigo = req.body.codigo;
    console.log('Codigo recebido: ' + codigo);
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    // conectando 
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        const cmdDeleteAero = `DELETE FROM AERONAVES WHERE codigo = :1`;
        const dados = [codigo];
        let resDelete = yield connection.execute(cmdDeleteAero, dados);
        let result = yield connection.execute(`SELECT COUNT(*) FROM TRECHOS WHERE aeronave = :1`, [codigo]);
        if (+result > 0) {
            cr.message = "Aeronave não excluída. Aeronave está associada a um voo";
            console.log(cr.message);
        }
        else {
            // importante: efetuar o commit para gravar no Oracle.
            yield connection.commit();
            // obter a informação de quantas linhas foram inseridas. 
            // neste caso precisa ser exatamente 1
            const rowsDeleted = resDelete.rowsAffected;
            if (rowsDeleted !== undefined && rowsDeleted === 1) {
                cr.status = "SUCCESS";
                cr.message = "Aeronave excluída.";
            }
            else
                cr.message = "Aeronave não excluída. Verifique se o código informado está correto.";
        }
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        // fechando a conexao
        if (connection !== undefined)
            yield connection.close();
        // devolvendo a resposta da requisição.
        res.send(cr);
    }
}));
//------------------------------------------------------------------
app.get("/listarPassagens", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        // atenção: mudamos a saída para que o oracle entregue um objeto puro em JS no rows.
        // não mais um array dentro de array.
        let resultadoConsulta = yield connection.execute(`SELECT * FROM PASSAGENS`);
        cr.status = "SUCCESS";
        cr.message = "Dados obtidos";
        // agora sempre vamos converter as linhas do oracle em resultados do nosso TIPO.
        cr.payload = ((0, ConversorPassagem_1.rowsToPassagens)(resultadoConsulta.rows)); // Adapte conforme necessário
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        if (connection !== undefined) {
            yield connection.close();
        }
        res.send(cr);
    }
}));
app.listen(port, () => {
    console.log("Servidor HTTP funcionando...");
});
