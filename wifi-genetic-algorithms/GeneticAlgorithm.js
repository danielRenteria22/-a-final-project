const generations = 30
const individualsPerGeneration = 70

class GenericAlgorithm{
    constructor(walls){
        this.walls = walls
    }

    train(onResult){
        let individuals = this.generateInitialIndividuals()
        console.log('Created initial generation');
        for(let generation = 0; generation < generations; generation++) {
            console.log(`Trainig generation ${generation + 1}`);
            for(let individual of individuals) {
                individual.calculateArea(this.walls)
            }
            
            for(let individual of individuals) {
                individual.calculateFitness()
            }

            if(generation < generations - 1){
                const newIndividuals = []
                for(let i = 0; i < individualsPerGeneration; i++){
                    const parent1 = this.selectRandomIndividual(individuals)
                    const parent2 = this.selectRandomIndividual(individuals)
                    newIndividuals.push(parent1.combine(parent2))
                }
                individuals = newIndividuals;
            }
        }

        let maxArea = 0;
        let winner = null;
        for(let individual of individuals){
            if(individual.area > maxArea){
                maxArea = individual.area
                winner = individual;
            }
        }
        console.log('Finished training')
        onResult(winner)
    }

    selectRandomIndividual(individuals) {
        let oddToBeat = Math.random()
        let individual = null;
        let tries = 0;
        while(individual == null) {
            tries++;
            if(tries > individualsPerGeneration) {
                oddToBeat = Math.random()
                tries = 0;
            }
            let candidate = this.selectRandom(individuals)
            if(candidate.canBeat(oddToBeat)){
                individual = candidate
            }
        }

        return individual;
    }

    selectRandom(array){
        return array[Math.floor(Math.random()*array.length)];
    }

    generateInitialIndividuals(){
        const individuals = []
        for(let i = 0; i < individualsPerGeneration; i++){
            const x = Math.round(Math.random() * width)
            const y = Math.round(Math.random() * height)
            const newModem = new Modem(x,y)
            individuals.push(newModem)
        }
        return individuals;
    }
}