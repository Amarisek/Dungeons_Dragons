/*Health Script*/
 

var healthBG : Texture2D; //health background
var characterUI : Texture2D; //character ui
var healthFG : Texture2D; //health foreground
var healthFGMaxWidth : float;//the starting width of the foreground bar

var enemyHealthBG : Texture2D;
var enemyHealthFG : Texture2D;
var enemyHealthFGMaxWidth : float;

var currentHealth:float; //the current health status
var enemyHealth : float;
var scale : float = 0.25;
var scaleX : float;
var scaleY : float;
var baseScreenX : float = 1024;
var baseScreenY : float = 768;
var enemyDetect : boolean;

function Start()

{
    healthFGMaxWidth = healthFG.width;
    enemyHealthFGMaxWidth = enemyHealthFG.width;
    
  
    
    scaleX = Screen.width / baseScreenX * scale;
    scaleY = Screen.height / baseScreenY * scale;

    
}
 //health update
function Update () 
{
 	currentHealth = gameObject.GetComponent("DamageCalculations").health;
 	enemyHealth = gameObject.GetComponent("DamageCalculations").damageCalculations.health;
}

//creating the healthbars
function OnGUI()
{
    //this is the width that the foreground bar should be
    var newBarWidth:float = (currentHealth/1000) * healthFGMaxWidth;
    var enemyBarWidth:float = (enemyHealth/1000) * enemyHealthFGMaxWidth;
   
 
    
    Debug.Log("health left " + currentHealth);
 
    //a spacing variable to help us position the health
    var gap:int = 20;
    
    GUI.BeginGroup(new Rect (gap,gap, healthBG.width*scaleX, healthBG.height*scaleY));
		GUI.DrawTexture(Rect (0,0, healthBG.width*scaleX, healthBG.height*scaleY), healthBG);
       
	       	GUI.BeginGroup(new Rect(healthBG.width*scaleX/4,healthBG.height*scaleY/4, newBarWidth*scaleX, healthFG.height*scaleY));
	         	GUI.DrawTexture(Rect(0,0, healthFG.width*scaleX*0.75, healthFG.height*scaleY), healthFG);
	        		
	        		
		       		
		       	GUI.EndGroup();
		       	GUI.BeginGroup(new Rect (0,0, healthBG.width*scaleX, healthBG.height*scaleY));
					GUI.DrawTexture(Rect (0,0, healthBG.width*scaleX, healthBG.height*scaleY), characterUI);
					GUI.EndGroup();
		 	 
		GUI.EndGroup();
	
	if(enemyDetect == true){	
		GUI.BeginGroup(new Rect (Screen.width/2.8, gap, enemyHealthBG.width*scaleX, enemyHealthBG.height*scaleY));
		GUI.DrawTexture(Rect (0,0, enemyHealthBG.width*scaleX, enemyHealthBG.height*scaleY), enemyHealthBG);
				
				GUI.BeginGroup(new Rect(0,0, enemyBarWidth*scaleX, enemyHealthFG.height*scaleY));
	         	GUI.DrawTexture(Rect(0,0, enemyHealthFG.width*scaleX, enemyHealthFG.height*scaleY), enemyHealthFG);
	        		
	        	GUI.EndGroup();
	        	
		GUI.EndGroup();
		}
		if( GetComponent("DamageCalculations").damageCalculations == null){
			enemyDetect = false;
		}
	
}

function OnTriggerEnter(other : Collider){
	if(other.gameObject.tag == "enemy"){
		enemyDetect = true;
	}
}

function OnTriggerExit(){
	enemyDetect = false;
}

