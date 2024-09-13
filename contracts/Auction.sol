// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Marketplace.sol";

contract Auction {
    address public seller;
    address public highestBidder;
    uint256 public highestBid;
    bool public auctionEnded;
    Marketplace public marketplace;
    address public tokenAddress;
    uint256 public tokenId;

    event BidPlaced(address indexed bidder, uint256 amount);
    event AuctionEnded(address winner, uint256 amount);

    constructor(address _marketplace, address _tokenAddress, uint256 _tokenId) {
        seller = msg.sender;
        marketplace = Marketplace(_marketplace);
        tokenAddress = _tokenAddress;
        tokenId = _tokenId;
    }

    function placeBid() external payable {
        require(!auctionEnded, "Auction already ended");
        require(msg.value > highestBid, "There already is a higher bid");

        if (highestBidder != address(0)) {
            payable(highestBidder).transfer(highestBid);
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
        emit BidPlaced(msg.sender, msg.value);
    }

    function endAuction() external {
        require(msg.sender == seller, "Only the seller can end the auction");
        require(!auctionEnded, "Auction already ended");

        auctionEnded = true;
        payable(seller).transfer(highestBid);
        marketplace.finalizeAuction(tokenAddress, tokenId, highestBidder);
        emit AuctionEnded(highestBidder, highestBid);
    }
}