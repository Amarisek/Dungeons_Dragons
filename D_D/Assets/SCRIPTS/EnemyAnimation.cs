using UnityEngine;
using System.Collections;

public class EnemyAnimation : MonoBehaviour {

	public GoblinAttack goblinAttack;
	public float attackTime;
	public float attackInterval;

	void Start (){
		attackTime = Time.time;
		//timepassed = 0;
	}

	void Update(){




		if (goblinAttack.step > 0.2) {

				animation.wrapMode = WrapMode.Loop;
				animation.Play ("walk");

				} 
		if (goblinAttack.step <= 0.2){
			animation.wrapMode = WrapMode.Loop;
			animation.Play("combat_idle");
			
		}


	
	}

	void OnTriggerStay(Collider other){



			if (other.gameObject.tag == "Player") {
				
				Attack();

			}


		

	}

	void Attack(){
			
			animation.wrapMode = WrapMode.Once;
			animation.Play("attack1");
			
			
		
	}
}
