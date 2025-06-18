class Domain{
    id;
    name;
    score;
    items = [];

    constructor(id, name, score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }

    addItemDomain(item){
        this.items.push(item);
    }

    calculateScore(){
        let score = 0;
        this.items.forEach(item => {
            score += item.score;
        });
        this.score = score / this.items.length;
    }

    toString() {
        return `Id: ${this.id}, Nome: ${this.name}, Score: ${this.score} Items:\n ${this.items}`;
    }
}

export default Domain;