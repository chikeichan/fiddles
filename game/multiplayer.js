//define event handler
var eventHandlers = {
	//Messaging
	message: function(msg){
		console.log(msg);
	},
	//Console log broadcast message
	broadcast: function(msg){
		console.log(msg);
	},
	//Add bullets to all users
	addBullet: function(pos){
		var bullet = Bullet(-Math.sin(pos.direction), -Math.cos(pos.direction), 10);

    bullet.bulleter.position.x = pos.x;
    bullet.bulleter.position.y = pos.y;
    bullet.bulleter.position.z = pos.z;
    bullets.push(bullet);
    map.scene.add(bullet.bulleter);
    bullet._id = pos.id;

    setTimeout(function(){
      map.scene.remove(bullets.shift().bulleter);
    },1000)
	},
	//Sync movements for all users
	move: function(state){
		if(!tanks[state.id]){
			tanks[state.id] = Tank(1,1,1, state.color, 0.1);
			map.scene.add(tanks[state.id].tanker);
			tanks[state.id].tanker.position.x = state.x;
			tanks[state.id].tanker.position.y = state.y;
			tanks[state.id].tanker.position.z = state.z;
			tanks[state.id].tanker.rotation.x = state.rx;
			tanks[state.id].tanker.rotation.y = state.ry;
			tanks[state.id].tanker.rotation.z = state.rz;
		} else {
			tanks[state.id].tanker.position.x = state.x;
			tanks[state.id].tanker.position.y = state.y;
			tanks[state.id].tanker.position.z = state.z;
			tanks[state.id].tanker.rotation.x = state.rx;
			tanks[state.id].tanker.rotation.y = state.ry;
			tanks[state.id].tanker.rotation.z = state.rz;
		}
	},
	//send tanks._id to socket id
	id: function(id){
		var r = Math.floor(Math.random()*256);
		var g = Math.floor(Math.random()*256);
		var b = Math.floor(Math.random()*256);
		var rgb = 'rgb('+r+','+g+','+b+')';

		tanks[id] = Tank(1,1,1, rgb, 0.1);
		map.scene.add(tanks[id].tanker);
		tanks._id = id;
	}
};

//Multiplayer mode constructor
function Multiplayer(map,tanks,bullets){
	var multiplayer = {};

	//Instantiate socket
	multiplayer.socket = io();

	//Inject event handler to socket
	for(var event in eventHandlers){
		multiplayer.socket.on(event, eventHandlers[event]);
	}

	//Add events emitting functions
	multiplayer.sendMsg = function(msg){
	  multiplayer.socket.emit('send',msg)
	};

	//Syncing tank position and rotation
	multiplayer.sync = function(data){
		multiplayer.socket.emit('sync',data);
	};

	//Syncing tank position and rotation
	multiplayer.fire = function(data){
		multiplayer.socket.emit('syncBullet',data);
	};


	return multiplayer;
}