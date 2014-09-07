function Update () {

	if(!networkView.isMine) {
	GetComponent("ThirdPersonCamera").enabled = false;
	GetComponent(CharacterController).enabled = false;
	GetComponent("ThirdPersonController").enabled = false;
	GetComponent("Health").enabled = false;
	
	
	this.gameObject.BroadcastMessage("DisableCamera");

}

}