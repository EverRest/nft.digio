// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard, Ownable {
    struct Listing {
        address seller;
        address tokenAddress;
        uint256 tokenId;
        uint256 price;
        bool isSold;
    }

    struct Bid {
        address bidder;
        uint256 bidAmount;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;
    mapping(address => mapping(uint256 => Bid[])) public bids;

    event ItemListed(address indexed seller, address indexed tokenAddress, uint256 indexed tokenId, uint256 price);
    event ItemSold(address indexed buyer, address indexed seller, uint256 price);
    event BidPlaced(address indexed bidder, uint256 amount, address indexed tokenAddress, uint256 indexed tokenId);
    event BidAccepted(address indexed bidder, uint256 amount);

    // List an item on the marketplace
    function listItem(address tokenAddress, uint256 tokenId, uint256 price) external nonReentrant {
        IERC721(tokenAddress).transferFrom(msg.sender, address(this), tokenId);

        listings[tokenAddress][tokenId] = Listing({
            seller: msg.sender,
            tokenAddress: tokenAddress,
            tokenId: tokenId,
            price: price,
            isSold: false
        });

        emit ItemListed(msg.sender, tokenAddress, tokenId, price);
    }

    // Buy an item listed on the marketplace
    function buyItem(address tokenAddress, uint256 tokenId) external payable nonReentrant {
        Listing storage listing = listings[tokenAddress][tokenId];
        require(msg.value >= listing.price, "Insufficient funds");
        require(!listing.isSold, "Item already sold");

        listing.isSold = true;

        // Transfer funds to the seller
        payable(listing.seller).transfer(msg.value);
        IERC721(tokenAddress).transferFrom(address(this), msg.sender, tokenId);

        emit ItemSold(msg.sender, listing.seller, listing.price);
    }

    // Place a bid for an item
    function placeBid(address tokenAddress, uint256 tokenId) external payable {
        require(msg.value > 0, "Bid must be greater than zero");

        bids[tokenAddress][tokenId].push(Bid({
            bidder: msg.sender,
            bidAmount: msg.value
        }));

        emit BidPlaced(msg.sender, msg.value, tokenAddress, tokenId);
    }

    // Accept a bid for an item
    function acceptBid(address tokenAddress, uint256 tokenId, uint256 bidIndex) external nonReentrant {
        Listing storage listing = listings[tokenAddress][tokenId];
        require(listing.seller == msg.sender, "Only the seller can accept bids");

        Bid memory bid = bids[tokenAddress][tokenId][bidIndex];
        listing.isSold = true;

        // Transfer the bid amount to the seller
        payable(listing.seller).transfer(bid.bidAmount);
        IERC721(tokenAddress).transferFrom(address(this), bid.bidder, tokenId);

        emit BidAccepted(bid.bidder, bid.bidAmount);
    }
}
