class Questionnaire {
    id;
    name;
    score;
    domains = [];

    addDomain(domain) {
        this.domains.push(domain);
    }

    calculateScore() {    
        let score = 0;
        this.domains.forEach(domain => {
            score += domain.score;
        });
        this.score = score;
    }
}