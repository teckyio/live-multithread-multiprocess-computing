int main () {

  func1();
	func2();
	int pid = fork();
	if (pid) {
		// I am master thread
	} else {
		// I am worker thread
	}

	return 0;
}