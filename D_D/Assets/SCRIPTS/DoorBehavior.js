

function OnTriggerEnter ( other : Collider )
{

	if (other.gameObject.tag == "Player")
	{
		
		animation.Play("gate open");
		
	}

}


function OnTriggerExit(other : Collider)
{
	if (other.gameObject.tag == "Player")
	{
		animation.Play("gate close");
		
	}
}