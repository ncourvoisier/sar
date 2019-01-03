var NombreTable=1;
var dragged = null; //L'élément en cours de drag
//Lorsque dragged = null, il n'y a rien en cours de déplacement

document.querySelector('#EmplacementTables').addEventListener('dragover', function(e) {
    e.preventDefault(); // Annule l'interdiction de drop
});


function recupValeur(){
	if(document.forms["Requete"].elements["Table1"].value==0 || document.forms["Requete"].elements["Table2"].value==0 || document.forms["Requete"].elements["operateur"].value==0){
		console.log("Erreur syntaxe");
	}
	else{
		val1=document.forms["Requete"].elements["Table1"].value;
		console.log("Valeur premiere table ="+val1);

		op=document.forms["Requete"].elements["operateur"].value;
		console.log("Valeur operateur ="+op);

		val2=document.forms["Requete"].elements["Table2"].value;
		console.log("Valeur deuxieme table ="+val2);
	}
	document.forms["Requete"].elements["Table1"].value=0;
	document.forms["Requete"].elements["operateur"].value=0;
	document.forms["Requete"].elements["Table2"].value=0;
}

function recupTable(){
	console.log("Je passe ici");
}

function placeDiv(x_pos, y_pos,ID) {
  //var d = document.getElementById(ID);
  //d.style.position = "absolute";
  //d.style.left = x_pos+'px';
  //d.style.top = y_pos+'px';
 addEvent(ID,'mousemove',drag_onmousemove);
 //addEvent(ID,'mouseup',drag_onmouseup);
}




function start_drag(objet,event)
{
  dragged = objet; //On le place comme objet en cours
  //des lignes à rajouter dans start_drag:
	event.returnValue = false; //Pour Internet Explorer
	if( event.preventDefault ) event.preventDefault();
}

function drag_onmousemove(event)  //Lorsque la souris se déplace
{
  if( dragged ) //s'il n'y a pas d'élément en cours de déplacement, inutile de le déplacer :) 
  {
    var x = event.clientX;
    var y = event.clientY;
    dragged.style.position = 'absolute';
    dragged.style.left = x + 'px';
    dragged.style.top = y + 'px';
  }
}

function drag_onmouseup(event)  //Lorsque le bouton de la souris est relâché
{
  dragged = null; //On arrête le drag & drop
}

//Ma petite fonction "magique" pour ajouter des évènements
function addEvent(obj,event,fct)
{
  if( obj.attachEvent)
     obj.attachEvent('on' + event,fct);
  else
     obj.addEventListener(event,fct,true);
}



function createLine(ID){
	var StringID=ID.toString();
	var IDTable="table"+StringID;
	console.log(IDTable);
	var output = document.getElementById(IDTable),trs;
	console.log(output);
	var trNew  = document.createElement('tr');

	var Colonnes=output.getElementsByClassName('col');
	var nbColonnes=Colonnes.length;


	for (var i = 0; i < nbColonnes; i++) {
		var td = document.createElement('td');
		td.appendChild(document.createTextNode('Défaut'));
		trNew.appendChild(td);	
    }
	if (output) {
	    trs = output.getElementsByTagName('tr');

	    if (trs[1]) { // Le <tr> de Chrome
	        trs[1].parentNode.insertBefore(trNew, trs[1]);
	    }
	}
}
function createColumn(ID){
	var StringID=ID.toString();
	var IDTable="table"+StringID;
	var output = document.getElementById(IDTable),trs;
	console.log(output);
	var Colonnes=output.getElementsByClassName('col');
	console.log(Colonnes);
	var nbColonnes=Colonnes.length;
	console.log(nbColonnes);
	var ligne=output.getElementsByTagName('tr');
	console.log("Ligne");
	console.log(ligne);
	for(var i=1; i<ligne.length;i++){
		var td = document.createElement('td');
		td.appendChild(document.createTextNode('Défaut'));
		ligne[i].appendChild(td);
	}
	var trNew  = document.createElement('th');
	trNew.className = "col";
	trNew.appendChild(document.createTextNode('Nouvelle colonne'));
	if (output) {
	    trs = output.getElementsByTagName('th');
	    console.log(trs);
	    if (trs[nbColonnes-1]) { // Le <tr> de Chrome
	        trs[nbColonnes-1].parentNode.insertBefore(trNew, trs[nbColonnes-1].nextSibling);
	    }
	}
}
function createArray() {
	NombreTable++;
	console.log(NombreTable);
	var output = document.getElementById('EmplacementTables');
	console.log(output);
	var divNew  = document.createElement('div');
	divNew.className = "EmplacementTable";
	output.appendChild(divNew);
	var ajoutLigneNew  = document.createElement('input');
	ajoutLigneNew.type = "button" ;
	ajoutLigneNew.value = "+L" ;
	ajoutLigneNew.setAttribute("onClick","createLine("+NombreTable+")") ;
	divNew.appendChild(ajoutLigneNew);
	var ajoutColonneNew  = document.createElement('input');
	ajoutColonneNew.type = "button" ;
	ajoutColonneNew.value = "+C" ;
	ajoutColonneNew.setAttribute("onClick","createColumn("+NombreTable+")") ;
	divNew.appendChild(ajoutColonneNew);
	var tabNew=document.createElement('table');
	var StringID=NombreTable.toString();
	var IDTable="table"+StringID;
	tabNew.id=IDTable;
	var theadNew=document.createElement('thead');
	var trNew=document.createElement('tr');
	var thNew=document.createElement('th');
	thNew.className="col";
	thNew.appendChild(document.createTextNode('Nouvelle colonne'));
	trNew.appendChild(thNew);
	theadNew.appendChild(trNew);
	tabNew.appendChild(theadNew);
	var tbodyNew=document.createElement('tbody');
	var trBodyNew=document.createElement('tr');
	var tdBodyNew=document.createElement('td');
	tdBodyNew.appendChild(document.createTextNode('Défaut'));
	trBodyNew.appendChild(tdBodyNew);
	tbodyNew.appendChild(trBodyNew);
	tabNew.appendChild(tbodyNew);
	divNew.appendChild(tabNew);
	DeplacementHauteur=100+NombreTable*200;
	divNew.style.top = DeplacementHauteur+'px';
}