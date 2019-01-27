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
		this.Contenu={E0:[]};
		this.ColonneId=1;
		this.bloque = true;
	}
	attribuerNom(Nom) {
		this.Libelle=Nom;
	}
	reduire(){
		this.reduit=!this.reduit;
	}
	debloquer(){
		this.bloque=false;
	}
	bloquer(){
		this.bloque=true;
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
	ajoutContenu(Entete,Position,Contenu,boolEntete){
		var compteurEntete=0;
		if(boolEntete){
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
	getBloquer(){
		return this.bloque;
	}
	setX(x) {
		this.X=x;
	}
	setY(y) {
		this.Y=y;
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
		TABLE.attribuerNom(NomTable);
	},
	suppressionTable: function(ID){
		delete Tables["EnsembleTable"][ID];
	}
};
Tables["EnsembleTable"]["table1"].attribuerNom("table1");
//------------------------------------------------------

dragDrop = {

	initialMouseX: undefined,
	initialMouseY: undefined,
	startX: undefined,
	startY: undefined,
	draggedObject: undefined,
	
	tablee: undefined,
	
	initElement: function (element) {
		if (typeof element == 'string')
			element = document.getElementById(element);
		zone_drag=element.getElementsByClassName("drag");
		zone_drag[0].onmousedown = dragDrop.startDragMouse;
		
		tablee = element.children[1].firstElementChild.id;
		//console.log(tablee);
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
		Tables["EnsembleTable"][tablee].setX(dx);
		Tables["EnsembleTable"][tablee].setY(dy);
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
		console.log("Erreur Intersection");
		return false;
	}
	if(TABLE1.getNombreColonne()!=TABLE2.getNombreColonne()){
		console.log("Erreur Intersection");
		return false;
	}
	for(var colonne in TABLE1.Entete){
		if(TABLE1.Entete[colonne]!=TABLE2.Entete[colonne]){
			console.log("Erreur Intersection: Le nom des attributs des 2 tables doivent être identique");
			return false;
		}
	}
	createArray(NombreTable);
	var ID = "table"+NombreTable;
	Tables["EnsembleTable"][ID].attribuerNom("Intersection: "+TABLE1.Libelle+" ET "+TABLE2.Libelle);
	for(var i=0;i<TABLE1.getNombreLigne();i++){
		var ligneCourante=recupereLigne(TABLE1,i);
		console.log("i="+ligneCourante);
		for(var j=0;j<TABLE2.getNombreLigne();j++){
			console.log("j="+recupereLigne(TABLE2,j));
			if(JSON.stringify(ligneCourante)==JSON.stringify(recupereLigne(TABLE2,j))){
				console.log("VRAI\n");
				break;
			}
		}
	}
	return true; 
}
function recupereLigne(TABLE,NumeroLigne){
	var res=[];
	for(var i in TABLE.Contenu){
		res.push(TABLE.Contenu[i][NumeroLigne]);
	}
	return res;
}
function AjoutModeleEntete(){

}
function AjoutModeleLigne(){
	
}
function createRelation(){
	var select1 = document.getElementById("select1");
	var select2 = document.getElementById("select2");
	var operateur = document.getElementById("operateur");
	if(operateur.value=="1"){
		createIntersection(Tables.EnsembleTable[select1.value],Tables.EnsembleTable[select2.value]);
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
		EntreeTexte.disabled=Tables["EnsembleTable"][IDTable].getBloquer();
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
	
	for(var i=1; i<ligne.length-1;i++){
		var td = document.createElement('td');
		var EntreeTexte  = document.createElement('input');
		EntreeTexte.placeholder="Valeur attribut";
		EntreeTexte.type="text";
		EntreeTexte.disabled=Tables["EnsembleTable"][IDTable].getBloquer();
		td.appendChild(EntreeTexte);
		ligne[i].appendChild(td);
	}
	var trNew  = document.createElement('th');
	trNew.className = "col";
	var EntreeTexte  = document.createElement('input');
	EntreeTexte.type="text";
	EntreeTexte.disabled=Tables["EnsembleTable"][IDTable].getBloquer();
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
	var ajoutButtonModif = document.createElement('a');
	ajoutButtonModif.href = "#";
	ajoutButtonModif.setAttribute('class',"boutonLock");
	ajoutButtonModif.setAttribute('onclick',"modification("+NombreTable+")");
	var ajoutNumero  = document.createElement('span');
	ajoutNumero.innerHTML=NombreTable;
	//divNew.appendChild(ajoutColonneNew);

	divDrag.appendChild(ajoutColonneNew);
	divDrag.appendChild(ajoutLigneNew);
	divDrag.appendChild(ajoutNumero);
	divDrag.appendChild(ajoutButtonReduc);
	divDrag.appendChild(ajoutButtonSuppr);
	divDrag.appendChild(ajoutButtonModif);
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
	/*
	var tdBodyNew=document.createElement('td');
	var EntreeTexte2  = document.createElement('input');
	EntreeTexte2.type="text";
	EntreeTexte2.disabled=bloquage;
	EntreeTexte2.placeholder="Valeur attribut";
	tdBodyNew.appendChild(EntreeTexte2);
	trBodyNew.appendChild(tdBodyNew);
	*/
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

function modification(IDTable){
	var stringID = IDTable.toString();
	var ID = "table"+IDTable;
	Tables["EnsembleTable"][ID].debloquer();
	var bloque =  Tables["EnsembleTable"][ID].getBloquer();
	var table = document.getElementById(ID);
	var th = table.getElementsByTagName('input');
	for(var i in th){
		if(th[i].type==="text")
			th[i].disabled = bloque;
	}
	var relation = document.getElementById("EmplacementTable"+stringID);
	var bouton = relation.getElementsByClassName('boutonLock')[0];
	bouton.setAttribute('class','boutonUnlock')
	bouton.setAttribute('onclick',"sauvegarderModif("+IDTable+")");
}

function sauvegarderModif(IDTable){
	var stringID = IDTable.toString();
	var ID = "table"+IDTable;
	Tables["EnsembleTable"][ID].bloquer();
	var bloque =  Tables["EnsembleTable"][ID].getBloquer();
	var table = document.getElementById(ID);
	var th = table.getElementsByTagName('input');
	for(var i in th){
		if(th[i].type==="text") {
			th[i].disabled = bloque;
		}
	}
	recuperationContenu(IDTable);
	var relation = document.getElementById("EmplacementTable"+stringID);
	var bouton = relation.getElementsByClassName('boutonUnlock')[0];
	bouton.setAttribute('class','boutonLock')
	bouton.setAttribute('onclick',"modification("+IDTable+")");
}
function recuperationContenu(IDTable){
	var ID = "table"+IDTable;
	Tables["EnsembleTable"][ID].bloquer();
	var table = document.getElementById(ID);
	var th = table.getElementsByTagName('input');
	var tr = table.getElementsByClassName('col');
	var nbColonne = tr.length;
	var pos = 0;
	var boolEntete = true;
	for(var i in th){
		if(th[i].type==="text") {
			Tables["EnsembleTable"][ID].ajoutContenu(i%nbColonne,pos,th[i].value,boolEntete);
			if(i%nbColonne == nbColonne-1){
				if(!boolEntete){
					pos++;
				}
				boolEntete = false;
			}
		}
	}
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
	var btnReduc = divDrag[0].getElementsByClassName('btnReduc');
	btnReduc[0].setAttribute('onclick',"agrandissement("+IDTable+")");
}

function agrandissement(IDTable){
	var ID="table"+IDTable;
	Tables["EnsembleTable"][ID].reduire();
	var table = document.getElementById("EmplacementTable"+IDTable);
	var divRelation = table.getElementsByClassName('relation');
	divRelation[0].style.visibility='visible';
	var divDrag = table.getElementsByClassName('drag');
	var btnReduc = divDrag[0].getElementsByClassName('btnReduc');
	btnReduc[0].setAttribute('onclick',"reduction("+IDTable+")");
}

window.onload=function()   {
	var array_drop=document.getElementsByClassName("EmplacementTable");
	for (var i=0; i<array_drop.length;i++){
		dragDrop.initElement(array_drop[i]);
	}
}

function supprimerUnModele(modele) {
	console.log(modele.value);
	var nomTableASupprimer = modele.value;
	if(confirm("Vous êtes sure de vouloir supprimer le modèle "+nomTableASupprimer+" ?")) {
		localStorage.removeItem(nomTableASupprimer);
		window.location.reload();
	}
}
	
function save() {
	if (localStorage) {
		var nomTable = "";
		var msgErreur = "";
		var dejaSave = false;
		var nbModeleDansLocalStorage = localStorage.length;
		do {
			if (dejaSave) {
				nomTable = prompt(msgErreur);
			} else {
				nomTable = prompt("Saisir le nom de votre modèle :","Modele"+nbModeleDansLocalStorage);
			}
			if (nomTable === null) {
				return;
			}
			dejaSave = false;
			for(var noms in localStorage){
				if (nomTable === noms.toString()) {
					msgErreur = "Ce nom de table est déjà sauvegardé, saisir un nom différent : ";
					dejaSave = true;
					break;
				}
			}
			if (nomTable === "") {
				msgErreur = "Le nom du modèle ne peut pas être vide.";
				dejaSave= true;
			}
			var regexp = /^[0-9]/;
			if (nomTable.match(regexp)) {
				msgErreur = "Le nom du modèle ne peut pas commencé par un chiffre.";
				dejaSave = true;
			}
			var regex2Blanc = /\s/;
			if (nomTable.match(regex2Blanc)) {
				msgErreur = "Le nom du modèle ne peut pas être composé d'espaces ou saut de ligne.";
				dejaSave = true;
			}
		}while(dejaSave === true);
		localStorage.setItem(nomTable, JSON.stringify(Tables));
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}
}	
	

function affichageModele() {
	var listeModele = [];
	for(var noms in localStorage){
		if (noms === "key" || noms === "getItem" || noms === "setItem" || noms === "removeItem" || noms === "clear" || noms === "length") {
			continue;
		}
		listeModele.push(noms);
	}
	
	var modele = document.getElementById("modele");
	var tmp = "";
	for (var i = 0, lgtListeModele = listeModele.length; i < lgtListeModele; i++) {
		tmp += "<input type=\"button\" id="+listeModele[i]+" value="+listeModele[i]+" onclick=\"load("+listeModele[i].toString()+")\">";
		tmp += "<input type=\"button\" id=\"btn"+listeModele[i]+"\" value=\"X\" onclick=\"supprimerUnModele("+listeModele[i].toString()+")\"><br>";
		//console.log(listeModele[i]);
	}
	modele.innerHTML = tmp;
}


function clearLocalstorage() {
	if(confirm("Supprimer tous vos modèles ?")) {
		localStorage.clear();
		window.location.reload();
	}
}
	
function load(modele) {
	if (localStorage) {
		var nomTableACharger = modele.value;
		var RestoredTables = JSON.parse(localStorage.getItem(nomTableACharger));
		if (RestoredTables === null) {
			alert("Rien a charger");
			return;
		}
		
		var NombreTableASupprimer = Tables.id;
		for (var suppr=1; suppr<=NombreTableASupprimer; suppr++) {
			var IDTable = "table"+suppr;
			if (document.getElementById(IDTable) === null) {
				continue;
			}
			suppression(suppr);
		}
		Tables.id = 0;
		NombreTable = 0;
		
		for (var nbTable = 1; nbTable <= RestoredTables.id; nbTable++) {
			var IDTable = "table"+nbTable;
			
			if(!RestoredTables["EnsembleTable"][IDTable]) {
				NombreTable++;
				Tables.id++;
				continue;
			}
			createArray();
			
			var nbEntete = Object.keys(RestoredTables["EnsembleTable"][IDTable].Entete).length;
			for (var entete = 2; entete <= nbEntete; entete++) {
				createColumn(nbTable);
			}
			
			var nbContenu = Object.keys(RestoredTables["EnsembleTable"][IDTable].Contenu.E0).length;
			for (var contenu = 2; contenu <= nbContenu; contenu++) {
				createLine(nbTable);
			}
			
			if (RestoredTables["EnsembleTable"][IDTable].reduit) {
				reduction(nbTable);
			}
			
			var x = RestoredTables["EnsembleTable"][IDTable].X;
			var y = RestoredTables["EnsembleTable"][IDTable].Y;
		}
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}
	
}

	

	
	




















