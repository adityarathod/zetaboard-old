package game

import (
	"fmt"
	"testing"
)

func TestSimpleGeneration(t *testing.T) {
	opts := GenerationOptions{
		ProblemTypes: map[int]ProblemOption{
			ProblemTypeSub: {
				Min: 0,
				Max: 10,
			},
		},
	}
	prob, _ := GenerateProblem(opts)
	fmt.Printf("%#v\n", prob)
}
