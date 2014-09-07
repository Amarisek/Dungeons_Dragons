using UnityEngine;
using System.Collections;

public class DamageCalculations : MonoBehaviour {
	public int str;
	public int def;
	public int mag;
	public int agi;
	public int health;
	public int attack;
	public int mattack;
	public int damage;
	public int initialDamage;
	public bool magestats;
	public DamageCalculations damageCalculations;
	public GameObject popUp;
	public GameObject spawn;
	float spawnPosX;
	float spawnposZ;
	float spawnpozY;



	void Start () {


		health = 1000;
		attack = Mathf.RoundToInt ((2 * str) + (agi * 3));
		mattack = Mathf.RoundToInt((2 * agi) + (mag * 3));

	}

	void Update (){

		spawnPosX = spawn.transform.position.x;
		spawnposZ = spawn.transform.position.z;
		spawnpozY = spawn.transform.position.y;


		if (this.gameObject.tag == "Player") {
			PlayerAttack();

		}

		if (this.gameObject.tag == "enemy") {
			EnemyAttack();

		}


	}

	void OnTriggerEnter(Collider other){
		if (this.gameObject.tag == "Player") {
			//set to detect damageCalculations
			if (other.gameObject.tag == "enemy") {
				damageCalculations = other.gameObject.GetComponent<DamageCalculations> ();

			}

			//set to the spawn
			if (other.gameObject.tag == "Respawn") {
				spawn = other.gameObject;
			}
		}
		if (this.gameObject.tag == "enemy") {
			//set to detect damageCalculations
			if (other.gameObject.tag == "Player") {
				damageCalculations = other.gameObject.GetComponent<DamageCalculations> ();
				
			}
			
			//set to the spawn
			if (other.gameObject.tag == "Respawn") {
				spawn = other.gameObject;
			}

		}
	}

	void PlayerAttack (){
		if (Input.GetMouseButtonDown (0)) {
			if (magestats == true) {
				initialDamage = Mathf.RoundToInt (mattack - damageCalculations.def);
			} else {
				initialDamage = Mathf.RoundToInt (attack - damageCalculations.def);
			}
			damage = Mathf.RoundToInt (Random.Range (initialDamage - 3, initialDamage + 3));
			if (damage < 0) {
				damage = 0;
			}
			if (damage > 0) {
				GameObject dmgpopup;
				
				Vector3 pos = new Vector3 (Random.Range (spawnPosX - 1f, 1f + spawnPosX), Random.Range (spawnpozY - 1f, 1f + spawnpozY), Random.Range (spawnposZ - 1f, 1f + spawnposZ));
				dmgpopup = Instantiate (popUp, pos, Quaternion.identity) as GameObject;
				popUp.GetComponent<TextMesh> ().text = damage.ToString ();
				
				
			}
			health = health - damageCalculations.damage;
			damageCalculations.health = damageCalculations.health - damage;
			
			if (damage > (initialDamage + 2)) {
				popUp.GetComponent<TextMesh>().color = Color.yellow;
			}
			else if (damage < (initialDamage - 2)) {
				popUp.GetComponent<TextMesh> ().color = Color.gray;
			} 
			else {
				popUp.GetComponent<TextMesh>().color = Color.red;
			}
			
		}
		if (damageCalculations.health <= 0) {
			Destroy (damageCalculations.gameObject);
			damageCalculations = null;
			spawn = null;
		}

	}

	void EnemyAttack(){
		if (this.gameObject.GetComponent<EnemyAnimation>().attackTime < Time.time) {
			gameObject.GetComponent<EnemyAnimation>().attackTime = gameObject.GetComponent<EnemyAnimation>().attackInterval + Time.time;
			
			if (magestats == true) {
				initialDamage = Mathf.RoundToInt (mattack - damageCalculations.def);
			} else {
				initialDamage = Mathf.RoundToInt (attack - damageCalculations.def);
			}
			damage = Mathf.RoundToInt (Random.Range (initialDamage - 3, initialDamage + 3));
			if (damage < 0) {
				damage = 0;
			}
			if (damage > 0) {
				
				GameObject enemydmgpopup;
				
				Vector3 pos = new Vector3 (Random.Range (spawnPosX - 1f, 1f + spawnPosX), Random.Range (spawnpozY - 1f, 1f + spawnpozY), Random.Range (spawnposZ - 1f, 1f + spawnposZ));
				enemydmgpopup = Instantiate (popUp, pos, Quaternion.identity) as GameObject;
				popUp.GetComponent<TextMesh> ().text = damage.ToString ();
				
			}
			health = health - damageCalculations.damage;
			damageCalculations.health = damageCalculations.health - damage;
			
			if (damage > (initialDamage + 1)) {
				popUp.GetComponent<TextMesh>().color = Color.yellow;
			}
			else if (damage < (initialDamage - 2)) {
				popUp.GetComponent<TextMesh> ().color = Color.gray;
			} 
			else {
				popUp.GetComponent<TextMesh>().color = Color.red;
			}
			return;
			
		}
		if (damageCalculations.health <= 0) {
			Destroy (damageCalculations.gameObject);
			damageCalculations = null;
			spawn = null;
			
		}
	}

	void OnTriggerExit(){
		damageCalculations = null;
		spawn = null;
	}

}
	

