class Quest {
  id;
  name;
  score = 0;

  constructor(id, name, score) {
    this.id = id;
    this.name = name;
    this.score = score;
  }

  toString() {
    return `Id: ${this.id}, Nome: ${this.name}`;
  }
}

export default Quest;
