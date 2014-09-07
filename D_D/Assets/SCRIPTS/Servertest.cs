using UnityEngine;
using System.Collections;

public class Servertest : MonoBehaviour {

	public Transform playerPrefab;
	public Transform playerPrefab2;
	public Transform playerPrefab3;
	
	public bool GUIfunktion; 
	
	
	
	void Start () 
	{
		GUIfunktion = false;
		Network.InitializeServer (10, 20015, true);
	}
	
	void OnNetworkLoadedLevel ()
	{
		
		
		GUIfunktion = true;
		
		
		
	}
	
	
	
	
	
	
	void OnGUI () 
	{
		if (Network.peerType != NetworkPeerType.Disconnected) {
			GUI.Box(new Rect (10,10,100,120), "Select option");
			//GUI.TextArea(new Rect ());

			if(GUI.Button (new Rect (20,40,80,20), "Start Server"))
			{

			}
			if(GUI.Button (new Rect (20,40,80,20), "Connect to server"))
			{

			}
		}
		
		if (GUIfunktion == true )
		{
			
			GUI.Box (new Rect (10,10,100,120), "Choose a Player");
			
			// Make the first button. If it is pressed, Application.Loadlevel (1) will be executed
			if (GUI.Button (new Rect (20,40,80,20), "Player1")) {
				Network.Instantiate(playerPrefab, transform.position, transform.rotation, 0);;
				GUIfunktion = false;
			}
			
			// Make the second button.
			if (GUI.Button (new Rect (20,70,80,20), "Player2")) {
				Network.Instantiate(playerPrefab2, transform.position, transform.rotation, 0);;
				GUIfunktion = false;
			}
			
			
			if (GUI.Button (new Rect (20,100,80,20), "Player3")) {
				Network.Instantiate(playerPrefab3, transform.position, transform.rotation, 0);;
				GUIfunktion = false;
			}
			
			
			
			
			
		}
		
		
	}
	
	
	
	
	void OnPlayerDisconnected (NetworkPlayer player)
	{
		Debug.Log("Server destroying player");
		Network.RemoveRPCs(player, 0);
		Network.DestroyPlayerObjects(player);
	}

}
