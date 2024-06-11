package game

import (
	"errors"
	"math/rand"
)

const (
	ProblemTypeAdd = iota
	ProblemTypeSub
	ProblemTypeMul
	ProblemTypeDiv
)

type Problem struct {
	Left        int
	Right       int
	Operator    string
	Answer      int
	ProblemType int
}

type GenerationOptions struct {
	ProblemTypes map[int]ProblemOption
}

type ProblemOption struct {
	Min int
	Max int
}

func GenerateProblem(options GenerationOptions) (Problem, error) {
	numProbTypes := len(options.ProblemTypes)
	if numProbTypes == 0 {
		return Problem{}, errors.New("no problem types provided")
	}
	problemType := rand.Intn(numProbTypes)

	if problemType == ProblemTypeAdd {
		return generateAdditionProblem(options.ProblemTypes[problemType]), nil
	} else if problemType == ProblemTypeSub {
		return generateSubtractionProblem(options.ProblemTypes[problemType]), nil
	} else if problemType == ProblemTypeMul {
		return generateMultiplicationProblem(options.ProblemTypes[problemType]), nil
	} else if problemType == ProblemTypeDiv {
		return generateDivisionProblem(options.ProblemTypes[problemType]), nil
	}

	return Problem{}, errors.New("invalid problem type")
}

func generateAdditionProblem(options ProblemOption) Problem {
	left := rand.Intn(options.Max-options.Min) + options.Min
	right := rand.Intn(options.Max-options.Min) + options.Min

	return Problem{
		Left:        left,
		Right:       right,
		Operator:    "+",
		Answer:      left + right,
		ProblemType: ProblemTypeAdd,
	}
}

func generateSubtractionProblem(options ProblemOption) Problem {
	left := rand.Intn(options.Max-options.Min) + options.Min
	right := rand.Intn(options.Max-options.Min) + options.Min

	return Problem{
		Left:        left + right,
		Right:       right,
		Operator:    "-",
		Answer:      right,
		ProblemType: ProblemTypeSub,
	}
}

func generateMultiplicationProblem(options ProblemOption) Problem {
	left := rand.Intn(options.Max-options.Min) + options.Min
	right := rand.Intn(options.Max-options.Min) + options.Min

	return Problem{
		Left:        left,
		Right:       right,
		Operator:    "*",
		Answer:      left * right,
		ProblemType: ProblemTypeMul,
	}
}

func generateDivisionProblem(options ProblemOption) Problem {
	left := rand.Intn(options.Max-options.Min) + options.Min
	right := rand.Intn(options.Max-options.Min) + options.Min

	return Problem{
		Left:        left * right,
		Right:       right,
		Operator:    "/",
		Answer:      left,
		ProblemType: ProblemTypeDiv,
	}
}
