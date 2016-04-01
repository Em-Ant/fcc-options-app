REPORTER = list
test:
	clear
	echo Starting test ******************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	test
	echo Ending test
test-w:
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER)  \
	--watch \
	test

.PHONY: test
