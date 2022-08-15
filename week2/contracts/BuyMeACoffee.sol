// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BuyMeACoffee {
	event NewMemo(
		address indexed from,
		uint256 timestamp,
		string name,
		string message
	);

	struct Memo {
		address from;
		uint256 timestamp;
		string name;
		string message;
	}

	Memo[] memos;

	address payable owner;

	constructor() {
		owner = payable(msg.sender);
	}

	function buyCoffee(string memory _name, string memory _message)
		public
		payable
	{
		require(msg.value > 0, "Pls end me some ether to buy me a coffee, ty :)");

		memos.push(Memo(msg.sender, block.timestamp, _name, _message));
		emit NewMemo(msg.sender, block.timestamp, _name, _message);
	}

	function withdrawTips() public {
		require(owner.send(address(this).balance));
	}

	function getMemos() public view returns (Memo[] memory) {
		return memos;
	}
}
