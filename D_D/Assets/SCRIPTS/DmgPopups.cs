using UnityEngine;
using System.Collections;

public class DmgPopups : MonoBehaviour {


	Color color;



	void Start (){
		color = GetComponent<MeshRenderer> ().material.color;
		Destroy (gameObject, 0.5f);


	}

	
	void Update(){
		transform.LookAt (Camera.main.transform);
		var pos = transform.position;
		pos.y +=0.05f;
		this.transform.position = pos;
		color.a -= Time.deltaTime;
		GetComponent<MeshRenderer> ().material.color = color;


	}



}

