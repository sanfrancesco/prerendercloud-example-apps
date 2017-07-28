
start:
	yarn run prerendercloud-server -- public

deploylambda:
	cd lambda-xhr-endpoint && yarn run serverless -- deploy

deployroast:
	cp _redirects public
	roast deploy -p public
