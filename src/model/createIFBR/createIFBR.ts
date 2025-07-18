import { IFBR } from "../class/ifbr.js";
// import { QuestIFBR } from "../class/questIFBR.js";
import * as DB from "../../repository/insertDB/queryTools.js";

export let createIFBRCompleto = async (
  body: [{ id: number; name: string; score: number }], id_user: string
): Promise<any> => {
  console.log("Criando variaveis no ambiente De Desenvolvimento");
  let setId = () => {
    let prefix = "IFBR-";
    let suffix = Math.floor(Math.random() * 1000000);
    let id = prefix + suffix;
    return id;
  };
  let idIFBR = setId();
  let questIFBR: IFBR[] = [];
  console.log("Validando dados do IFBR");
  body.forEach((Element) => {
    if (Element.id > 1 && Element.id < 2) {
      let tupla = new IFBR(Element.id, Element.name, new Date(), Element.score);
      questIFBR.push(tupla);
    } else if (Element.id >= 2 && Element.id < 3) {
      let tupla = new IFBR(Element.id, Element.name, new Date(), Element.score);
      questIFBR.push(tupla);
    } else if (Element.id >= 3 && Element.id < 4) {
      let tupla = new IFBR(Element.id, Element.name, new Date(), Element.score);
      questIFBR.push(tupla);
    } else if (Element.id >= 4 && Element.id < 5) {
      let tupla = new IFBR(Element.id, Element.name, new Date(), Element.score);
      questIFBR.push(tupla);
    } else if (Element.id >= 5 && Element.id < 6) {
      let tupla = new IFBR(Element.id, Element.name, new Date(), Element.score);
      questIFBR.push(tupla);
    } else if (Element.id >= 6 && Element.id < 7) {
      let tupla = new IFBR(Element.id, Element.name, new Date(), Element.score);
      questIFBR.push(tupla);
    } else if (Element.id >= 7 && Element.id < 8) {
      let tupla = new IFBR(Element.id, Element.name, new Date(), Element.score);
      questIFBR.push(tupla);
    }
  });

  try {
    questIFBR.forEach((quest) => {
      DB.insertIntoIFBR(quest.id, quest.name, quest.date, quest.score, idIFBR);
    });
    DB.updateIfbrCandidato(id_user, idIFBR);
    DB.insertCandidatoIFBRData()
    return true
  } catch (e) {
    console.log(e);
  }
};

//   body: [{ id: number; name: string; score: number }]
// ) => {
//   let errorLog = [];
//   console.log("Criando variaveis no ambiente De Desenvolvimento");
//   let dominioSensorial = new IFBR(1, "Dominio Sensorial", new Date());
//   let dominioComunicacao = new IFBR(2, "Dominio Comunicação", new Date());
//   let dominioMobilidade = new IFBR(3, "Dominio Mobilidade", new Date());
//   let dominioCuidadosPessoais = new IFBR(
//     4,
//     "Dominio Cuidados Pessoais",
//     new Date()
//   );
//   let dominioVidaDomestica = new IFBR(5, "Dominio Vida Doméstica", new Date());
//   let domninioEducaçãoTrabalhoEconimia = new IFBR(
//     6,
//     "Domninio Educação, Trabalho e Econimia",
//     new Date()
//   );
//   let dominioSocializacaoComunidade = new IFBR(
//     7,
//     "Dominio Socialização e Comunidade",
//     new Date()
//   );

//   console.log("Validando dados do IFBR");
//   body.forEach((Element) => {
//     if (Element.id > 1 && Element.id < 2) {
//       dominioSensorial.push(
//         new QuestIFBR(Element.id, Element.name, Element.score)
//       );
//     } else if (Element.id >= 2 && Element.id < 3) {
//       dominioComunicacao.push(
//         new QuestIFBR(Element.id, Element.name, Element.score)
//       );
//     } else if (Element.id >= 3 && Element.id < 4) {
//       dominioMobilidade.push(
//         new QuestIFBR(Element.id, Element.name, Element.score)
//       );
//     } else if (Element.id >= 4 && Element.id < 5) {
//       dominioCuidadosPessoais.push(
//         new QuestIFBR(Element.id, Element.name, Element.score)
//       );
//     } else if (Element.id >= 5 && Element.id < 6) {
//       dominioVidaDomestica.push(
//         new QuestIFBR(Element.id, Element.name, Element.score)
//       );
//     } else if (Element.id >= 6 && Element.id < 7) {
//       domninioEducaçãoTrabalhoEconimia.push(
//         new QuestIFBR(Element.id, Element.name, Element.score)
//       );
//     } else if (Element.id >= 7 && Element.id < 8) {
//       dominioSocializacaoComunidade.push(
//         new QuestIFBR(Element.id, Element.name, Element.score)
//       );
//     }
//   });

//   try {
//     const result = await query.selectIDFrom("tb_candidato", "44405647801");
//     !result.rows.length ? errorLog.push("Candidato não encontrado") : null;

//     query.insertIntoIFBR("dom_sensorial", dominioSensorial, result.rows[0].id);
//     query.insertIntoIFBR(
//       "dom_comunicacao",
//       dominioComunicacao,
//       result.rows[0].id
//     );
//     query.insertIntoIFBR(
//       "dom_mobilidade",
//       dominioMobilidade,
//       result.rows[0].id
//     );
//     query.insertIntoIFBR(
//       "dom_cuidados_pessoais",
//       dominioCuidadosPessoais,
//       result.rows[0].id
//     );
//     query.insertIntoIFBR(
//       "dom_vida_domestica",
//       dominioVidaDomestica,
//       result.rows[0].id
//     );
//     query.insertIntoIFBR(
//       "dom_edu_trab_soci",
//       domninioEducaçãoTrabalhoEconimia,
//       result.rows[0].id
//     );
//     query.insertIntoIFBR(
//       "dom_socializacao_comunidade",
//       dominioSocializacaoComunidade,
//       result.rows[0].id
//     );

//     if (errorLog.length > 0) {
//       console.log("Dados Invalidos");
//       return errorLog;
//     } else {
//       console.log("Dados Validados");
//       return "Sucesso ao responder IFBR";
//     }
//   } catch (e) {
//     console.log(e);
//   }

//   return true;
// };
