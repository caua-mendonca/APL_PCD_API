class QuestIFBR {
  questions = [];

  setQuestions(questions) {
    this.questions.push(questions);
  }

  toString() {
    console.log(this.questions.forEach((quest) => console.log(`ID - ${quest.id}, NAME - ${quest.name}, SCORE - ${quest.score} - ITENS DOMAIN - ${quest.items}\n`)));
  }
}
export default QuestIFBR;