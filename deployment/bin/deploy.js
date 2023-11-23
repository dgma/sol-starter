const fsp = require("node:fs/promises");
const fs = require("node:fs");
const path = require("node:path");
const hre = require("hardhat");

const loggedNetworks = ["sepolia", "arbitrum-sepolia"];

const getDeploymentLockData = async (networkName, filePath) => {
  const isExist = fs.existsSync(filePath);
  // skip localhost & one-time deployments
  return isExist && loggedNetworks.includes(networkName)
    ? JSON.parse(await fsp.readFile(filePath))
    : {};
};

const getLibrariesDynamically = (deploymentLock, config = {}) =>
  Object.entries(config).reduce((acc, [libName, getter]) => {
    return {
      ...acc,
      [libName]: getter(deploymentLock),
    };
  }, {});

const deployOnlyChanged =
  (deploymentConfig) =>
  async (deploymentLock = {}) => {
    const { contractName, deployerOptions = {}, args = [] } = deploymentConfig;

    console.log("prepare deployment libraries");

    deployerOptions.libraries = {
      ...deployerOptions?.libraries,
      ...getLibrariesDynamically(deploymentLock, deployerOptions?.dynamicLibs),
    };

    console.log("done", deployerOptions, args);

    console.log("Try deploy contract...", contractName);
    const deployer = await hre.ethers.getContractFactory(
      contractName,
      deployerOptions,
    );

    if (deployer.bytecode === deploymentLock[contractName]?.code) {
      console.log("contract unchanged, skip deployment");
      return deploymentLock;
    }

    const deployment = await deployer.deploy(...args);

    await deployment.waitForDeployment();

    const contractAddress = await deployment.getAddress();

    console.log("Contract deployed, address:", contractAddress);

    console.log("verify newly deployed contract...");

    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });

    console.log('done!')

    return {
      ...deploymentLock,
      [contractName]: { addr: contractAddress, code: deployer.bytecode },
    };
  };

module.exports = async function main() {
  try {
    const networkName = hre.network.name;
    const filePath = path.resolve("deployment-lock.json");

    const currentDeploymentLock = await getDeploymentLockData(
      networkName,
      filePath,
    );

    const deploymentResult = await deployOnlyChanged({
      contractName: "StreamsUpkeep",
      args: [
        "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
        "0xea9B98Be000FBEA7f6e88D08ebe70EbaAD10224c",
      ],
    })(currentDeploymentLock[networkName]).then(
      deployOnlyChanged({ contractName: "Emitter" }),
    );

    console.log(`Deployment to ${networkName} has finished, update lock file`);

    if (loggedNetworks.includes(networkName)) {
      await fsp.writeFile(
        filePath,
        JSON.stringify({
          ...currentDeploymentLock,
          [networkName]: deploymentResult,
        }),
      );
    }
    console.log("Done");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
