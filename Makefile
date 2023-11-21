-include .env

.PHONY: all test clean deploy-anvil

all: clean install forge-update forge-build hh-build test

# Clean the repo
clean :; forge clean

# Remove modules

install :; rm -rf lib && forge install --no-commit --no-git foundry-rs/forge-std && npm i && npx husky install

# Update Dependencies
forge-update:; forge update

forge-build:; forge build

hh-build :; npx hardhat compile

test :; forge test

integration :; npx hardhat run test

snapshot :; forge snapshot

slither :; slither ./contracts 

format :; npx prettier --write contracts/**/*.sol && npx prettier --write test/**/*.sol

lint :; npx solhint contracts/**/*.sol && npx solhint test/**/*.sol

anvil :; anvil -m 'test test test test test test test test test test test junk'

hhnode :; npx hardhat node

deploy-sepolia :; npx hardhat run --network sepolia deployment

deploy-anvil :; npx hardhat run --network anvil deployment

deploy-localhost :; npx hardhat run --network localhost deployment

-include ${FCT_PLUGIN_PATH}/makefile-external
