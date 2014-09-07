var getItem : boolean = false;
var keyone : boolean = false;
var keytwo : boolean = false;
var keythree : boolean = false;
var keyfour : boolean = false;
var player : GameObject;


function OnTriggerStay (other : Collider)
{
	if(other.gameObject.tag == "Player"){
		player = other.gameObject;
	}

	if (Input.GetKeyDown(KeyCode.F))
	{
		
		animation.Play("chest open");
		getItem = true;
	}

}


function OnGUI ()
{
	
	if (getItem == true){
	
	GUILayout.BeginArea (Rect (Screen.width/2-Screen.width/5,Screen.height/2-Screen.height/5,500,100));
	if (GUILayout.Button("TAKE KEY")){
	getItem = false;
	animation.Play("chest close");
		if(keyone == true){
			player.GetComponent("Inventory").ObtainKeyOne();
			
		}
		if(keytwo == true){
			player.GetComponent("Inventory").ObtainKeyTwo();
		}
		if(keythree == true){
			player.GetComponent("Inventory").ObtainKeyThree();
		}
		if(keyfour == true){
			player.GetComponent("Inventory").ObtainKeyFour();
		}
		
		Network.Destroy(this.gameObject);
		
		
	}
	
	if (GUILayout.Button("CLOSE CHEST")){
		getItem = false;
		animation.Play("chest close");
		
	}
	GUILayout.EndArea();
	}
	
}
