import { Transfer, S2NFT } from "../generated/templates/S2NFT/S2NFT";
import { TokenInfo } from "../generated/schema";

export function handleTransfer(event: Transfer): void {
  let contract_s2nft = S2NFT.bind(event.address);
  let tokenId = event.params.tokenId.toString();
  let tokenInfoId = event.address.toHex() + "-" + tokenId;
  let token = TokenInfo.load(tokenInfoId);

  if (!token) {
    token = new TokenInfo(tokenInfoId);
    token.ca = event.address;
    token.tokenId = event.params.tokenId;
    token.tokenURL = contract_s2nft.tokenURI(event.params.tokenId);
    token.name = contract_s2nft.name();
  }
  token.owner = event.params.to;
  token.blockNumber = event.block.number;
  token.blockTimestamp = event.block.timestamp;
  token.transactionHash = event.transaction.hash;

  token.save();
}
