var NombreTable=0;
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
		this.tailleMin = undefined;
		this.OrdreEntete=["E0"];
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
	ajoutLigne(Ligne){
		var compteur=0;
		for(var colonne in this.Contenu){
			if(Ligne){
				this.Contenu[colonne].push(Ligne[compteur]);
			}
			else{
				this.Contenu[colonne].push("");
			}
			compteur++;
		}
	}
	ajoutColonne(){
		var NomNouvelleEntree="E"+this.getColonneID();
		this.Entete[NomNouvelleEntree]="";
		this.OrdreEntete.push(NomNouvelleEntree);
		if(this.getNombreLigne()==0){
			this.Contenu[NomNouvelleEntree]=[];
		}
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
	getNom(){
		return this.Libelle;
	}
	setX(x) {
		this.X=x;
	}
	setY(y) {
		this.Y=y;
	}
	setTMin(t){
	    this.tailleMin = t;
	}
	getTMin(){
	    return this.tailleMin;
    }
    tri(NomAttribut,NumTable){
    	var EnteteAtt;
    	for(var cleEntete in this.Entete){
    		if(this.Entete[cleEntete]==NomAttribut){
    			EnteteAtt=cleEntete;
    		}
    	}
    	for (var i1 = 0; i1 < this.Contenu[EnteteAtt].length;i1++){
			var i2 = i1+1;
			while (this.Contenu[EnteteAtt][i1] > this.Contenu[EnteteAtt][i2]){
				this.swapLigne(i1,i2);
				i2++;
		    }
		}
		var NomTable="EmplacementTable"+NumTable;
		document.getElementById(NomTable).remove();
		tableToHTML(this);
	}
	triReverse(NomAttribut,NumTable){
		var EnteteAtt;
    	for(var cleEntete in this.Entete){
    		if(this.Entete[cleEntete]==NomAttribut){
    			EnteteAtt=cleEntete;
    		}
    	}
    	for (var i1 = 0; i1 < this.Contenu[EnteteAtt].length;i1++){
			var i2 = i1+1;
			while (this.Contenu[EnteteAtt][i1] < this.Contenu[EnteteAtt][i2]){
				this.swapLigne(i1,i2);
				i2++;
		    }
		}
		var NomTable="EmplacementTable"+NumTable;
		document.getElementById(NomTable).remove();
		tableToHTML(this);
	}
	TriOrdreEntete(){
		var tab=this.triEntete();
		for(var i=0;i<tab.length;i++){
			for(var cleEntete in this.Entete){
				if(this.Entete[cleEntete]==tab[i]){
					this.OrdreEntete[i]=cleEntete;
					break;
				}
			}
		}
	}
	swapColonne(E1,E2){
		var i1,i2;
		for(var i=0; i<this.OrdreEntete.length;i++){
			if(this.OrdreEntete[i]==E1){
				i1=i;
			}
			if(this.OrdreEntete[i]==E1){
				i2=i;
			}
		}
		this.OrdreEntete[i1]=E2;
		this.OrdreEntete[i2]=E1;
	}
	
	swapLigne(i,j){
		for(var entete in this.Entete){
			var temp=this.Contenu[entete][i];
			this.Contenu[entete][i]=this.Contenu[entete][j];
			this.Contenu[entete][j]=temp;
		}
	}
	triEntete(){
		var tab=[];
		for(var cleEntete in this.Entete){
			tab.push(this.Entete[cleEntete]);
		}
		return tab.sort();
	}
}

//----------------------------Ensemble Tables----------------------------
var Tables={
	id:0,
	EnsembleTable:{},
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
//------------------------------------------------------

dragDrop = {

	initialMouseX: undefined,
	initialMouseY: undefined,
	startX: undefined,
	startY: undefined,
	draggedObject: undefined,
	NomTable: undefined,
	initElement: function (element) {
		if (typeof element == 'string')
			element = document.getElementById(element);
		zone_drag=element.getElementsByClassName("drag");
		zone_drag[0].onmousedown = dragDrop.startDragMouse;
	},
	startDragMouse: function (e) {
        e.stopPropagation();
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
			dragDrop.releaseElement(obj);
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
	releaseElement: function(obj) {
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

function afficherPremierPlan(obj) {
	var tables = document.getElementsByClassName("EmplacementTable");
	for (var tab in tables) {
		if(tables[tab].tagName === 'DIV'){
			(tables[tab].style["z-index"] == 1) ? tables[tab].style["z-index"] = 1 : tables[tab].style["z-index"] = tables[tab].style["z-index"] - 1;
		}
		if (obj === tables[tab]) {
			tables[tab].style["z-index"] = 10;
		}
	}
}

function tableToHTML(TABLE){
	var output = document.getElementById('EmplacementTables');
	var divNew  = document.createElement('div');
	var divDrag  = document.createElement('div');
	var divTitre = document.createElement('div');
	divTitre.setAttribute('contenteditable',"false");
	divTitre.className= 'nomTable';
	divTitre.textContent = TABLE.Libelle;
	divDrag.className = "drag";
	divNew.className = "EmplacementTable";
	output.appendChild(divNew);
	divNew.style["z-index"] = 1;
	divNew.addEventListener('mousedown',function(){
		afficherPremierPlan(divNew);
	});
	var ajoutLigneNew  = document.createElement('input');
	ajoutLigneNew.type = "button" ;
	ajoutLigneNew.value = "+L" ;
	ajoutLigneNew.setAttribute("onClick","createLine("+NombreTable+")");
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
	divDrag.appendChild(ajoutColonneNew);
	divDrag.appendChild(ajoutLigneNew);
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
	trNew.appendChild(thNew);
	theadNew.appendChild(trNew);
	tabNew.appendChild(theadNew);
	var tbodyNew=document.createElement('tbody');
	var trBodyNew=document.createElement('tr');
	tbodyNew.appendChild(trBodyNew);
	tabNew.appendChild(tbodyNew);
	divRelation.appendChild(tabNew);
	divNew.appendChild(divDrag);
    divNew.appendChild(divTitre);
	divNew.appendChild(divRelation);
	var IDEmplacement="EmplacementTable"+StringID;
	divNew.id=IDEmplacement;
	DeplacementHauteur=120+NombreTable*100;
	divNew.style.top = DeplacementHauteur+'px';
	//dragDrop.initElement(IDEmplacement);
	recupTable();
	var taille = divDrag.offsetWidth-22;
	var NomTable="table"+NombreTable;
    Tables["EnsembleTable"][NomTable].tailleMin=divDrag.offsetWidth;
    divTitre.style["min-width"] = taille.toString()+"px";

	//POUR RAJOUTER LES COLONNES ET LIGNES
	var nbEntete = Object.keys(TABLE.Entete).length;
	var nbContenu = Object.keys(TABLE.Contenu.E0).length;
	var contenuMAJ = "<thead><tr>";
	for (var entete = 0; entete < nbEntete; entete++) {
		var position = "E"+entete;
		var valeur = TABLE.Entete[position];
		contenuMAJ += "<th class=\"col\"><input type=\"text\" value=\""+valeur+"\" disabled=\"\"></th>";
	}
	contenuMAJ += "</tr></thead><tbody>";

	for (var contenu = 0; contenu < nbContenu; contenu++) {
		contenuMAJ += "<tr>";
		for (var entete = 0; entete < nbEntete; entete++) {
			var position = "E"+entete;
			var valeur = TABLE.Contenu[position];
			contenuMAJ += "<td><input type=\"text\" value=\""+valeur[contenu]+"\" disabled=\"\"></td>";
		}
		contenuMAJ += "</tr>";
	}
	contenuMAJ += "<tr></tr></tbody>";
	document.getElementById("table"+NombreTable).innerHTML = contenuMAJ;
	dragDrop.initElement(IDEmplacement);
}


function createColumnHTML(ID) {
	var StringID=ID.toString();
	var IDTable="table"+StringID;
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

function createLineHTML(ID){
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


function createEquiJointure(table1,table2,e_table1,e_table2){
    if(table1.constructor.name!="Table" || table2.constructor.name!="Table"){
        console.log("Erreur equi-jointure");
        return false;
    }
    var tableEquiJointure = new Table();
    tableEquiJointure.attribuerNom(table1.Libelle + "["+e_table1+" = "+e_table2+"]"+table2.Libelle);
    tableEquiJointure.Entete = table1.Entete;
    var compteur = tableEquiJointure.getNombreColonne();
    for(var i in table2.Entete){
        var NomNouvelleEntree="E"+compteur;
        tableEquiJointure.Entete[NomNouvelleEntree]=table2.Entete[i];
        compteur++;
    }
    compteur = 0;
    for(var i in tableEquiJointure.Entete){
        var NomNouvelleEntree="E"+compteur;
        tableEquiJointure.Contenu[NomNouvelleEntree]=[];
        compteur++;
    }
    var numEntTab1;
    for(var i in table1.Entete){
        if(table1.Entete[i] == e_table1){
            numEntTab1 = i;
        }
    }
    var numEntTab2;
    for(var i in table2.Entete){
        if(table2.Entete[i] == e_table2){
            numEntTab2 = i;
        }
    }
    var lTab1 = 0;
    var lTab2 = 0;
    for(var i in table1.Contenu[numEntTab1]){
        var attEnteteCourant = table1.Contenu[numEntTab1][i];
        for(var n in table2.Contenu[numEntTab2]){
            if(attEnteteCourant == table2.Contenu[numEntTab2][n]){
              var newLigne = recupereLigne(table1,lTab1).concat(recupereLigne(table2,lTab2));
              tableEquiJointure.ajoutLigne(newLigne);
            }
            lTab2++;
        }
        lTab2 = 0;
        lTab1++;
    }
    Tables.AjoutTable(tableEquiJointure);
    NombreTable++;
    tableToHTML(tableEquiJointure);
    return true;
}

function createUnion(TABLE1,TABLE2){
	if(TABLE1.constructor.name!="Table" || TABLE2.constructor.name!="Table"){
		console.log("Erreur Union");
		return false;
	}
	if(TABLE1.getNombreColonne()!=TABLE2.getNombreColonne()){
		console.log("Erreur Union");
		return false;
	}
	var t1=TABLE1.triEntete();
	var t2=TABLE2.triEntete();
	if(t1.length!=t2.length){
		console.log("Erreur Union");
		return false;
	}
	for(var colonne in t1){
		if(t1[colonne]!=t2[colonne]){
			console.log("Erreur Union: Le nom des attributs des 2 tables doivent être identique");
			return false;
		}
	}
	TABLE1.TriOrdreEntete();
	TABLE2.TriOrdreEntete();
	var TableUnion=new Table();
	TableUnion.attribuerNom("Union: "+TABLE1.Libelle+" ET "+TABLE2.Libelle);
	var compteur =0;
	for(cleEntete in TABLE1.OrdreEntete){
		var NomNouvelleEntree="E"+compteur;
		TableUnion.Entete[NomNouvelleEntree]=TABLE1.Entete[TABLE1.OrdreEntete[cleEntete]];
		if(compteur!=0)TableUnion.OrdreEntete.push(NomNouvelleEntree);
		compteur++;
	}
	TableUnion.ColonneId=compteur;
	compteur=0;
	for(var i in TableUnion.Entete){
		var NomNouvelleEntree="E"+compteur;
		TableUnion.Contenu[NomNouvelleEntree]=[];
		compteur++;
	}
	for(var i=0;i<TABLE1.getNombreLigne();i++){
		var ligneCourante=recupereLigne(TABLE1,i);
		TableUnion.ajoutLigne(ligneCourante);
	}
	for(var i=0;i<TABLE2.getNombreLigne();i++){
		var ligneCourante=recupereLigne(TABLE2,i);
		var isDoublon=false;
		for(var j=0;j<TABLE1.getNombreLigne();j++){
			var ligneComparative=recupereLigne(TABLE1,j);
			if(JSON.stringify(ligneCourante)==JSON.stringify(ligneComparative)){
				isDoublon=true;
			}
		}
		if(!isDoublon){
			TableUnion.ajoutLigne(ligneCourante);
		}
	}
	Tables.AjoutTable(TableUnion);
	NombreTable++;
	tableToHTML(TableUnion);
	return true; 

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
	var t1=TABLE1.triEntete();
	var t2=TABLE2.triEntete();
	if(t1.length!=t2.length){
		console.log("Erreur Intersection");
		return false;
	}
	for(var colonne in t1){
		if(t1[colonne]!=t2[colonne]){
			console.log("Erreur Intersection: Le nom des attributs des 2 tables doivent être identique");
			return false;
		}
	}
	TABLE1.TriOrdreEntete();
	TABLE2.TriOrdreEntete();
	var TableIntersection=new Table();
	TableIntersection.attribuerNom("Intersection: "+TABLE1.Libelle+" ET "+TABLE2.Libelle);
	var compteur =0;
	for(var i in TABLE1.Entete){
		var NomNouvelleEntree="E"+compteur;
		TableIntersection.Contenu[NomNouvelleEntree]=[];
		compteur++;
	}
	TableIntersection.ColonneId=compteur;
	compteur=0;
	for(cleEntete in TABLE1.OrdreEntete){
		var NomNouvelleEntree="E"+compteur;
		TableIntersection.Entete[NomNouvelleEntree]=TABLE1.Entete[TABLE1.OrdreEntete[cleEntete]];
		if(compteur!=0)TableIntersection.OrdreEntete.push(NomNouvelleEntree);
		compteur++;
	}
	for(var i=0;i<TABLE1.getNombreLigne();i++){
		var ligneCourante=recupereLigne(TABLE1,i);
		for(var j=0;j<TABLE2.getNombreLigne();j++){
			if(JSON.stringify(ligneCourante)==JSON.stringify(recupereLigne(TABLE2,j))){
				TableIntersection.ajoutLigne(ligneCourante);
				break;
			}
		}
	}
	Tables.AjoutTable(TableIntersection);
	NombreTable++;
	tableToHTML(TableIntersection);
	return true; 
}
function recupereLigne(TABLE,NumeroLigne){
	var res=[];
	for(var i in TABLE.OrdreEntete){
		res.push(TABLE.Contenu[TABLE.OrdreEntete[i]][NumeroLigne]);
	}
	return res;
}
function createDiff(TABLE1,TABLE2){
	if(TABLE1.constructor.name!="Table" || TABLE2.constructor.name!="Table"){
		console.log("Erreur Diff");
		return false;
	}
	if(TABLE1.getNombreColonne()!=TABLE2.getNombreColonne()){
		console.log("Erreur Diff");
		return false;
	}
	var t1=TABLE1.triEntete();
	var t2=TABLE2.triEntete();
	if(t1.length!=t2.length){
		console.log("Erreur Diff");
		return false;
	}
	for(var colonne in t1){
		if(t1[colonne]!=t2[colonne]){
			console.log("Erreur Diff: Le nom des attributs des 2 tables doivent être identique");
			return false;
		}
	}
	TABLE1.TriOrdreEntete();
	TABLE2.TriOrdreEntete();
	var TableDiff=new Table();
	TableDiff.attribuerNom("Diff: "+TABLE1.Libelle+" ET "+TABLE2.Libelle);
	var compteur =0;
	for(var i in TABLE1.Entete){
		var NomNouvelleEntree="E"+compteur;
		TableDiff.Contenu[NomNouvelleEntree]=[];
		compteur++;
	}
	TableDiff.ColonneId=compteur;
	compteur =0;
	for(cleEntete in TABLE1.OrdreEntete){
		var NomNouvelleEntree="E"+compteur;
		TableDiff.Entete[NomNouvelleEntree]=TABLE1.Entete[TABLE1.OrdreEntete[cleEntete]];
		if(compteur!=0)TableDiff.OrdreEntete.push(NomNouvelleEntree);
		compteur++;
	}

	for(var i=0;i<TABLE1.getNombreLigne();i++){
		var ligneCourante=recupereLigne(TABLE1,i);
		var boolEstPresent=false;
		for(var j=0;j<TABLE2.getNombreLigne();j++){
			if(JSON.stringify(ligneCourante)==JSON.stringify(recupereLigne(TABLE2,j))){
				boolEstPresent=true;
			}
		}
		if(!boolEstPresent){
			TableDiff.ajoutLigne(ligneCourante);
		}
	}
	for(var i=0;i<TABLE2.getNombreLigne();i++){
		var ligneCourante=recupereLigne(TABLE2,i);
		var boolEstPresent=false;
		for(var j=0;j<TABLE1.getNombreLigne();j++){
			if(JSON.stringify(ligneCourante)==JSON.stringify(recupereLigne(TABLE1,j))){
				boolEstPresent=true;
			}
		}
		if(!boolEstPresent){
			TableDiff.ajoutLigne(ligneCourante);
		}
	}
	Tables.AjoutTable(TableDiff);
	NombreTable++;
	tableToHTML(TableDiff);
	return true; 
}
function createRelation(){
	var select1 = document.getElementById("select1");
	var select2 = document.getElementById("select2");
	var operateur = document.getElementById("operateur");
	if(operateur.value=="1"){
		createIntersection(Tables.EnsembleTable[select1.value],Tables.EnsembleTable[select2.value]);
	}
	if(operateur.value=="2"){
		createUnion(Tables.EnsembleTable[select1.value],Tables.EnsembleTable[select2.value]);
	}
	if(operateur.value=="3"){
		createDiff(Tables.EnsembleTable[select1.value],Tables.EnsembleTable[select2.value]);
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
	console.log("test");
	document.forms["Requete"].elements["Table1"].value=0;
	document.forms["Requete"].elements["operateur"].value=0;
	document.forms["Requete"].elements["Table2"].value=0;
}

function recupTable(){
	var select1 = document.getElementById("select1");
	var select2 = document.getElementById("select2");
	var selectOp = document.getElementById("operateur");

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
	    console.log(trs);
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
	trNew.className = 'col';

    var divBtnTriSupr = document.createElement('div');
    divBtnTriSupr.className = 'btnCol';
    var btnTri = document.createElement('img');
    btnTri.src = "../ressources/images/btnTri.png";
    btnTri.setAttribute('class',"tri");
    var btnrevTri = document.createElement('img');
    btnrevTri.src = "../ressources/images/reverseTri.png";
    btnrevTri.setAttribute('class',"reverseTri");
    var btnSuprCol = document.createElement('img');
    btnSuprCol.src = "../ressources/images/suprCol.png";
    btnSuprCol.setAttribute('class',"suprCol");
    divBtnTriSupr.appendChild(btnTri);
    divBtnTriSupr.appendChild(btnrevTri);
    divBtnTriSupr.appendChild(btnSuprCol);

	var EntreeTexte  = document.createElement('input');
	EntreeTexte.type="text";
	EntreeTexte.disabled=Tables["EnsembleTable"][IDTable].getBloquer();
	EntreeTexte.placeholder="Nom attribut";
	trNew.appendChild(EntreeTexte);
	trNew.appendChild(divBtnTriSupr);
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
	var divTitre = document.createElement('div');
	var divBouton = document.createElement('div');
	divBouton.className = 'bcBouton';
	divTitre.setAttribute('contenteditable',"false");
	divTitre.className= 'nomTable';
	divTitre.textContent = Tables["EnsembleTable"]["table"+NombreTable].getNom();
	divDrag.className = "drag";
	divNew.className = "EmplacementTable";
	output.appendChild(divNew);
	divNew.style["z-index"] = 1;
	divNew.addEventListener('mousedown',function(){
		afficherPremierPlan(divNew);
	});
	var ajoutLigneNew  = document.createElement('input');
	ajoutLigneNew.type = "button" ;
	ajoutLigneNew.value = "+L" ;
	ajoutLigneNew.setAttribute("onClick","createLine("+NombreTable+")") ;
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
	divBouton.appendChild(ajoutColonneNew);
    divBouton.appendChild(ajoutLigneNew);
    divBouton.appendChild(ajoutButtonReduc);
    divBouton.appendChild(ajoutButtonSuppr);
    divBouton.appendChild(ajoutButtonModif);
    divDrag.appendChild(divTitre);
    divDrag.appendChild(divBouton)
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

	var divBtnTriSupr = document.createElement('div');
	divBtnTriSupr.className = 'btnCol';
	var btnTri = document.createElement('img');
    btnTri.src = "../ressources/images/btnTri.png";
    btnTri.setAttribute('class',"tri");
    var btnrevTri = document.createElement('img');
    btnrevTri.src = "../ressources/images/reverseTri.png";
    btnrevTri.setAttribute('class',"reverseTri");
    var btnSuprCol = document.createElement('img');
    btnSuprCol.src = "../ressources/images/suprCol.png";
    btnSuprCol.setAttribute('class',"suprCol");
    divBtnTriSupr.appendChild(btnTri);
    divBtnTriSupr.appendChild(btnrevTri);
    divBtnTriSupr.appendChild(btnSuprCol);

	var EntreeTexte  = document.createElement('input');
	EntreeTexte.type="text";
	EntreeTexte.disabled=bloquage;
	EntreeTexte.placeholder="Nom attribut";
	thNew.appendChild(EntreeTexte);
	thNew.appendChild(divBtnTriSupr);
	trNew.appendChild(thNew);
	theadNew.appendChild(trNew);
	tabNew.appendChild(theadNew);
	var tbodyNew=document.createElement('tbody');
	var trBodyNew=document.createElement('tr');
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
	var taille = divDrag.offsetWidth-22;
    Tables["EnsembleTable"]["table"+NombreTable].setTMin(divDrag.offsetWidth);
    divTitre.style["min-width"] = taille.toString()+"px";
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
    var col = document.getElementsByClassName('col');
    for(var n in col){
        col[n].className = 'col btn';
    }
    var emplacement = document.getElementById('EmplacementTable'+IDTable);
	var titre = emplacement.getElementsByClassName('nomTable');
    titre[0].setAttribute('contenteditable',"true");
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
	var col = document.getElementsByClassName('col');
	for(var n in col){
	    col[n].className = 'col';
    }
	var emplacement = document.getElementById('EmplacementTable'+IDTable);
	var titre = emplacement.getElementsByClassName('nomTable');
	titre[0].setAttribute('contenteditable',"false");
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
	table = document.getElementById('EmplacementTable'+IDTable);
    var titre = table.getElementsByClassName('nomTable');
    if(titre[0].textContent === ""){
        Tables["EnsembleTable"][ID].attribuerNom(ID);
        titre[0].textContent = ID;
    }
    else {
        Tables["EnsembleTable"][ID].attribuerNom(titre[0].textContent);
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
	divRelation[0].style.display='none';
	var divDrag = table.getElementsByClassName('drag');
	// console.log(Tables["EnsembleTable"][ID].getTMin());
	divDrag[0].style.width = Tables["EnsembleTable"][ID].getTMin()+"px";
	var btnReduc = divDrag[0].getElementsByClassName('btnReduc');
	btnReduc[0].setAttribute('onclick',"agrandissement("+IDTable+")");
}

function agrandissement(IDTable){
	var ID="table"+IDTable;
	Tables["EnsembleTable"][ID].reduire();
	var table = document.getElementById("EmplacementTable"+IDTable);
	var divRelation = table.getElementsByClassName('relation');
	divRelation[0].style.display='block';
	var divDrag = table.getElementsByClassName('drag');
	divDrag[0].style.width = '';
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
	affichageModele();
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
		for(var RestoredT in RestoredTables["EnsembleTable"]){
			var NewTable =new Table();
			NewTable.Entete=RestoredTables.EnsembleTable[RestoredT].Entete;
			NewTable.X=RestoredTables.EnsembleTable[RestoredT].X;
			NewTable.Y=RestoredTables.EnsembleTable[RestoredT].Y;
			NewTable.reduit=RestoredTables.EnsembleTable[RestoredT].reduit;
			NewTable.Libelle=RestoredTables.EnsembleTable[RestoredT].Libelle;
			NewTable.Contenu=RestoredTables.EnsembleTable[RestoredT].Contenu;
			NewTable.ColonneId=RestoredTables.EnsembleTable[RestoredT].ColonneId;
			NewTable.bloque=RestoredTables.EnsembleTable[RestoredT].bloque;
			NewTable.tailleMin=RestoredTables.EnsembleTable[RestoredT].tailleMin;
			NewTable.OrdreEntete=RestoredTables.EnsembleTable[RestoredT].OrdreEntete;
			Tables.AjoutTable(NewTable);
		}
		for (var nbtable in Tables["EnsembleTable"]) {
			NombreTable++;
			tableToHTML(Tables["EnsembleTable"][nbtable]);
		}
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}
	
	jointureNaturelle();
	
}

	


function projection() {
	var colonneSelectionner = ["E0","E2"];
	var NomTable = "table2";
	var TableProjection = new Table();
	var nomNvTable = "Projection "+NomTable;
	for (var i = 0, c = colonneSelectionner.length; i < c; i++) {
		nomNvTable += " "+Tables["EnsembleTable"][NomTable].Entete[colonneSelectionner[i]];
		TableProjection.Entete["E"+i]=Tables["EnsembleTable"][NomTable].Entete[colonneSelectionner[i]];
		TableProjection.Contenu["E"+i]=Tables["EnsembleTable"][NomTable].Contenu[colonneSelectionner[i]];
	}
	TableProjection.attribuerNom(nomNvTable);
	Tables.AjoutTable(TableProjection);
	NombreTable++;
	tableToHTML(TableProjection);
}


function jointureNaturelle() {
	var colonnePourJointureNaturelle = "NumeroEtudiant*";
	var table1 = Tables["EnsembleTable"]["table1"];
	var table2 = Tables["EnsembleTable"]["table2"];
	var jointureTable1Possible = false;
	var positionTable1 = -1;
	var jointureTable2Possible = false;
	var positionTable2 = -1;
	for (var tb1ent in table1.Entete) {
		if (table1.Entete[tb1ent] === colonnePourJointureNaturelle) {
			jointureTable1Possible = true;
			positionTable1 = tb1ent.toString();
		}
	}
	for (var tb2ent in table2.Entete) {
		if (table2.Entete[tb2ent] === colonnePourJointureNaturelle) {
			jointureTable2Possible = true;
			positionTable2 = tb2ent.toString();
		}
	}
	if (!jointureTable1Possible || !jointureTable2Possible) {
		console.log("Pas possible de faire une jointure");
		return;
	}
	var positionLigneASaveTable1 = [];
	var positionLigneASaveTable2 = [];
	var TableJointureNaturelle = new Table();
	var NomTable = table1.Libelle+"["+colonnePourJointureNaturelle+"]"+table2.Libelle;
	for (var tb1ctn in table1.Contenu[positionTable1]) {
		for (var tb2ctn in table2.Contenu[positionTable2]) {
			if (table1.Contenu[positionTable1][tb1ctn] === table2.Contenu[positionTable2][tb2ctn]) {
				positionLigneASaveTable1.push(tb1ctn);
				positionLigneASaveTable2.push(tb2ctn);
			}
		}
	}
	var t1lght = Object.keys(table1.Entete).length;
	for (var i = 0; i < t1lght; i++) { 
		TableJointureNaturelle.Entete["E"+i]=table1.Entete["E"+i];
	}
	for (var i = t1lght, j = 0, c = Object.keys(table2.Entete).length-1; i < t1lght + c; i++, j++) {
		if (table2.Entete["E"+j] === colonnePourJointureNaturelle) {
			i--;
			continue;
		}
		TableJointureNaturelle.Entete["E"+i]=table2.Entete["E"+j];
	}
	for (var i = 0, c = Object.keys(TableJointureNaturelle.Entete).length; i < c; i++) {
		TableJointureNaturelle.Contenu["E"+i]=[];
	}
	for (var i = 0, c = positionLigneASaveTable1.length; i<c; i++) {
		var lgtTable1 = Object.keys(table1.Contenu).length;
		for (var j = 0, jcl = Object.keys(table1.Contenu).length; j < jcl; j++){
			var t = positionLigneASaveTable1[i];
			TableJointureNaturelle.Contenu["E"+j][i]=table1.Contenu["E"+j][t];
		}
		for (var j = 0, jcl = Object.keys(table2.Contenu).length; j < jcl; j++){
			if (table2.Entete["E"+j] === colonnePourJointureNaturelle) {
				continue;
			}
			var te = j + lgtTable1 -1;
			var t = positionLigneASaveTable1[i];
			TableJointureNaturelle.Contenu["E"+te][i]=table2.Contenu["E"+j][t];
		}
	}
	TableJointureNaturelle.attribuerNom(NomTable);
	Tables.AjoutTable(TableJointureNaturelle);
	NombreTable++;
	tableToHTML(TableJointureNaturelle);
}




















































