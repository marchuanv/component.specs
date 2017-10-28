const utils = require('./utils.js');

function MessageBus(name, thisServerAddress, receivePublishMessage, receiveSubscribeMessage, sendMessage, isClient){

	const subscriptions=[];
	function getSubscriptions(channel, from, callback, callbackFail){
  		var exists=false;
  		for (var i = subscriptions.length - 1; i >= 0; i--) {
  			const msg=subscriptions[i];
  			if ( (channel && from && msg.channel==channel && msg.from==from)
  					|| (!channel && from && msg.from==from)
  					|| (channel && !from && msg.channel==channel))
  			{
				callback(msg);
				exists=true;
				break;
  			}
  		};
  		if (!exists && callbackFail){
  			callbackFail();
  		}
  	};

	receivePublishMessage(function(message){
		console.log('');
		console.log(`/// ${name} RECEIVED A PUBLISH MESSAGE ///`);
		console.log(`publishing messages to the ${message.channel} channel.`);
		getSubscriptions(message.channel, null, function(subscription){
			subscription.data=message.data;
			if (isClient){
				subscription.callback(subscription.data);
			} else {
				sendMessage(subscription);
			}
		});
		console.log('');
	});

	receiveSubscribeMessage(function(message){
		console.log('');
		console.log(`/// ${name} RECEIVED A SUBSCRIBE MESSAGE ///`);
		console.log(`handling subscription to channel: ${message.channel}, recipient: ${message.to}`);
		getSubscriptions(message.channel, message.from, function(subscription){
			console.log(`already subscribed to ${subscription.channel} channel from ${subscription.from}.`);
		},function(){
			console.log(`subscription to ${message.channel} channel from ${message.from} succesful.`);
			subscriptions.push(message);
		});
		console.log('');
	});

	this.publish=function(channel, data) {
		if (isClient==false){
  			throw 'only clients can publish, message bus is configured for processing only';
  		}
  		console.log();
  		console.log(`/// ${name} IS PUBLISHING TO ${channel} ///`);
  		const changedData=utils.removeUnserialisableFields(data);
		sendMessage({
			channel: channel,
			publish: true,
  	 		data: changedData,
  	 		error: ""
  	 	});
  	 	console.log();
  	};

  	this.subscribe=function(channel, recipientAddress, callback){
  		if (isClient==false){
  			throw 'only clients can subscribe, message bus is configured for processing only';
  		}
  		console.log();
  		console.log(`/// ${name} IS SUBSCRIBING TO ${channel} ///`);
  		const message = {
			channel: channel,
			callback: callback,
			publish: false,
			to: recipientAddress,
			error: ""
  		};
  		//get all local subscriptions and add them if they don't exist.
		getSubscriptions(message.channel, thisServerAddress, function(subscription){
			subscription.callback=callback;
		},function notFound(){
			console.log('adding client side subscriptions');
			subscriptions.push(message);
		});
  		sendMessage(message);
  		console.log();
  	};
};
module.exports=MessageBus;