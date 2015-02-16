function keyDown(d, tanks, POV) {
	// console.log(d.keyCode);
  //W key
  if(d.keyCode === 87){
    tanks[tanks._id].currentSpeed = -tanks[tanks._id].speed;
  }
  //S key
  if(d.keyCode === 83){
    tanks[tanks._id].currentSpeed = tanks[tanks._id].speed;
  }
  //D key
  if(d.keyCode === 68){
    tanks[tanks._id].spin = 0.05;
  }
  //A key
  if(d.keyCode === 65){
    tanks[tanks._id].spin = -0.05;
  }
  //space
  if (d.keyCode === 32){
    tanks[tanks._id].isFire = true;
  }
  //c
  if(d.keyCode === 67){
      var counter = 0;
      setInterval(function(){
        if (counter < 50){
          tanks[tanks._id].tanker.position.y += 0.06
          counter++
        }

        if (counter >= 50 && counter < 100){
          tanks[tanks._id].tanker.position.y -= 0.06
          counter++
        }
      }, 10)
  }
}

function keyUp (d, tanks){
	//W ke
  if(d.keyCode === 87){
    tanks[tanks._id].currentSpeed = 0;
  }
  //S ke
  if(d.keyCode === 83){
    tanks[tanks._id].currentSpeed = 0;
  }
  //D key
  if(d.keyCode === 68){
    tanks[tanks._id].spin = 0;
  }
  //A key
  if(d.keyCode === 65){
    tanks[tanks._id].spin = 0;  
  }
  //space
  if (d.keyCode === 32){
    tanks[tanks._id].isFire = false;
  }
}