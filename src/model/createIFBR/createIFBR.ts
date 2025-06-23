import { IFBR } from "../class/ifbr.js";
import { QuestIFBR } from "../class/questIFBR.js";
import * as query from "../insertDB/queryTools.js";

export let createIFBRCompleto = async (
  body: [{ id: number; name: string; score: number }]
) => {
  let dominioSensorial = new IFBR(1, "Dominio Sensorial", new Date());
  let dominioComunicacao = new IFBR(2, "Dominio Comunicação", new Date());
  let dominioMobilidade = new IFBR(3, "Dominio Mobilidade", new Date());
  let dominioCuidadosPessoais = new IFBR(
    4,
    "Dominio Cuidados Pessoais",
    new Date()
  );
  let dominioVidaDomestica = new IFBR(5, "Dominio Vida Doméstica", new Date());
  let domninioEducaçãoTrabalhoEconimia = new IFBR(
    6,
    "Domninio Educação, Trabalho e Econimia",
    new Date()
  );
  let dominioSocializacaoComunidade = new IFBR(
    7,
    "Dominio Socialização e Comunidade",
    new Date()
  );

  body.forEach((Element) => {
    if (Element.id > 1 && Element.id < 2) {
      dominioSensorial.push(
        new QuestIFBR(Element.id, Element.name, Element.score)
      );
    } else if (Element.id >= 2 && Element.id < 3) {
      dominioComunicacao.push(
        new QuestIFBR(Element.id, Element.name, Element.score)
      );
    } else if (Element.id >= 3 && Element.id < 4) {
      dominioMobilidade.push(
        new QuestIFBR(Element.id, Element.name, Element.score)
      );
    } else if (Element.id >= 4 && Element.id < 5) {
      dominioCuidadosPessoais.push(
        new QuestIFBR(Element.id, Element.name, Element.score)
      );
    } else if (Element.id >= 5 && Element.id < 6) {
      dominioVidaDomestica.push(
        new QuestIFBR(Element.id, Element.name, Element.score)
      );
    } else if (Element.id >= 6 && Element.id < 7) {
      domninioEducaçãoTrabalhoEconimia.push(
        new QuestIFBR(Element.id, Element.name, Element.score)
      );
    } else if (Element.id >= 7 && Element.id < 8) {
      dominioSocializacaoComunidade.push(
        new QuestIFBR(Element.id, Element.name, Element.score)
      );
    }
  });

  try {
    const result = await query.selectIDFrom("tb_candidato", "44405647801");
    console.log(result.rows);

    query.insertIntoIFBR("dom_sensorial", dominioSensorial, result.rows[0].id);
    query.insertIntoIFBR(
      "dom_comunicacao",
      dominioComunicacao,
      result.rows[0].id
    );
    query.insertIntoIFBR(
      "dom_mobilidade",
      dominioMobilidade,
      result.rows[0].id
    );
    query.insertIntoIFBR(
      "dom_cuidados_pessoais",
      dominioCuidadosPessoais,
      result.rows[0].id
    );
    query.insertIntoIFBR(
      "dom_vida_domestica",
      dominioVidaDomestica,
      result.rows[0].id
    );
    query.insertIntoIFBR(
      "dom_edu_trab_soci",
      domninioEducaçãoTrabalhoEconimia,
      result.rows[0].id
    );
    query.insertIntoIFBR(
      "dom_socializacao_comunidade",
      dominioSocializacaoComunidade,
      result.rows[0].id
    );
  } catch (e) {
    console.log(e);
  }

  return true;
};

export let createIFBRReduzido = () => {};
