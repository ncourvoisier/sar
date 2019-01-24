var NombreTable=1;
var bloquage=true;

//----------------------Objet Table-----------------------
class Table{
	constructor(){
		this.Entete={E0:""};
		this.X=0;
		this.Y=0;
		this.reduit=false;
		this.Libelle="";
		this.Contenu={E0:[""]};
		this.ColonneId=1;
	}
	attribuerNom(Nom) {
		this.Libelle=Nom;
	}
	reduire(){
		this.reduit=!this.reduit;
	}
	ajoutLigne(){
		for(var colonne in this.Contenu){
			this.Contenu[colonne].push("");
		}
	}
	ajoutColonne(){
		var NomNouvelleEntree="E"+this.getColonneID();
		this.Entete[NomNouvelleEntree]="";
		for(var i=0;i<this.getNombreLigne();i++){
			if(i==0){
				this.Contenu[NomNouvelleEntree]=[""];
			}
			else{
				this.Contenu[NomNouvelleEntree].push("");
			}
		}
		this.ColonneId++;
	}
	ajoutContenu(Entete,Position,Contenu){
		var compteurEntete=0;
		if(Position==0){
			for(var NomEntete in this.Entete){
				if(compteurEntete == Entete){
					this.Entete[NomEntete]=Contenu;
				}
				compteurEntete++;
			}
		}
		else{
			for(var NomEntete in this.Entete){
				if(compteurEntete == Entete){
					this.Contenu[NomEntete][Position]=Contenu;
				}
				compteurEntete++;
			}
		}
	}
	getColonneID(){
		return this.ColonneId;
	}
	getNombreLigne(){
		//Une seule itération dans le for.
		for(var premiereColonne in this.Contenu){
			return this.Contenu[premiereColonne].length;
		}
	}
	getNombreColonne(){
		return Object.keys(this.Entete).length;
	}
}

//----------------------------Ensemble Tables----------------------------
var Tables={
	id:1,
	EnsembleTable:{table1:new Table()},
	AjoutTable: function(TABLE){
		Tables.id++;
		var NomTable="table"+Tables.id;
		Tables["EnsembleTable"][NomTable]=TABLE;
	},
	suppressionTable: function(ID){
		delete Tables["EnsembleTable"][ID];
	}
};
//------------------------------------------------------

dragDrop = {

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
function createIntersection(TABLE1,TABLE2){
	if(TABLE1.constructor.name!="Table" || TABLE2.constructor.name!="Table"){
		return false;
	}
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
	var select1 = document.getElementById("select1");
	var select2 = document.getElementById("select2");
	select1.innerHTML="";
	select2.innerHTML="";
	for(var table in Tables["EnsembleTable"]){
		select1.innerHTML+="<option value="+table+">"+table+"</option>";
		select2.innerHTML+="<option value="+table+">"+table+"</option>";
	}
}

function createLine(ID){
	var StringID=ID.toString();
	var IDTable="table"+StringID;
	Tables["EnsembleTable"][IDTable].ajoutLigne();
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
	var StringID=ID.toString();
	var IDTable="table"+StringID;
	Tables["EnsembleTable"][IDTable].ajoutColonne();
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
	Tables.AjoutTable(new Table());
	NombreTable++;
	var output = document.getElementById('EmplacementTables');
	var divNew  = document.createElement('div');
	var divDrag  = document.createElement('div');
	var divEntete = document.createElement('div');
	divEntete.setAttribute('class',"entete");
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
	ajoutButtonSuppr.setAttribute("class","btnSuppr") ;
	ajoutButtonSuppr.value = "X" ;
	ajoutButtonSuppr.setAttribute("onClick","suppression("+NombreTable+")") ;
	var ajoutButtonReduc  = document.createElement('input');
	ajoutButtonReduc.type = "button" ;
	ajoutButtonReduc.setAttribute("class","btnReduc") ;
	ajoutButtonReduc.value = "-" ;
	ajoutButtonReduc.setAttribute("onClick","reduction("+NombreTable+")") ;
	var ajoutNumero  = document.createElement('span');
	ajoutNumero.innerHTML=NombreTable;
	//divNew.appendChild(ajoutColonneNew);

	divEntete.appendChild(ajoutColonneNew);
	divEntete.appendChild(ajoutLigneNew);
	divEntete.appendChild(ajoutNumero);
	divEntete.appendChild(ajoutButtonReduc);
	divEntete.appendChild(ajoutButtonSuppr);
	divDrag.appendChild(divEntete);
	var divRelation = document.createElement('div');
	divRelation.setAttribute('class',"relation");
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
	divRelation.appendChild(tabNew);
	divNew.appendChild(divDrag);
	divNew.appendChild(divRelation);
	var IDEmplacement="EmplacementTable"+StringID;
	divNew.id=IDEmplacement;
	DeplacementHauteur=120+NombreTable*100;
	divNew.style.top = DeplacementHauteur+'px';
	dragDrop.initElement(IDEmplacement);
	recupTable();
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
		recuperationContenu();
	}
	else{
		document.getElementById('boutonModification').style.background = "#cc0000";
	}
}
function recuperationContenu(){
	//Recuperer Contenu tables et remplir le tableau de Table.
}
function suppression(IDTable){
	if(suppression.caller.name === "load" || confirm("Supprimer la table "+IDTable+" ?")) {
		var stringID = IDTable.toString();
		var children = document.getElementById("EmplacementTable"+stringID);
		var parent = document.getElementById("EmplacementTables");
		parent.removeChild(children);
		var ID="table"+IDTable;
		Tables.suppressionTable(ID);
		recupTable();
	}
}

function reduction(IDTable){
	var ID="table"+IDTable;
	Tables["EnsembleTable"][ID].reduire();
	var table = document.getElementById("EmplacementTable"+IDTable);
	var divRelation = table.getElementsByClassName('relation');
	divRelation[0].style.visibility='hidden';
	var divDrag = table.getElementsByClassName('drag');
	var divEntete = divDrag[0].getElementsByClassName('entete');
	var btnReduc = divEntete[0].getElementsByClassName('btnReduc');
	btnReduc[0].setAttribute('onclick',"agrandissement("+IDTable+")");
}

function agrandissement(IDTable){
	var ID="table"+IDTable;
	Tables["EnsembleTable"][ID].reduire();
	var table = document.getElementById("EmplacementTable"+IDTable);
	var divRelation = table.getElementsByClassName('relation');
	divRelation[0].style.visibility='visible';
	var divDrag = table.getElementsByClassName('drag');
	var divEntete = divDrag[0].getElementsByClassName('entete');
	var btnReduc = divEntete[0].getElementsByClassName('btnReduc');
	btnReduc[0].setAttribute('onclick',"reduction("+IDTable+")");
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
	
function save() {
	if (localStorage) {
		var restoredTable = [];
		localStorage.setItem('table',JSON.stringify(restoredTable));
		restoredTable = JSON.parse(localStorage.getItem('table'));
		for (var i=1; i<=NombreTable; i++) {
			var IDTable = "table"+i;
			var output = document.getElementById(IDTable),trs;
			if (output === null) {
				continue;
			}
			
			//RECUP L'ENTETE
			var Colonnes=output.getElementsByClassName('col');
			var nbColonnes=Colonnes.length;
			var entete = [];
			for(var nbCol = 0; nbCol < nbColonnes; nbCol++) {
				entete[nbCol] = document.getElementById(IDTable).rows[0].cells[nbCol].firstChild.value;
			}
			
			//RECUP CONTENU DANS LES AUTRES LIGNES
			var ligne=output.getElementsByTagName('tr');
			var nbLigneTotal = ligne.length;
			var contenu = [];
			for(var nbLine = 0; nbLine < nbLigneTotal; nbLine++) {
				var ligneParLigne = [];
				for(var nbCol = 0; nbCol < nbColonnes; nbCol++) {
					var tmp = document.getElementById(IDTable).rows[nbLine].cells[nbCol].firstChild.value;
					var nameColone = entete[nbCol];
					ligneParLigne.push(tmp);
				}
				contenu.push(ligneParLigne);
			}
			var cTable = {Entete: entete, Contenu: contenu, X: 0, Y: 0, reduit: false};
			restoredTable[i] = cTable;
		}
		localStorage.setItem('table', JSON.stringify(restoredTable));
		alert("Table saved");
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}
}	
	
	
function load() {
	if (localStorage) {
		
		var restoredTable = JSON.parse(localStorage.getItem('table'));
		if (restoredTable === null) {
			alert("Nothing to load !");
			return;
		}
		
		var NombreTableASupprimer = NombreTable;
		for (var suppr=1; suppr<=NombreTableASupprimer; suppr++) {
			var IDTable = "table"+suppr;
			if (document.getElementById(IDTable) === null) {
				continue;
			}
			suppression(suppr);
		}
		NombreTable = 0;
		
		var tailleRestoredTable = restoredTable.length;
		var nbTableALoad = tailleRestoredTable - 1;
		
		for (var tableNum=1; tableNum<tailleRestoredTable; tableNum++) {
			if(restoredTable[tableNum] === null || restoredTable[tableNum].colonne === null || restoredTable[tableNum].ligne === null) {
				NombreTable++;
				continue;
			}
			IDTable = "table"+tableNum;
			createArray();
			var nbColonnes = restoredTable[tableNum].Entete.length;
			var nbLigne = restoredTable[tableNum].Contenu.length;
			
			for (var nc = 0; nc < nbColonnes -1; nc++) {
				createColumn(tableNum);
			}
			for (var nl = 0; nl < nbLigne -2; nl++) {
				createLine(tableNum);
			}
			for (var nl = 0; nl < nbLigne; nl++) {
				for (var nc = 0; nc < nbColonnes; nc++) {
					if (nl === 0) {
						var valeur = restoredTable[tableNum].Entete[nc];
						document.getElementById(IDTable).rows[nl].cells[nc].firstChild.value = valeur;
						continue;
					}
					var valeur = restoredTable[tableNum].Contenu[nl][nc];
					document.getElementById(IDTable).rows[nl].cells[nc].firstChild.value = valeur;
				}
			}
		}
		alert("Table loaded");
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}
	
}

	

	
	




















