import Quest from "./Quest.js";

class QuestText extends Quest {
    text;

    constructor(text) {
        super();
        this.text = text;
    }
}

export default QuestText;