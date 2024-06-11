import { rand, rrThunk } from '../num-util'
import Problem, { Operation } from './problem'

type ChosenOps = 'add' | 'sub' | 'mul' | 'div'

type MinMaxSetting = { min: number; max: number }

type OpConstraints = {
  addLeft: MinMaxSetting
  addRight: MinMaxSetting
  mulLeft: MinMaxSetting
  mulRight: MinMaxSetting
}

const gen = (op: Operation, leftGen: () => number, rightGen: () => number) => {
  return () => {
    const num1 = leftGen()
    const num2 = rightGen()
    if (op === '-') return new Problem(num1 + num2, num1, op)
    else if (op === '/') {
      return new Problem(num1 * num2, num1, op)
    } else return new Problem(num1, num2, op)
  }
}

type GeneratorSettings = { ops: ChosenOps[]; constraints: OpConstraints }

const createGen = ({ constraints, ops }: GeneratorSettings): (() => Problem) => {
  const generators = {
    addLeft: rrThunk(constraints.addLeft.min, constraints.addLeft.max),
    addRight: rrThunk(constraints.addRight.min, constraints.addRight.max),
    mulLeft: rrThunk(constraints.mulLeft.min, constraints.mulLeft.max),
    mulRight: rrThunk(constraints.mulRight.min, constraints.mulRight.max),
  }
  const add = gen('+', generators.addLeft, generators.addRight)
  const sub = gen('-', generators.addLeft, generators.addRight)
  const mul = gen('*', generators.mulLeft, generators.mulRight)
  const div = gen('/', generators.mulLeft, generators.mulRight)
  const pgs: (() => Problem)[] = []
  if (ops.includes('add')) pgs.push(add)
  if (ops.includes('sub')) pgs.push(sub)
  if (ops.includes('mul')) pgs.push(mul)
  if (ops.includes('div')) pgs.push(div)
  const bigGen = () => {
    const chosenGen = pgs[rand(pgs.length * 4) % pgs.length]
    const prob = chosenGen()
    if (!Number.isInteger(prob.answer)) return bigGen()
    else return prob
  }
  return bigGen
}

export default createGen
