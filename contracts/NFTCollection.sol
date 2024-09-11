// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollection is ERC721, Ownable {
    uint256 public currentTokenId;
    string public baseTokenURI;

    constructor(string memory name, string memory symbol, string memory baseURI) ERC721(name, symbol) {
        baseTokenURI = baseURI;
    }

    function mintTo(address recipient) public onlyOwner returns (uint256) {
        uint256 newTokenId = currentTokenId;
        currentTokenId += 1;
        _safeMint(recipient, newTokenId);
        return newTokenId;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }
}
