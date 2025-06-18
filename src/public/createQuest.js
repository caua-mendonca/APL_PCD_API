import Domain from "./services/Domain.js";
import Quest from "./services/Quest.js";
import QuestIFBR from "./QuestIFBR.js";

let sensorial = new Domain(1, "Dominio Sensorial", 0);
let comunicacao = new Domain(2, "Dominio Comunicacao", 0);
let mobilidade = new Domain(3, "Dominio Mobilidade", 0);
let cuiadosPessoais = new Domain(4, "Dominio Cuidados Pessoais", 0);
let vidaDomestica = new Domain(5, "Dominio Vida Domestica", 0);
let eduTrabEco = new Domain(6, "Dominio Educação, Trabalho e Economia", 0);
let socializacaoComunit = new Domain(
  7,
  "Dominio Socializacao e Vida Comunitaria",
  0
);

//! CRIAÇÃO DE PERGUNTAS DO DOMINIO SENSORIAL
sensorial.addItemDomain(new Quest(1.1, "Ver", 100));
sensorial.addItemDomain(new Quest(1.2, "Ouvir", 50));

//! CRIAÇÃO DE PERGUNTAS DO DOMINIO COMUNICAÇÃO
comunicacao.addItemDomain(
  new Quest(2.1, "Comunicar-se / Recepção de mensagens", 100)
);
comunicacao.addItemDomain(
  new Quest(2.2, "Comunicar-se / Produção de mensagens", 50)
);
comunicacao.addItemDomain(new Quest(2.3, "Conversar ", 50));
comunicacao.addItemDomain(new Quest(2.4, "Discutir", 50));
comunicacao.addItemDomain(
  new Quest(2.5, "Utilização de dispositivos de comunicação à distância", 50)
);

//! CRIAÇÃO DE PERGUNTAS DO DOMINIO MOBILIDADE
mobilidade.addItemDomain(
  new Quest(3.1, "Mudar e manter a posição do corpo", 100)
);
mobilidade.addItemDomain(
  new Quest(3.2, "Alcançar, transportar e mover objetos", 50)
);
mobilidade.addItemDomain(new Quest(3.3, "Movimentos finos da mão", 50));
mobilidade.addItemDomain(new Quest(3.4, "Deslocar-se dentro de casa", 50));
mobilidade.addItemDomain(
  new Quest(3.5, "Deslocar-se dentro de edifícios que não a própria casa", 50)
);
mobilidade.addItemDomain(
  new Quest(3.6, "Deslocar-se fora de sua casa e de outros edifícios", 50)
);
mobilidade.addItemDomain(new Quest(3.7, "Utilizar transporte coletivo", 50));
mobilidade.addItemDomain(
  new Quest(3.8, "Utilizar transporte individual como passageiro", 50)
);

//! CRIAÇÃO DE PERGUNTAS DO DOMINIO CUIDADOS PESSOAIS
cuiadosPessoais.addItemDomain(new Quest(4.1, "Lavar-se ", 100));
cuiadosPessoais.addItemDomain(new Quest(4.2, "Cuidar de partes do corpo", 50));
cuiadosPessoais.addItemDomain(new Quest(4.3, "Ir ao banheiro – Urinar", 50));
cuiadosPessoais.addItemDomain(new Quest(4.4, "Ir ao banheiro – Defecar", 50));
cuiadosPessoais.addItemDomain(new Quest(4.5, "Vestir-se", 50));
cuiadosPessoais.addItemDomain(new Quest(4.6, "Comer", 50));
cuiadosPessoais.addItemDomain(new Quest(4.7, "Beber", 50));
cuiadosPessoais.addItemDomain(
  new Quest(4.8, "Capacidade de identificar agravos à saúde", 50)
);

//! CRIAÇÃO DE PERGUNTAS DO DOMINIO VIDA DOMÉSTICA
vidaDomestica.addItemDomain(new Quest(5.1, "Preparar lanches", 100));
vidaDomestica.addItemDomain(new Quest(5.2, "Cozinhar", 50));
vidaDomestica.addItemDomain(new Quest(5.3, "Realizar tarefas domésticas", 50));
vidaDomestica.addItemDomain(
  new Quest(
    5.4,
    "Manutenção e uso apropriado de objetos pessoais e utensílios da casa",
    50
  )
);
vidaDomestica.addItemDomain(new Quest(5.5, "Cuidar dos outros", 50));

// ! CRIAÇÃO DE PERGUNTAS DO DOMINIO EDUCAÇÃO, TRABALHO E ECONOMIA
eduTrabEco.addItemDomain(new Quest(6.1, "Educação", 100));
eduTrabEco.addItemDomain(new Quest(6.2, "Qualificação profissional", 50));
eduTrabEco.addItemDomain(new Quest(6.3, "Trabalho remunerado", 50));
eduTrabEco.addItemDomain(
  new Quest(6.4, "Fazer compras e contratar serviços", 50)
);
eduTrabEco.addItemDomain(
  new Quest(6.5, "Administração de recursos econômicos pessoais", 50)
);

// ! CRIAÇÃO DE PERGUNTAS DO DOMINIO SOCIALIZACAO COMUNITARIA

socializacaoComunit.addItemDomain(
  new Quest(7.1, "Regular o comportamento nas interações", 100)
);
socializacaoComunit.addItemDomain(
  new Quest(7.2, "Interagir de acordo com as regras sociais", 50)
);
socializacaoComunit.addItemDomain(
  new Quest(7.3, "Relacionamentos com estranhos", 50)
);
socializacaoComunit.addItemDomain(
  new Quest(7.4, "Relacionamentos familiares e com pessoas familiares", 50)
);
socializacaoComunit.addItemDomain(
  new Quest(7.5, "Relacionamentos íntimos", 50)
);
socializacaoComunit.addItemDomain(new Quest(7.6, "Socialização", 50));
socializacaoComunit.addItemDomain(
  new Quest(7.7, "Fazer as próprias escolhas", 50)
);
socializacaoComunit.addItemDomain(
  new Quest(7.8, "Vida Política e Cidadania", 50)
);

// ! CALCULO DE PONTUACAO DE CADA DOMINIO
sensorial.calculateScore();
comunicacao.calculateScore();
mobilidade.calculateScore();
cuiadosPessoais.calculateScore();
vidaDomestica.calculateScore();
eduTrabEco.calculateScore();
socializacaoComunit.calculateScore();

let questionnaire = new QuestIFBR();

questionnaire.setQuestions(sensorial);
questionnaire.setQuestions(comunicacao);
questionnaire.setQuestions(mobilidade);
questionnaire.setQuestions(cuiadosPessoais);
questionnaire.setQuestions(vidaDomestica);
questionnaire.setQuestions(eduTrabEco);
questionnaire.setQuestions(socializacaoComunit);

console.log(questionnaire.toString());

