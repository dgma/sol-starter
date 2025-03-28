# Flankk protocol contract

[![Quality Gate](https://github.com/dgma/flankk-contracts/actions/workflows/quality-gate.yml/badge.svg)](https://github.com/dgma/flankk-contracts/actions/workflows/quality-gate.yml)

Bidirectional payment channel protocol on top of EVM-compatible chains for instant & private payments

_Important_: The smart contracts is not audited, please be extra caution when use them in production

## Requirements

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you've done it right if you can run `git --version`
- [Node.js](https://nodejs.org/en)
- [Hardhat](https://hardhat.org/docs) for JS integration tests & deployment
- [Foundry / Foundryup](https://github.com/gakonst/foundry) for unit testing
- Optional. [Docker](https://www.docker.com/). Run docker if you want to use dev container

_note:_ For windows os you'll need to install `make`. For instance via choco: `sh choco install make`

## Installation

```sh
make
```

## Configuration

- All commands/aliases are declared in the Makefile.
- use forge as solidity formatter in your IDE settings
  - For VS it's recommended to use [Juan Blanco Plugin](https://github.com/juanfranblanco/vscode-solidity) and have the next sittings.json

```json
{
  "solidity.formatter": "forge",
  "solidity.packageDefaultDependenciesContractsDirectory": "src",
  "solidity.packageDefaultDependenciesDirectory": ["node_modules", "lib"],
  "solidity.remappings": [
    "@std=lib/forge-std/src/",
    "forge-std/=lib/forge-std/src/",
    "@openzeppelin/=node_modules/@openzeppelin/",
    "src=src/"
  ],
  "solidity.defaultCompiler": "localNodeModule",
  "[solidity]": {
    "editor.defaultFormatter": "JuanBlanco.solidity"
  }
}
```

## Contributing

Contributions are always welcome! Open a PR or an issue!

## Resources

- [Foundry Documentation](https://book.getfoundry.sh/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [hardhat-sol-bundler Documentation](https://github.com/dgma/hardhat-sol-bundler)
- [Makefile simple guide](https://opensource.com/article/18/8/what-how-makefile)
