var ipAddress : String = "127.0.0.1";
var port : int = 25167;
var maxConnections : int = 10;
var playerGO : GameObject;
var log: String = "";
var myMessage : String = "";
var chatting : boolean = false;
var GUIfunktion : boolean = false;
var playerPrefab : GameObject;
var playerPrefab2 : GameObject;
var playerPrefab3 : GameObject;

function OnGUI () {
if(Network.peerType == NetworkPeerType.Disconnected) {
	 GUILayout.BeginHorizontal();
	 ipAddress=GUILayout.TextField(ipAddress);
	 GUILayout.Label("IP ADDRESS");
	 GUILayout.EndHorizontal();
	 
	 GUILayout.BeginHorizontal();
	 var tempPort : String; 
	 tempPort = GUILayout.TextField(port.ToString());
	 port = parseInt (tempPort);
	 GUILayout.Label ("PORT");
	 GUILayout.EndHorizontal();
	 
	 if (GUILayout.Button ("CONNECT")) {
	 	GUIfunktion = true;
	 	print ("connecting...");
	  	//Network.Instantiate (playerGO, transform.position, transform.rotation, 0);
	 	Network.Connect (ipAddress, port);
	 	for (var i : GameObject in FindObjectsOfType(GameObject)){
 			i.BroadcastMessage("OnLoadNetworkLevel", SendMessageOptions.DontRequireReceiver);
 		}
	 	
	 }
	 
	 if(GUILayout.Button ("START SERVER")){
	 for (var i : GameObject in FindObjectsOfType(GameObject)){
 			i.BroadcastMessage("OnLoadNetworkLevel", SendMessageOptions.DontRequireReceiver);
 		}
	 print ("starting server on " + ipAddress + ":" + port.ToString());
	 Network.InitializeServer (maxConnections, port, false);
	 
 	}
 }
 	else {
 		
 		if(GUILayout.Button("DISCONNECT")){ 		
 		Network.Disconnect(200);
 		}
 		if (Input.GetKeyDown (KeyCode.T)){
 		chatting = true;
	 }
	 
 }
 		if (Input.GetKeyDown (KeyCode.Escape)){
 		chatting = false;
 }
 if (chatting){
 GUILayout.Label(log);
 myMessage = GUILayout.TextField(myMessage);
 
 if(GUILayout.Button("SEND MESSAGE")){
 networkView.RPC("Chat", RPCMode.All, myMessage);
 }
 }
 if (GUIfunktion == true )
		{
			
			GUI.Box (new Rect (10,10,100,120), "Choose a Player");
			
			// Make the first button. If it is pressed, Application.Loadlevel (1) will be executed
			if (GUI.Button (new Rect (20,40,80,20), "Warrior")) {
				Network.Instantiate(playerPrefab, transform.position, transform.rotation, 0);;
				GUIfunktion = false;
			}
			
			// Make the second button.
			if (GUI.Button (new Rect (20,70,80,20), "Archer")) {
				Network.Instantiate(playerPrefab2, transform.position, transform.rotation, 0);;
				GUIfunktion = false;
			}
			
			
			if (GUI.Button (new Rect (20,100,80,20), "Mage")) {
				Network.Instantiate(playerPrefab3, transform.position, transform.rotation, 0);;
				GUIfunktion = false;
			}
			
			
			
			
			
		}
 
 
 }


function OnConnectedToServer (){
print("Connected");
OnLoadNetworkLevel();
}

function OnPlayerDisconnected (player : NetworkPlayer){
Network.RemoveRPCs(player);
Network.DestroyPlayerObjects(player);
}
function OnDisconnectedFromServer(){
Application.LoadLevel(Application.loadedLevel);
}

function OnLoadNetworkLevel(){
yield 25;
//GetComponent(Camera).rect = Rect ( 0.7, 0.7, 0.25, 0.25);
GetComponent(GUILayer).enabled = false;
if(Network.peerType != NetworkPeerType.Disconnected){
GUIfunktion = true;
//Network.Instantiate(playerGO, transform.position, transform.rotation, 0);
}



}
@RPC
function Chat (input : String){
 log += "\n";
 log += input;
}