import { Selector } from './selector'

export class RouletteWheelSelector implements Selector {
  select(population: number[][], fitness: number[], count: number): number[][] {
    const fitnessSum = fitness.reduce(
      (sum, chromosomeFitness) => sum + chromosomeFitness,
      0
    )
    return Array.from({ length: count }, () =>
      this.selectOne(population, fitness, fitnessSum)
    )
  }

  private selectOne(
    population: number[][],
    fitness: number[],
    fitnessSum: number
  ): number[] {
    let partialSum = Math.random() * fitnessSum
    for (let j = 0; j < fitness.length; j++) {
      partialSum -= fitness[j]
      if (partialSum < 0) {
        return population[j]
      }
    }
  }
}