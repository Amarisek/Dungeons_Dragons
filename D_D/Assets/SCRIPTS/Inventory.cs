using UnityEngine;
using System.Collections;

public class Inventory : MonoBehaviour {

	public bool keyOne;
	public bool keyTwo;
	public bool keyThree;
	public bool keyFour;

	void Start(){
		keyOne = false;
		keyTwo = false;
		keyThree = false;
		keyFour = false;
	}

	void ObtainKeyOne(){
		keyOne = true;
	}
	void ObtainKeyTwo(){
		keyTwo = true;
	}
	void ObtainKeyThree(){
		keyThree = true;
	}
	void ObtainKeyFour(){
		keyFour = true;
	}
}
