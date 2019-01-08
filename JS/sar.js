var NombreTable=1;
var bloquage=true;
ObjetTable ={
	X:0,
	Y:0,
	nbColonnes:1,
	nbLigne:1,
}
dragDrop = {
	//keyHTML: '<a href="#" class="keyLink">#</a>',
	//keySpeed: 10, // pixels per keypress event
	initialMouseX: undefined,
	initialMouseY: undefined,
	startX: undefined,
	startY: undefined,
	draggedObject: undefined,
	initElement: function (element) {
		if (typeof element == 'string')
			element = document.getElementById(element);
		zone_drag=element.getElementsByClassName("drag");
		zone_drag[0].onmousedown = dragDrop.startDragMouse;
	},
	startDragMouse: function (e) {
		dragDrop.startDrag(this.parentNode);
		var evt = e;
		dragDrop.initialMouseX = evt.clientX;
		dragDrop.initialMouseY = evt.clientY;
		addEventSimple(document,'mousemove',dragDrop.dragMouse);
		addEventSimple(document,'mouseup',dragDrop.releaseElement);
		return false;
	},
	startDrag: function (obj) {
		//console.log(obj);
		if (dragDrop.draggedObject)
			dragDrop.releaseElement();
		dragDrop.startX = obj.offsetLeft;
		dragDrop.startY = obj.offsetTop;
		dragDrop.draggedObject = obj;
		obj.className += ' dragged';
	},
	dragMouse: function (e) {
		var evt = e || window.event;
		var dX = evt.clientX - dragDrop.initialMouseX;
		var dY = evt.clientY - dragDrop.initialMouseY;
		dragDrop.setPosition(dX,dY);
		return false;
	},
	setPosition: function (dx,dy) {
		dragDrop.draggedObject.style.left = dragDrop.startX + dx + 'px';
		dragDrop.draggedObject.style.top = dragDrop.startY + dy + 'px';
	},
	releaseElement: function() {
		removeEventSimple(document,'mousemove',dragDrop.dragMouse);
		removeEventSimple(document,'mouseup',dragDrop.releaseElement);
		removeEventSimple(document,'keypress',dragDrop.dragKeys);
		removeEventSimple(document,'keypress',dragDrop.switchKeyEvents);
		removeEventSimple(document,'keydown',dragDrop.dragKeys);
		dragDrop.draggedObject.className = dragDrop.draggedObject.className.replace(/dragged/,'');
		dragDrop.draggedObject = null;
	}
}

function addEventSimple(obj,evt,fn) {
	if (obj.addEventListener)
		obj.addEventListener(evt,fn,false);
	else if (obj.attachEvent)
		obj.attachEvent('on'+evt,fn);
}

function removeEventSimple(obj,evt,fn) {
	if (obj.removeEventListener)
		obj.removeEventListener(evt,fn,false);
	else if (obj.detachEvent)
		obj.detachEvent('on'+evt,fn);
}
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

function createLine(ID){
	var StringID=ID.toString();
	var IDTable="table"+StringID;
	var output = document.getElementById(IDTable),trs;
	var trNew  = document.createElement('tr');
	var Colonnes=output.getElementsByClassName('col');
	var nbColonnes=Colonnes.length;


	for (var i = 0; i < nbColonnes; i++) {
		var td = document.createElement('td');
		var EntreeTexte  = document.createElement('input');
		EntreeTexte.type="text";
		EntreeTexte.disabled=bloquage;
		EntreeTexte.placeholder="Valeur attribut";
		td.appendChild(EntreeTexte);
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
	//console.log(ID);
	var StringID=ID.toString();
	var IDTable="table"+StringID;
	console.log("StringID"+StringID);
	var output = document.getElementById(IDTable),trs;
	var Colonnes=output.getElementsByClassName('col');
	var nbColonnes=Colonnes.length;
	var ligne=output.getElementsByTagName('tr');
	for(var i=1; i<ligne.length;i++){
		var td = document.createElement('td');
		var EntreeTexte  = document.createElement('input');
		EntreeTexte.placeholder="Valeur attribut";
		EntreeTexte.type="text";
		EntreeTexte.disabled=bloquage;
		td.appendChild(EntreeTexte);
		ligne[i].appendChild(td);
	}
	var trNew  = document.createElement('th');
	trNew.className = "col";
	var EntreeTexte  = document.createElement('input');
	EntreeTexte.type="text";
	EntreeTexte.disabled=bloquage;
	EntreeTexte.placeholder="Nom attribut";
	trNew.appendChild(EntreeTexte);
	if (output) {
	    trs = output.getElementsByTagName('th');
	    if (trs[nbColonnes-1]) { // Le <tr> de Chrome
	        trs[nbColonnes-1].parentNode.insertBefore(trNew, trs[nbColonnes-1].nextSibling);
	    }
	}
}
function createArray() {
	NombreTable++;
	var output = document.getElementById('EmplacementTables');
	var divNew  = document.createElement('div');
	var divDrag  = document.createElement('div');
	divDrag.className = "drag";
	divNew.className = "EmplacementTable";
	output.appendChild(divNew);
	var ajoutLigneNew  = document.createElement('input');
	ajoutLigneNew.type = "button" ;
	ajoutLigneNew.value = "+L" ;
	ajoutLigneNew.setAttribute("onClick","createLine("+NombreTable+")") ;
	//divNew.appendChild(ajoutLigneNew);
	var ajoutColonneNew  = document.createElement('input');
	ajoutColonneNew.type = "button" ;
	ajoutColonneNew.value = "+C" ;
	ajoutColonneNew.setAttribute("onClick","createColumn("+NombreTable+")") ;
	var ajoutButtonSuppr  = document.createElement('input');
	ajoutButtonSuppr.type = "button" ;
	ajoutButtonSuppr.id = "buttonSuppr" ;
	ajoutButtonSuppr.value = "X" ;
	ajoutButtonSuppr.setAttribute("onClick","suppression("+NombreTable+")") ;
	var ajoutNumero  = document.createElement('span');
	ajoutNumero.innerHTML=NombreTable;
	//divNew.appendChild(ajoutColonneNew);

	divDrag.appendChild(ajoutButtonSuppr);
	divDrag.appendChild(ajoutColonneNew);
	divDrag.appendChild(ajoutLigneNew);
	divDrag.appendChild(ajoutNumero);

	var tabNew=document.createElement('table');
	var StringID=NombreTable.toString();
	var IDTable="table"+StringID;
	tabNew.id=IDTable;
	var theadNew=document.createElement('thead');
	var trNew=document.createElement('tr');
	var thNew=document.createElement('th');
	thNew.className="col";
	var EntreeTexte  = document.createElement('input');
	EntreeTexte.type="text";
	EntreeTexte.disabled=bloquage;
	EntreeTexte.placeholder="Nom attribut";
	thNew.appendChild(EntreeTexte);
	//thNew.appendChild(document.createTextNode('Nouvelle colonne'));
	trNew.appendChild(thNew);
	theadNew.appendChild(trNew);
	tabNew.appendChild(theadNew);
	var tbodyNew=document.createElement('tbody');
	var trBodyNew=document.createElement('tr');
	var tdBodyNew=document.createElement('td');
	var EntreeTexte2  = document.createElement('input');
	EntreeTexte2.type="text";
	EntreeTexte2.disabled=bloquage;
	EntreeTexte2.placeholder="Valeur attribut";
	tdBodyNew.appendChild(EntreeTexte2);
	trBodyNew.appendChild(tdBodyNew);
	tbodyNew.appendChild(trBodyNew);
	tabNew.appendChild(tbodyNew);
	divNew.appendChild(divDrag);
	divNew.appendChild(tabNew);
	var IDEmplacement="EmplacementTable"+StringID;
	divNew.id=IDEmplacement;
	DeplacementHauteur=120+NombreTable*100;
	divNew.style.top = DeplacementHauteur+'px';
	dragDrop.initElement(IDEmplacement);
}
function modification(){
	var ensembleTr=document.getElementsByTagName('input');
	bloquage=!bloquage;
	for(var i=0; i<ensembleTr.length;i++){
		if(ensembleTr[i].type=='text')
			ensembleTr[i].disabled=bloquage;
	}
	if(!bloquage){
		document.getElementById('boutonModification').style.background = "#32CD32";
	}
	else{
		document.getElementById('boutonModification').style.background = "#cc0000";
	}
}

function suppression(IDTable){
	var stringID = IDTable.toString();
	var children = document.getElementById("EmplacementTable"+stringID);
	var parent = document.getElementById("EmplacementTables");
	parent.removeChild(children);
	NombreTable--;
}

window.onload=function()   {
	var array_drop=document.getElementsByClassName("EmplacementTable");
	for (var i=0; i<array_drop.length;i++){
		dragDrop.initElement(array_drop[i]);
	}
}


function reset() {
	localStorage.clear();
	window.location.reload();
}

// var restoredTable = [];
// restoredTable.push(JSON.parse(localStorage.getItem('table')));
// localStorage.setItem('table',JSON.stringify(restoredTable));

function save() {
	//if (typeof(Storage) !== "undefined") {
	if (localStorage) {	
		var restoredTable = [];
		//restoredTable.push(JSON.parse(localStorage.getItem('table')));
		localStorage.setItem('table',JSON.stringify(restoredTable));
		
		//var restoredTable = [];
		restoredTable = JSON.parse(localStorage.getItem('table'));
		
		for (var i=1; i<=NombreTable; i++) {
			var IDTable = "table"+i;
			var output = document.getElementById(IDTable),trs;
			if (output === null) {
				continue;
			}
			var Colonnes=output.getElementsByClassName('col');
			var nbColonnes=Colonnes.length;
			var ligne=output.getElementsByTagName('tr');
			var nbLigne = ligne.length;
			
			var cTable = {X: 0, Y:0, colonne: nbColonnes, ligne: nbLigne};
			console.log("\n\n Affichage avec struct "+cTable.colonne+" "+cTable.ligne+"\n");
			restoredTable[i] = cTable;
			console.log("tour save : "+i);
			
		}
		console.log("----------------------------------");
		localStorage.setItem('table', JSON.stringify(restoredTable));
		alert("Table saved");
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}
}

function load() {
	console.log("Cédr");
	//if (typeof(Storage) !== "undefined") {
	//setTimeout( function(){ window.location.reload()}, 180000)
	if (localStorage) {	
		console.log(NombreTable+"\n");
		//NombreTable=0;
		var res = JSON.parse(localStorage.getItem('table'));
		if (res === null) {
			alert("Nothing to load !");
			return;
		}
		console.log("taille tab recu : "+res.length+"\n");
		var tailleRes = res.length;
		var nbTableLoad = tailleRes - 1;
		
		console.log("Nombre table actuelle"+NombreTable);
		
		for (var i=1; i<=NombreTable; i++) {
			suppression(i);
		}
		
		for (var i=1; i<tailleRes; i++) {
			//console.log("tour load : "+i);
			console.log(""+res[i].colonne+","+res[i].ligne+"\n");
			if(res[i].colonne === null || res[i].ligne === null) {
				continue;
			}
			createArray();
			var nvCol = res[i].colonne;
			for (var j=1; j <nvCol; ++j) {
				createColumn(i); //i = IDTable
			}
			var nvLine = res[i].ligne-1;
			for (var j=1; j <nvLine; ++j) {
				createLine(i);	//i = IDTable
			}
		}
		console.log("\nNombreTable : "+NombreTable+"\n");
		console.log("----------------------------------");
		alert("Table loaded");
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}

}



















