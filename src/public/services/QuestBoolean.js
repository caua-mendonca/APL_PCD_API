import Quest from "./Quest.js";

class QuestBoolean extends Quest {
  logic;
  constructor(logic) {
    super();
    this.logic = logic;
  }
}

export default QuestBoolean;
