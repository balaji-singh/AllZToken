var AllzToken= artifacts.require("./AllzToken.sol");

contract('AllzToken',function(accounts){

	it('initialize the contract with correct values',function(){

		return AllzToken.deployed().then(function(instance){

			tokenInstance=instance;
			return tokenInstance.name();

		}).then(function(name){

			assert.equal(name,'Allianz Token','as the correct name');
			return tokenInstance.symbol();
		}).then(function(symbol){

			assert.equal(symbol,'ALLZ','has the correct sysmbol');
			
		});

	});

	it('trasfer token ownership',function(){

		return AllzToken.deployed().then(function(instance){

			tokenInstance=instance;
			//test requires statement first by transfering something longer than the sender's balance
			return tokenInstance.transfer.call(accounts[1],999999999999);

		}).then(assert.fail).catch(function(error){

			assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
			return tokenInstance.transfer(accounts[1],25000,{from: accounts[0]});
		}).then(function(receipt){

			assert.equal(receipt.logs.length,1,'triggers one event');
			assert.equal(receipt.logs[0].event,'Transfer' 'Should be the "Transfer" event');
			assert.equal(receipt.logs[0].args._form,accounts[0],'Logs the account the tokens are transfered from');
			assert.equal(receipt.logs[0].args._to,accounts[1],'Logs the account the tokens are transfered to');
			assert.equal(receipt.logs[0].args._value,25000,'Logs the account transfered ammount');
			
			return tokenInstance.balanceOf(accounts[1]);

		}).then(function(balance){

			assert.equal(balance.toNumber(),25000,'adds the amount to the receiving account');
			return tokenInstance.balanceOf(accounts[0]);

		}).then(function(balance){
			assert.equal(balance.toNumber(),99975000,'deducts the amount from the sending account');

		});


	});

	it('initialize the contract with correct Total Supplay',function(){

		return AllzToken.deployed().then(function(instance){

			tokenInstance=instance;
			return tokenInstance.totalSupply();

		}).then(function(totalSupply){

			assert.equal(totalSupply.toNumber(),100000000,'has the correct totalSupply');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(adminBalance){

			assert.equal(adminBalance.toNumber(),100000000,'has the correct adminBalance');
		});

	});
})
