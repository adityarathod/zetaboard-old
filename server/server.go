package server

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type Server struct {
}

func NewServer() *Server {
	return &Server{}
}

func (s *Server) Start() {
	r := mux.NewRouter()
	apiRouter := r.PathPrefix("/api").Subrouter()

	apiRouter.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "text/html")
		w.Write([]byte("<h1>Hello, World!</h1>"))
	})

	log.Fatal(http.ListenAndServe(":8000", r))
}
