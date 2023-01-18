package main

import "fmt"

func handleRequest(req) {

}

func main() {
	fmt.Println("vim-go")

	server.listen(&handleRequest)

	// internal
	for (;;) {
		req := server.waitForClient()
		go handleRequest(req)
		go handleRequest(req)
	}


}
