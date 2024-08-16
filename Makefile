-include .env

.PHONY: all test clean env.clean install compile snapshot env.add

all: clean env.add install test

clean :; forge clean; rm -rf node_modules; 

# Clean the repo
env.clean :; init-clean; rm .env

env.add :; touch .env;

# Local installation
install :; npm i && npx husky

# CI installation
install.ci :; env.add; npm ci

# Update foundry
foundry.update:; foundryup

# Compile contracts using hardhat
compile :; npx hardhat compile

# Run integfation & unit tests
test :; forge test -vvv; npx hardhat test

# Run particular unit test
unit :; forge test -vvv --match-contract $(contract) 

snapshot :; forge snapshot

format :; forge fmt src/; forge fmt test/

lint :; npx solhint src/**/*.sol

# Run hardhat local network (node)
node :; npx hardhat node

network?=hardhat
task?=help

# Run deploy task based on hardhat.config
deploy :; npx hardhat --network $(network) deploy-bundle

# Execute any available hardhat tast (inclusing custom)
run :; npx hardhat --network $(network) $(task) 

-include ${FCT_PLUGIN_PATH}/makefile-external
