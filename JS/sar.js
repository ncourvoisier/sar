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
	// EntreeTexte.type="input";
	EntreeTexte.value="";
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
	NombreTable--; // a corriger => décrémenter les autres tables
}

window.onload=function()   {
	var array_drop=document.getElementsByClassName("EmplacementTable");
	for (var i=0; i<array_drop.length;i++){
		dragDrop.initElement(array_drop[i]);
	}
}

function reset() {
	if(confirm("sure ?")) {
		localStorage.clear();
		window.location.reload();
	}
}

function recupContenuTable() {
	console.log("________________READ____________________");
	var contenu = [];
	var incrementeTableau = 0;
	
	for (var t = 1; t <= NombreTable; t++) {
		var IDTable = "table"+t;
		var line = document.getElementById(IDTable).rows;
		for (var i = 0, c = line.length; i < c; i++) { //LES LIGNES
			var col = line[i].cells;
			for (var j = 0, largeur = col.length; j<largeur; j++) { //LES COLONNES
				console.log("j = "+col[j].firstChild.value+" , coord("+t+","+i+","+j+")");
				var val = col[j].firstChild.value;
				var coordVal = {table: t, ligne: i, colonne: j, valeur: val};
				contenu[incrementeTableau] = coordVal;
				incrementeTableau++;
			}
			console.log("\n");
		}
		console.log("end");
	}
	localStorage.setItem('contenuTable', JSON.stringify(contenu));
}

//Variable pour déterminer si les tables sont à reload ou non
var loadOrNot = true;

function save() {
	if (localStorage) {
		recupContenuTable();
		var restoredTable = [];
		localStorage.setItem('table',JSON.stringify(restoredTable));
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
			restoredTable[i] = cTable;
		}
		localStorage.setItem('table', JSON.stringify(restoredTable));
		loadOrNot = false;
		alert("Table saved");
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}
}

function loadContenuTable() {
	var contenu = document.getElementById("table1").rows;
	var res = JSON.parse(localStorage.getItem('contenuTable'));
	console.log("______________LOAD_CONTENU_____________________");
	for (var i = 0, tailleContenu = res.length; i<tailleContenu; i++) {
		// var coordVal = {table: t, ligne: i, colonne: j, valeur: val};
		var t = res[i].table;
		var IDTable = "table"+t;
		var l = res[i].ligne;
		var c = res[i].colonne;
		var val = res[i].valeur;
		console.log("coord("+t+","+l+","+c+") = "+val);
		console.log(IDTable);
		document.getElementById(IDTable).rows[l].cells[c].firstChild.value = val;
	}
	console.log("_________END_LOAD____________");
}

function load() {
	
	if (!loadOrNot) {
		alert("Table already loaded");
		return;
	}
	if (localStorage) {
		var res = JSON.parse(localStorage.getItem('table'));
		if (res === null) {
			alert("Nothing to load !");
			return;
		}
		var tailleRes = res.length;
		var nbTableLoad = tailleRes - 1;
		
		for (var i=1; i<=NombreTable; i++) {
			suppression(i);
		}
		
		for (var i=1; i<tailleRes; i++) {
			//console.log(""+res[i].colonne+","+res[i].ligne+"\n");
			if (res[i] === null) {
				continue;
			}
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
		loadContenuTable();
		loadOrNot = false;
		alert("Table loaded");
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}
}



















