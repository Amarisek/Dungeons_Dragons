using UnityEngine;
using System.Collections;

public class GoblinAttack : MonoBehaviour {

	public GameObject goblin;
	public float speed;
	public float step;
	void OnTriggerStay(Collider other){

		if(other.gameObject.tag == "Player"){

		
			step = speed * Time.deltaTime;

			goblin.transform.position = Vector3.MoveTowards(goblin.transform.position, other.transform.position, step);

			goblin.transform.LookAt(other.transform);


		}
			
	}



}
