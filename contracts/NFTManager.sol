// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFTCollection.sol";

contract NFTManager {
    NFTCollection private nftCollection;

    constructor(address _nftCollectionAddress) {
        nftCollection = NFTCollection(_nftCollectionAddress);
    }

    function mintNFT(address recipient) external {
        nftCollection.mintTo(recipient);
    }
}