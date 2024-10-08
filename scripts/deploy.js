async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);

    const NFTCollection = await ethers.getContractFactory('NFTCollection');
    const nftCollection = await NFTCollection.deploy('MyNFT', 'MNFT', 'https://baseuri.com/');
    await nftCollection.deployed();

    console.log('NFTCollection deployed to:', nftCollection.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });