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
	supprimerColonne(indice){
		var it_entete = 0
		var it_contenu = 0;
		var newEntete = {};
		var newContenu = {};
		delete this.Entete["E"+indice];
		delete this.Contenu["E"+indice]
		for(var i in this.Entete){
			var nomEntete = "E" + it_entete;
			newEntete[nomEntete] = this.Entete[i];
			it_entete++;
		}
		for(var i in this.Contenu){
			var nomEntContenu = "E"+it_contenu;
			newContenu[nomEntContenu] = this.Contenu[i];
			it_contenu++;
		}
		for(var i in this.OrdreEntete){
			if(this.OrdreEntete[i].substring(1) === indice.toString()){
				this.OrdreEntete.splice(i,1);
			}
		}
		for(var i in this.OrdreEntete){
			if(this.OrdreEntete[i].substring(1) > indice.toString()){
				var newIndice = this.OrdreEntete[i].substring(1);
				newIndice -= 1;
				this.OrdreEntete[i] = "E"+newIndice;
			}
		}
		this.Entete = newEntete;
		this.Contenu = newContenu;
		this.ColonneId--;
	}
	supprimerLigne(indice){
		for(var i in this.Contenu){
			this.Contenu[i].splice(indice,1);
		}
		console.log(this.Contenu);
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
    tri(Entete,NumTable){
    	var EnteteAtt="E"+Entete;
    	var isNombre=true;
    	for(var i=0; i<this.getNombreLigne();++i){
    		var i=+this.Contenu[EnteteAtt][i];
    		if(isNaN(i)){
    			isNombre=false;
    		}
    	}
    	if(isNombre){
    		for (var i1 = this.Contenu[EnteteAtt].length-1; i1 >0;i1--){
	    		for (var i2 = 0; i2<i1;i2++){
	    			if(+this.Contenu[EnteteAtt][i2]>+this.Contenu[EnteteAtt][i2+1]){
	    				this.swapLigne(i2,i1);
	    			}
			    }
			}
    	}
    	else{
	    	for (var i1 = this.Contenu[EnteteAtt].length-1; i1 >0;i1--){
	    		for (var i2 = 0; i2<i1;i2++){
	    			if(this.Contenu[EnteteAtt][i2]>this.Contenu[EnteteAtt][i2+1]){
	    				this.swapLigne(i2,i1);
	    			}
			    }
			}
		}
		var NomTable="EmplacementTable"+NumTable;
		document.getElementById(NomTable).remove();
		tableToHTML(this);
	}
	triReverse(Entete,NumTable){
		var EnteteAtt="E"+Entete;
		var isNombre=true;
    	for(var i=0; i<this.getNombreLigne();++i){
    		var i=+this.Contenu[EnteteAtt][i];
    		if(isNaN(i)){
    			isNombre=false;
    		}
    	}
    	if(isNombre){
    		for (var i1 = this.Contenu[EnteteAtt].length-1; i1 >0;i1--){
	    		for (var i2 = 0; i2<i1;i2++){
	    			if(+this.Contenu[EnteteAtt][i2]<+this.Contenu[EnteteAtt][i2+1]){
	    				this.swapLigne(i2,i1);
	    			}
			    }
			}
    	}
    	else{
	    	for (var i1 = this.Contenu[EnteteAtt].length-1; i1 >0;i1--){
	    		for (var i2 = 0; i2<i1;i2++){
	    			if(this.Contenu[EnteteAtt][i2]<this.Contenu[EnteteAtt][i2+1]){
	    				this.swapLigne(i2,i1);
	    			}
			    }
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
		(TABLE.Libelle ==="")?TABLE.attribuerNom(NomTable):TABLE.attribuerNom(TABLE.Libelle);
	},
	suppressionTable: function(ID){
		delete Tables["EnsembleTable"][ID];
	},
	getTableByLibelle(libelle){
		for(var i in Tables["EnsembleTable"]){
			if(Tables["EnsembleTable"][i].Libelle === libelle){
				return Tables["EnsembleTable"][i];
			}
		}
		return null;
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
	var divTitre = document.createElement('input');
	divTitre.disabled = true;
	divTitre.type = 'text';
	divTitre.value = TABLE.getNom();
	divTitre.className= 'nomTable';
	divTitre.pattern = "[A-Za-z0-9]";
	divTitre.minLength = '1';
	divTitre.maxLength = '20';
	var divBouton = document.createElement('div');
	divBouton.className = 'bcBouton';
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
    divNew.appendChild(divTitre);
	divNew.appendChild(divRelation);
	var IDEmplacement="EmplacementTable"+StringID;
	divNew.id=IDEmplacement;
	DeplacementHauteur=120+NombreTable*100;
	divNew.style.top = DeplacementHauteur+'px';
	dragDrop.initElement(IDEmplacement);
	// recupTable();
    Tables["EnsembleTable"]["table"+NombreTable].setTMin(divDrag.offsetWidth);
	thNew.getElementsByClassName('tri')[0].setAttribute('onclick',"Tables.EnsembleTable.table"+NombreTable+".tri(0,"+NombreTable+")");
	thNew.getElementsByClassName('reverseTri')[0].setAttribute('onclick',"Tables.EnsembleTable.table"+NombreTable+".triReverse(0,"+NombreTable+")");
	trNew.getElementsByClassName('suprCol')[0].setAttribute('onclick','supprColum('+IDTable+',0)');

	//POUR RAJOUTER LES COLONNES ET LIGNES
	var nbEntete = Object.keys(TABLE.Entete).length;
	var nbContenu = Object.keys(TABLE.Contenu.E0).length;
	var contenuMAJ = "<thead><tr>";
	for (var entete = 0; entete < nbEntete; entete++) {
		var position = "E"+entete;
		var valeur = TABLE.Entete[position];
		contenuMAJ += "<th class=\"col\"><input type=\"text\" value=\""+valeur+"\" disabled=\"\">";
		contenuMAJ += "<div class=\"btnCol\"><img class=\"tri\" src=\"../ressources/images/btnTri.png\" onclick=\"console.log(\"tri croissant\")\">";
		contenuMAJ += "<img class=\"reverseTri\" src=\"../ressources/images/reverseTri.png\" onclick=\"console.log(\"x="+entete+" TABLE="+NombreTable+"\")\">";
		contenuMAJ += "<img class=\"suprCol\" src=\"../ressources/images/suprCol.png\">";
		contenuMAJ += "</th>";
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
	(Tables["EnsembleTable"][IDTable].getBloquer())? trNew.className = 'col':trNew.className = 'col btn';

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
	trNew.getElementsByClassName('tri')[0].setAttribute('onclick',"Tables.EnsembleTable.table"+ID+".tri("+Tables["EnsembleTable"][IDTable].getNombreColonne()+","+ID+")");
	trNew.getElementsByClassName('reverseTri')[0].setAttribute('onclick',"Tables.EnsembleTable.table"+ID+".triReverse("+Tables["EnsembleTable"][IDTable].getNombreColonne()+","+ID+")");
	trNew.getElementsByClassName('suprCol')[0].setAttribute('onclick','supprColum('+IDTable+','+nbColonnes+')');
	if (output) {
	    trs = output.getElementsByTagName('th');
	    if (trs[nbColonnes-1]) { // Le <tr> de Chrome
	        trs[nbColonnes-1].parentNode.insertBefore(trNew, trs[nbColonnes-1].nextSibling);
	    }
	}
}
/*
function createColumnHTML(ID) {
	var StringID=ID.toString();
	var IDTable="table"+StringID;
	var output = document.getElementById(IDTable),trs;
	var Colonnes=output.getElementsByClassName('col');
	var nbColonnes=Colonnes.length;
	var ligne=output.getElementsByTagName('tr');
	var EnteteAtt="E"+ligne;
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
	(Tables["EnsembleTable"][IDTable].getBloquer())? trNew.className = 'col':trNew.className = 'col btn';
	var EntreeTexte  = document.createElement('input');
	EntreeTexte.type="text";
	EntreeTexte.disabled=Tables["EnsembleTable"][IDTable].getBloquer();
	EntreeTexte.placeholder="Nom attribut";
	trNew.appendChild(EntreeTexte);
	trNew.getElementsByClassName('tri')[0].setAttribute('onclick',"Tables.EnsembleTable.table"+ID+".tri("+EnteteAtt+","+ID+")");
	trNew.getElementsByClassName('reverseTri')[0].setAttribute('onclick',"Tables.EnsembleTable.table"+ID+".triReverse("+EnteteAtt+","+ID+")");
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
*/

function createEquiJointure(table1,table2,e_table1,e_table2){
    if(table1.constructor.name!="Table" || table2.constructor.name!="Table"){
        alert("Erreur equi-jointure");
        return false;
    }

	var entete1presente = false;
	for (var i in table1.Entete) {
		if (table1.Entete[i] === e_table1) {
			entete1presente = true;
		}
	}
	if (!entete1presente) {
		alert("L'entete saisi n'est pas dans la table : "+table1.Libelle+".");
		return false;
	}

	var entete2presente = false;
	for (var i in table2.Entete) {
		if (table2.Entete[i] === e_table2) {
			entete2presente = true;
		}
	}
	if (!entete2presente) {
		alert("L'entete saisi n'est pas dans la table : "+table2.Libelle+".");
		return false;
	}

    var tableEquiJointure = new Table();
    tableEquiJointure.attribuerNom(table1.Libelle + "["+e_table1+" = "+e_table2+"]"+table2.Libelle);

	for (var i in table1.Entete) {
		tableEquiJointure.Entete[i] = table1.Entete[i];
	}

	var compteur = tableEquiJointure.getNombreColonne();
	console.log(compteur);
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
	if (tableEquiJointure.getNombreLigne() === 0) {
		alert("Aucune ligne créée, il n'y a pas de ligne commune entre les deux tables.");
	}
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
		console.log("Erreur Diff : Nombre de colonne différente");
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
	if (createDiff.caller.name !== "createDivision") {
		tableToHTML(TableDiff);
		return true;
	} else {
		return TableDiff;
	}
}
function createRelation(){
	var select1 = document.getElementById("select1");
	var select2 = document.getElementById("select2");
	var operateur = document.getElementById("operateur");
	var select1J = document.getElementById("select1J");
	var select2J = document.getElementById("select2J");
	var operateurJ = document.getElementById("operateurJ");
	var att1=document.getElementById("Att1");
	var att2=document.getElementById("Att2");
	var base = document.getElementById("Req");
	var autre = document.getElementById("ReqJ");
	if(autre.style.display=="none"){
		if(operateur.value=="1"){
			createIntersection(Tables.EnsembleTable[select1.value],Tables.EnsembleTable[select2.value]);
		}
		if(operateur.value=="2"){
			createUnion(Tables.EnsembleTable[select1.value],Tables.EnsembleTable[select2.value]);
		}
		if(operateur.value=="3"){
			createDiff(Tables.EnsembleTable[select1.value],Tables.EnsembleTable[select2.value]);
		}
		if(operateur.value=="4"){
			createDivision(Tables.EnsembleTable[select1.value],Tables.EnsembleTable[select2.value]);
		}
		if(operateur.value=="5"){
			produitCartesien(Tables.EnsembleTable[select1.value],Tables.EnsembleTable[select2.value]);
		}
		if(operateur.value=="6"){
			differenceColonne(Tables.EnsembleTable[select1.value],Tables.EnsembleTable[select2.value]);
		}
		if(operateur.value=="7"){
			createJointureNaturelle(Tables.EnsembleTable[select1.value],Tables.EnsembleTable[select2.value]);
		}
	}
	else{
		if(operateurJ.value=="8"){
			createTetaJointure(Tables.EnsembleTable[select1J.value],Tables.EnsembleTable[select2J.value],att1.value,att2.value)
		}
		if(operateurJ.value=="9"){
			createEquiJointure(Tables.EnsembleTable[select1J.value],Tables.EnsembleTable[select2J.value],att1.value,att2.value)
		}
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
function afficheAutre(){
	var base = document.getElementById("Req");
	var autre = document.getElementById("ReqJ");
	if(autre.style.display=="none"){
		autre.style.display="";
		base.style.display="none";
	}
	else{
		base.style.display="";
		autre.style.display="none";
	}
}
function recupTable(){
	var select1 = document.getElementById("select1");
	var select2 = document.getElementById("select2");
	var select1J = document.getElementById("select1J");
	var select2J = document.getElementById("select2J");
	select1.innerHTML="";
	select2.innerHTML="";
	select1J.innerHTML="";
	select2J.innerHTML="";
	for(var table in Tables["EnsembleTable"]){
		select1.innerHTML+="<option value="+table+">"+table+"</option>";
		select2.innerHTML+="<option value="+table+">"+table+"</option>";
		select1J.innerHTML+="<option value="+table+">"+table+"</option>";
		select2J.innerHTML+="<option value="+table+">"+table+"</option>";
	}

}

function createLine(ID){
	var StringID=ID.toString();
	var IDTable="table"+StringID;
	Tables["EnsembleTable"][IDTable].ajoutLigne();
	var output = document.getElementById(IDTable),trs;
	var trNew  = document.createElement('tr');
	if(!Tables["EnsembleTable"][IDTable].getBloquer()){
		trNew.className = 'btnLigne';
	}
	var divNew = document.createElement('div');
	var imgBtnSuprLigne = document.createElement('img');
	divNew.className = 'btnSuprLigne';
	imgBtnSuprLigne.width = '16';
	imgBtnSuprLigne.height = '16';
	imgBtnSuprLigne.src = '../ressources/images/suprCol.png';
	var nbLigne = Tables["EnsembleTable"][IDTable].getNombreLigne()-1;
	console.log("Nombre de ligne "+nbLigne);
	imgBtnSuprLigne.setAttribute('onclick','supprLigne('+IDTable+','+nbLigne+')');
	divNew.appendChild(imgBtnSuprLigne);
	var Colonnes=output.getElementsByClassName('col');
	var nbColonnes=Colonnes.length;


	for (var i = 0; i < nbColonnes; i++) {
		var td = document.createElement('td');
		var EntreeTexte  = document.createElement('input');
		EntreeTexte.type="text";
		EntreeTexte.disabled=Tables["EnsembleTable"][IDTable].getBloquer();
		EntreeTexte.placeholder="Valeur attribut";
		td.appendChild(EntreeTexte);
		if(i == 0){
			td.appendChild(divNew);
		}
		trNew.appendChild(td);
    }
	if (output) {
	    trs = output.getElementsByTagName('tr');
	    if (trs[1]) { // Le <tr> de Chrome
	        trs[1].parentNode.insertBefore(trNew, trs[1]);
	    }
	}
}


function supprColum(Table,IDColonne){
	recuperationContenu(Table.id.substring(Table.id.length-1));
	var nomTable = Tables["EnsembleTable"][Table.id.toString()].Libelle;
	var n = Tables["EnsembleTable"][Table.id.toString()].getNombreColonne();
	if(n == 1){
		suppression(Table.id.substring(Table.id.length-1));
	}else {
		if (confirm("Supprimer la colonne [" + IDColonne + "] de la table [" + nomTable + "] ?")) {
			var firstTh = Table.getElementsByClassName('col');
			var tr = Table.getElementsByTagName('tr');
			tr[0].removeChild(firstTh[IDColonne]);
			for (var i = 1; i < tr.length - 1; i++) {
				var td = tr[i].getElementsByTagName('td');
				tr[i].removeChild(td[IDColonne]);
			}
			Tables["EnsembleTable"][Table.id.toString()].supprimerColonne(IDColonne);
			n = Tables["EnsembleTable"][Table.id.toString()].getNombreColonne();
			for (var i = 0; i < n; i++) {
				Table.getElementsByClassName('suprCol')[i].setAttribute('onclick', 'supprColum(' + Table.id.toString() + ',' + i + ')');
			}
		}
	}
}

function supprLigne(IDTable,IDLigne){
	recuperationContenu(IDTable.id.substring(IDTable.id.length-1));
	var nomTable = Tables["EnsembleTable"][IDTable.id.toString()].Libelle;
	var Table = document.getElementById(IDTable.id);
	var l = Tables["EnsembleTable"][IDTable.id.toString()].getNombreLigne()-1;
	var r = IDLigne;
	var newIndice = l-r;
	if(confirm("Supprimer la ligne ["+newIndice+"] de la table ["+nomTable+"] ?")){
		var tbody = Table.getElementsByTagName('tbody');
		var tr = tbody[0].getElementsByTagName('tr');
		tbody[0].removeChild(tr[newIndice]);
		Tables["EnsembleTable"][IDTable.id.toString()].supprimerLigne(newIndice);
		tbody = Table.getElementsByTagName('tbody');
		var btn = tbody[0].getElementsByClassName('btnSuprLigne');
		l--;
		var rev_it_nbligne = l;
		for(var i = 0 ; i < l ; i++){
			console.log(rev_it_nbligne);
			btn[i].firstChild.setAttribute('onclick', 'supprLigne(' + Table.id.toString() + ',' + rev_it_nbligne + ')');
			rev_it_nbligne--;
		}
	}
}
function createArray() {
	Tables.AjoutTable(new Table());
	NombreTable++;
	var output = document.getElementById('EmplacementTables');
	var divNew  = document.createElement('div');
	var divDrag  = document.createElement('div');
	var divTitre = document.createElement('input');
	var divBouton = document.createElement('div');
	divBouton.className = 'bcBouton';
	divTitre.disabled = true;
	divTitre.type = 'text';
	divTitre.className= 'nomTable';
	divTitre.value = Tables["EnsembleTable"]["table"+NombreTable].getNom();
	divTitre.minLength = '1';
	divTitre.maxLength = '20';
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
    divNew.appendChild(divTitre);
	divNew.appendChild(divRelation);
	var IDEmplacement="EmplacementTable"+StringID;
	divNew.id=IDEmplacement;
	DeplacementHauteur=120+NombreTable*100;
	divNew.style.top = DeplacementHauteur+'px';
	dragDrop.initElement(IDEmplacement);
	recupTable();
    Tables["EnsembleTable"]["table"+NombreTable].setTMin(divDrag.offsetWidth);
	thNew.getElementsByClassName('tri')[0].setAttribute('onclick',"Tables.EnsembleTable.table"+NombreTable+".tri(0,"+NombreTable+")");
	thNew.getElementsByClassName('reverseTri')[0].setAttribute('onclick',"Tables.EnsembleTable.table"+NombreTable+".triReverse(0,"+NombreTable+")");
	trNew.getElementsByClassName('suprCol')[0].setAttribute('onclick','supprColum('+IDTable+',0)');
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
	var tbody = table.getElementsByTagName('tbody');
	var tr = tbody[0].getElementsByTagName('tr');
	for(var i in tr){
		tr[i].className = 'btnLigne';
	}
    var col = table.getElementsByClassName('col');
    for(var n in col){
        col[n].className = 'col btn';
        if(col[n].tagName == 'TH'){
        	col[n].getElementsByClassName('tri')[0].setAttribute('onclick',"Tables.EnsembleTable.table"+IDTable+".tri("+n+","+IDTable+")");
			col[n].getElementsByClassName('reverseTri')[0].setAttribute('onclick',"Tables.EnsembleTable.table"+IDTable+".triReverse("+n+","+IDTable+")");
		}
    }
    var emplacement = document.getElementById('EmplacementTable'+IDTable);
	var titre = emplacement.getElementsByClassName('nomTable');
    titre[0].disabled = bloque;
    var relation = document.getElementById("EmplacementTable"+stringID);
	var bouton = relation.getElementsByClassName('boutonLock')[0];
	bouton.setAttribute('class','boutonUnlock')
	bouton.setAttribute('onclick',"sauvegarderModif("+IDTable+")");
}

function sauvegarderModif(IDTable){
    var emplacement = document.getElementById('EmplacementTable'+IDTable);
    var titre = emplacement.getElementsByClassName('nomTable');
    if(titre[0]===undefined){
        titre = emplacement.getElementsByClassName('nomTableErr');
    }
    if(titre[0].value.match(/^[A-Z0-9]*$/)){
        titre[0].className = 'nomTable';
        titre = emplacement.getElementsByClassName('nomTable');
        var stringID = IDTable.toString();
        var ID = "table" + IDTable;
        Tables["EnsembleTable"][ID].bloquer();
        var bloque = Tables["EnsembleTable"][ID].getBloquer();
        titre[0].disabled = bloque;
        var table = document.getElementById(ID);
        var th = table.getElementsByTagName('input');
        for (var i in th) {
            if (th[i].type === "text") {
                th[i].disabled = bloque;
            }
        }
        var tbody = table.getElementsByTagName('tbody');
        var tr = tbody[0].getElementsByTagName('tr');
        for (var i in tr) {
            tr[i].className = '';
        }
        var col = document.getElementsByClassName('col');
        for (var n in col) {
            col[n].className = 'col';
        }

        recuperationContenu(IDTable);
        var relation = document.getElementById("EmplacementTable" + stringID);
        var bouton = relation.getElementsByClassName('boutonUnlock')[0];
        bouton.setAttribute('class', 'boutonLock')
        bouton.setAttribute('onclick', "modification(" + IDTable + ")");
    }
    else{
        titre[0].className = 'nomTableErr';
        var msg = document.createElement('div');
        msg.className='msgErr';
        msg.innerHTML = "Le titre ne doit contenir que des caractères alpha-numérique en majuscule, ou underscores"
        emplacement.appendChild(msg);
        setTimeout(function(){
            emplacement.removeChild(msg);
            titre = emplacement.getElementsByClassName('nomTableErr');
            if(titre[0]===undefined)titre = emplacement.getElementsByClassName('nomTable');
            titre[0].className = 'nomTable';
        },5000);
    }
}
function recuperationContenu(IDTable){
	var ID = "table"+IDTable;
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
    if(titre[0].value === ""){
        Tables["EnsembleTable"][ID].attribuerNom(ID);
        titre[0].value = ID;
    }
    else {
        Tables["EnsembleTable"][ID].attribuerNom(titre[0].value);
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
		// recupTable();
	}
}

function reduction(IDTable){
	var ID="table"+IDTable;
	Tables["EnsembleTable"][ID].reduire();
	var table = document.getElementById("EmplacementTable"+IDTable);
	var divRelation = table.getElementsByClassName('relation');
	divRelation[0].style.display='none';
	var divDrag = table.getElementsByClassName('drag');
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

function afficheMsgErrReq() {
	var divErr = document.createElement('div');
	divErr.className = 'reqErr';
	divErr.innerHTML = 'Erreur dans la requête : Un problème est survenu\nIntersection : et ou AND ou Inter';
	var inpt = document.getElementById('envReq');
	document.body.insertBefore(divErr, inpt);
	setTimeout(function () {
		document.body.removeChild(divErr);
	}, 6000);
}

function affichageModele() {
	var listeModele = [];
	for(var noms in localStorage){
		if (noms === "key" || noms === "getItem" || noms === "setItem" || noms === "removeItem" || noms === "clear" || noms === "length") {
			continue;
		}
		listeModele.push(noms);
	}
    document.getElementById('envReq').addEventListener('click',function(){
        var intersection = /^([A-Z0-9]{1,20})\s(et)\s([A-Z0-9]{1,20})$/;
        var union = /^([A-Z0-9]{1,20})\s(ou)\s([A-Z0-9]{1,20})$/;
        var diff = /^([A-Z0-9]{1,20})\s(-)\s([A-Z0-9]{1,20})$/;
        var mult = /^([A-Z0-9]{1,20})\s(x)\s([A-Z0-9]{1,20})$/;
        var div = /^([A-Z0-9]{1,20})\s(\/)\s([A-Z0-9]{1,20})$/;
        var jointureNat = /^([A-Z0-9]{1,20})\s\[\s([A-Za-z]+)\s\]\s([A-Z0-9]{1,20})$/;
        var equiJointure = /^([A-Z0-9]{1,20})\s\[\s([A-Z0-9]{1,20})\.([A-Za-z]+)\s=\s([A-Z0-9]{1,20})\.([A-Za-z]+)\s\]\s([A-Z0-9]{1,20})$/;
        var tetaJointure = /^([A-Z0-9]{1,20})\s\[\s([A-Z0-9]{1,20})\.([A-Za-z]+)\s!=\s([A-Z0-9]{1,20})\.([A-Za-z]+)\s\]\s([A-Z0-9]{1,20})$/;
        var op =[intersection,union,diff,mult,div,jointureNat,equiJointure,tetaJointure];
        for(var i in op){
            var res = document.getElementById('requete').value.match(op[i]);
            if(res!=null){
                break;
            }
        }
		if(res===null){
			afficheMsgErrReq();
		}
		else {
			if(parseInt(i) >= 0 && parseInt(i) < 5) {
				var nomTable_1 = res[1];
				var nomTable_2 = res[3];
				if (Tables.getTableByLibelle(nomTable_1) == null) {
					afficheMsgErrReq();
					return;
				}
				if (Tables.getTableByLibelle(nomTable_2) == null) {
					afficheMsgErrReq();
					return;
				}

				if (Tables.getTableByLibelle(nomTable_1).getBloquer() == false) {
					alert('Veuillez enregistrer le contenu de la relation ' + nomTable_1 + ' en appuyant sur le cadenas');
					return;
				}
				if (Tables.getTableByLibelle(nomTable_2).getBloquer() == false) {
					alert('Veuillez enregistrer le contenu de la relation ' + nomTable_2 + ' en appuyant sur le cadenas');
					return;
				}
			}
			switch (parseInt(i)) {
				case 0: {
					createIntersection(Tables.getTableByLibelle(nomTable_1),Tables.getTableByLibelle(nomTable_2));
				}
					break;
				case 1: {
					createUnion(Tables.getTableByLibelle(nomTable_1),Tables.getTableByLibelle(nomTable_2));
				}
					break;
				case 2: {
					createDiff(Tables.getTableByLibelle(nomTable_1),Tables.getTableByLibelle(nomTable_2));
				}
					break;
				case 3: {
					produitCartesien(Tables.getTableByLibelle(nomTable_1),Tables.getTableByLibelle(nomTable_2));
				}
					break;
				case 4: {
					createDivision(Tables.getTableByLibelle(nomTable_1),Tables.getTableByLibelle(nomTable_2));
				}
					break;
				case 5: {
					createJointureNaturelle(Tables.getTableByLibelle(nomTable_1),Tables.getTableByLibelle(nomTable_2));
				}
					break;
				case 6: {
					if(res[1] != res[2] || res[4] != res[6]){
						console.log('ici');
						afficheMsgErrReq();
					}
					nomTable_1 = res[1];
					nomTable_2 = res[6];
					if (Tables.getTableByLibelle(nomTable_1) == null) {
						afficheMsgErrReq();
						return;
					}
					if (Tables.getTableByLibelle(nomTable_2) == null) {
						afficheMsgErrReq();
						return;
					}

					if (Tables.getTableByLibelle(nomTable_1).getBloquer() == false) {
						alert('Veuillez enregistrer le contenu de la relation ' + nomTable_1 + ' en appuyant sur le cadenas');
						return;
					}
					if (Tables.getTableByLibelle(nomTable_2).getBloquer() == false) {
						alert('Veuillez enregistrer le contenu de la relation ' + nomTable_2 + ' en appuyant sur le cadenas');
						return;
					}
					createEquiJointure(Tables.getTableByLibelle(nomTable_1),Tables.getTableByLibelle(nomTable_2),res[3],res[5]);
				}
					break;
				case 7: {
					console.log('teta-jointure');
					if(res[1] != res[2] || res[6] != res[4]){
						afficheMsgErrReq();
					}
					nomTable_1 = res[1];
					nomTable_2 = res[6];
					if (Tables.getTableByLibelle(nomTable_1) == null) {
						afficheMsgErrReq();
						return;
					}
					if (Tables.getTableByLibelle(nomTable_2) == null) {
						afficheMsgErrReq();
						return;
					}
					if (Tables.getTableByLibelle(nomTable_1).getBloquer() == false) {
						alert('Veuillez enregistrer le contenu de la relation ' + nomTable_1 + ' en appuyant sur le cadenas');
						return;
					}
					if (Tables.getTableByLibelle(nomTable_2).getBloquer() == false) {
						alert('Veuillez enregistrer le contenu de la relation ' + nomTable_2 + ' en appuyant sur le cadenas');
						return;
					}
					createTetaJointure(Tables.getTableByLibelle(nomTable_1),Tables.getTableByLibelle(nomTable_2),res[3],res[5]);
				}
					break;
				case 8: {
					console.log('projection');
				}
					break;
			}
		}
    });

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


function createJointureNaturelle(table1,table2) {
	var colonnePourJointureNaturelle = "";
	var positionTable1 = -1;
	var positionTable2 = -1;
	var boolJointurePossible=false;
	for(var i in table1.Entete){
		for(var j in table2.Entete){
			if(table1.Entete[i] === table2.Entete[j]){
				boolJointurePossible=true;
				positionTable1 = i.toString();
				positionTable2 = j.toString();
				colonnePourJointureNaturelle = table1.Entete[i];
			}
		}
	}
	if (!boolJointurePossible) {
		alert("Erreur jointure naturelle : pas de ligne en commun");
		return false;
	}
	var TableJointureNaturelle = new Table();
	var NomTable = table1.Libelle+"["+colonnePourJointureNaturelle+"]"+table2.Libelle;
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
	var tabR1 = [];
	var tabR2 = [];
	for (var i = 0, c = table1.getNombreLigne(); i < c; i++) {
		for (var j = 0, z = table2.getNombreLigne(); j < z; j++) {
			if (table1.Contenu[positionTable1][i] === table2.Contenu[positionTable2][j]) {
				var l1 = recupereLigne(table1,i);
				var l2 = recupereLigne(table2,j);
				l2.splice(0,1); // 1 A MODIFIER -> DYNAMIQUE
				tabR1.push(l1);
				tabR2.push(l2);
			}
		}
	}
	for (var i = 0, c = TableJointureNaturelle.getNombreColonne(); i < c; i++) {
		TableJointureNaturelle.Contenu["E"+i] = [];
	}
	var table1Length = table1.getNombreColonne();
	var tabR1Length = tabR1[0].length;
	for (var i = 0; i < tabR1Length; i++) {
		for (var j = 0; j < table1Length; j++) {
			var tmp = tabR1[i][j];
			TableJointureNaturelle.Contenu["E"+j][i]=tmp;
		}
	}
	var TableJoitNatLenght = TableJointureNaturelle.getNombreColonne();
	var tabR2Length = tabR2.length;
	for (var i = table1Length; i < TableJoitNatLenght; i ++) {
		for (var j = 0; j < tabR2Length; j++) {
			var pos = i-table1Length;
			var tmp = tabR2[j];
			TableJointureNaturelle.Contenu["E"+i][j]=tmp;
		}
	}
	TableJointureNaturelle.attribuerNom(NomTable);
	Tables.AjoutTable(TableJointureNaturelle);
	NombreTable++;
	tableToHTML(TableJointureNaturelle);
	return true;
}


function createTetaJointure(table1,table2,e_table1,e_table2){
	if(table1.constructor.name!="Table" || table2.constructor.name!="Table"){
        console.log("Erreur teta-jointure");
        return false;
    }

	var entete1presente = false;
	for (var i in table1.Entete) {
		if (table1.Entete[i] === e_table1) {
			entete1presente = true;
		}
	}
	if (!entete1presente) {
		alert("L'entete saisi n'est pas dans la table : "+table1.Libelle+".");
		return false;
	}

	var entete2presente = false;
	for (var i in table2.Entete) {
		if (table2.Entete[i] === e_table2) {
			entete2presente = true;
		}
	}
	if (!entete2presente) {
		alert("L'entete saisi n'est pas dans la table : "+table2.Libelle+".");
		return false;
	}

    var tableTetaJointure = new Table();
    tableTetaJointure.attribuerNom(table1.Libelle + "["+e_table1+" != "+e_table2+"]"+table2.Libelle);
    for (var i in table1.Entete) {
		tableTetaJointure.Entete[i] = table1.Entete[i];
	}
    var compteur = tableTetaJointure.getNombreColonne();
    for(var i in table2.Entete){
        var NomNouvelleEntree="E"+compteur;
        tableTetaJointure.Entete[NomNouvelleEntree]=table2.Entete[i];
        compteur++;
    }
    compteur = 0;
    for(var i in tableTetaJointure.Entete){
        var NomNouvelleEntree="E"+compteur;
        tableTetaJointure.Contenu[NomNouvelleEntree]=[];
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
            if(attEnteteCourant !== table2.Contenu[numEntTab2][n]){
              var newLigne = recupereLigne(table1,lTab1).concat(recupereLigne(table2,lTab2));
              tableTetaJointure.ajoutLigne(newLigne);
            }
            lTab2++;
        }
        lTab2 = 0;
        lTab1++;
    }
    Tables.AjoutTable(tableTetaJointure);
    NombreTable++;
    tableToHTML(tableTetaJointure);
	if(tableTetaJointure.getNombreLigne() === 0) {
		alert("Aucune ligne créé, elles sont toutes communes aux deux tables");
	}
    return true;
}


function createDivision(table1, table2) {
	if(table1.constructor.name!="Table" || table2.constructor.name!="Table"){
        console.log("Erreur division");
        return false;
    }
	if(table1.Contenu["E0"].length < table2.Contenu["E0"].length){
		alert("Erreur division, la relation dividende possède moins de ligne que la relation diviseur.");
		return false;
	}
	var EnteteCommun = true;
	var TableDivision = new Table();
	var compteur = 0;
	var positionEnt = -1;
	var tabPosition = [];
	var cpt = 0;
	for(var i in table1.Entete){
		var EnteteTrue = true;
        for(var j in table2.Entete){
			if(table1.Entete[i] === table2.Entete[j]){
				EnteteTrue = false;
				EnteteCommun = false;
				positionEnt = i;
				break;
			}
		}
		if (EnteteTrue) {
			TableDivision.Entete["E"+cpt] = table1.Entete[i];
			cpt++;
		}
		if (!EnteteTrue) {
			tabPosition.push(positionEnt);
		}
    }

	if (EnteteTrue) {
		console.log("Erreur division, les relations n'ont pas d'entete commune.");
		return false;
	}

	var diffColo = differenceColonne(table1, TableDivision);

	var testTab = [];
	console.log(diffColo);
	for (var i = 0, c = diffColo.getNombreLigne(); i < c; ++i) {
		var l1 = recupereLigne(diffColo, i);
		for (var j = 0, z = table2.getNombreLigne(); j < z; j++) {
			var l2 = recupereLigne(table2, j);
			if(JSON.stringify(l1) == JSON.stringify(l2)) {
				testTab.push(recupereLigne(table1,i));
			}
		}
	}
	Tables.suppressionTable("table"+NombreTable);
	var l2 = table2.getNombreLigne();
	var resultDivOccu = [];
	resultDivOccu = countOccurences(testTab, l2);

	var cpt = 0;
	for (var i in resultDivOccu) {
		TableDivision.Contenu["E0"][cpt] = resultDivOccu[i];
		cpt++;
	}
	Tables.AjoutTable(TableDivision);
    NombreTable++;
    tableToHTML(TableDivision);
    return true;
}


function countOccurences(tab, nbMax){
	var result = {};
	var res = [];
	// for (var i = 0; i < tab.length; i++) {
	for (var i in tab) {
		if(tab[i][0] in result){
			result[tab[i][0]] = ++result[tab[i][0]];
			if (result[tab[i][0]] === nbMax) {
				res.push(tab[i][0]);
			}
		}
		else{
			result[tab[i][0]] = 1;
			if (result[tab[i][0]] === nbMax) {
				res.push(tab[i][0]);
			}
		}
	}
	return res;
}









function differenceColonne(table1, table2){
	if(table1.constructor.name!="Table" || table2.constructor.name!="Table"){
        console.log("Erreur division");
        return false;
    }
	var TableDifferenceColonne = new Table();
	var positionEnt = 0;
	for(var i = 0, c = table1.getNombreColonne(); i < c; i++){
		var boolEstPresent=false;
		for(var j = 0, z = table2.getNombreColonne(); j < z; j++){
			if (table1.Entete["E"+i] === table2.Entete["E"+j]){
				boolEstPresent=true;
			}
		}
		if(!boolEstPresent){
			TableDifferenceColonne.Entete["E"+positionEnt] = table1.Entete["E"+i];
			TableDifferenceColonne.Contenu["E"+positionEnt] = table1.Contenu["E"+i];
			positionEnt++;
		}
	}
	var nbColonne = TableDifferenceColonne.getNombreColonne();
	for (var i = 1; i < nbColonne; i++) {
		TableDifferenceColonne.OrdreEntete.push("E"+i);
	}
	// console.log(TableDifferenceColonne.OrdreEntete);
	Tables.AjoutTable(TableDifferenceColonne);
    NombreTable++;
	if (differenceColonne.caller.name !== "createDivision") {
		tableToHTML(TableDifferenceColonne);
		return true;
	} else {
		return TableDifferenceColonne;
	}
}



function produitCartesien(table1, table2) {
	if(table1.constructor.name!="Table" || table2.constructor.name!="Table"){
        console.log("Erreur division");
        return false;
    }
	var tb1Colonne = table1.getNombreColonne();
	var tb2Colonne = table2.getNombreColonne();
	var addtb1tb2Colonne = tb1Colonne + tb2Colonne;

	var tb1Ligne = table1.getNombreLigne();
	var tb2Ligne = table2.getNombreLigne();
	var addtb1tb2Ligne = tb1Ligne * tb2Ligne;

	TableProduitCartesien = new Table();

	for (var i = 0; i < tb1Colonne; i++) {
		TableProduitCartesien.Entete["E"+i] = table1.Entete["E"+i];
		TableProduitCartesien.Contenu["E"+i] = [];
	}
	for (var i = tb1Colonne; i < addtb1tb2Colonne; i++) {
		TableProduitCartesien.Entete["E"+i] = table2.Entete["E"+(i-tb1Colonne)];
		TableProduitCartesien.Contenu["E"+i] = [];
	}
	for (var i = 0; i < tb1Ligne; i++) {
		var ltb1 = recupereLigne(table1, i);
		for (var j = 0; j < tb2Ligne; j++) {
			TableProduitCartesien.ajoutLigne(ltb1);
		}
	}
	var h = 0;
	for (var k = 0; k < tb1Ligne; k++) {

		for (var i = 0; i < tb2Colonne; i++) {
			for (var j = 0; j < tb2Ligne; j++) {
				TableProduitCartesien.Contenu["E"+(i+tb1Colonne)][j+h]=table2.Contenu["E"+i][j];
			}
		}
		h += tb2Ligne;
	}
	Tables.AjoutTable(TableProduitCartesien);
    NombreTable++;
	if (produitCartesien.caller.name !== "createDivision") {
		tableToHTML(TableProduitCartesien);
		return true;
	} else {
		console.log("Test ok");
		return TableProduitCartesien;
	}
}

// La division n'est pas une opération de base, elle peut être réécrite
// en combinant le produit, la restriction et la différence.
// R ÷ S = (T1 - T2) avec :
// -> T1 = PROJECTION(R-S, (R))
// -> T2 = PROJECTION(R-S ,(T1 X S) - R)
/*
function createDivision(table1, table2){
	if(table1.constructor.name!="Table" || table2.constructor.name!="Table"){
        console.log("Erreur division");
        return false;
    }
	var T1 = new Table();
	T1 = differenceColonne(table1, table2);
	// console.log(T1);
	
	var PT1 = new Table();
	for(var i = 0, c = T1.getNombreLigne(); i < c; i++){
		var ligneCourante=recupereLigne(T1,i);
		var boolEstPresent=false;
		for(var j = 0, z = PT1.getNombreLigne(); j < z; j++){
			if(JSON.stringify(ligneCourante)==JSON.stringify(recupereLigne(PT1,j))){
				boolEstPresent=true;
			}
		}
		if(!boolEstPresent){
			PT1.ajoutLigne(ligneCourante);
		}
	}
	// console.log(PT1);
	
	var PT1xS = new Table();
	PT1xS = produitCartesien(table2, PT1);
	// console.log(PT1xS);
	
	var PT1xS_R = new Table();
	
	PT1xS.Entete["E1"] = "B";
	
	PT1xS_R = createDiff(PT1xS, table1);
	console.log(PT1xS_R);
	
	// var nvRes = new Table();
	// for(var i = 0, c = PT1xS_R.getNombreLigne(); i < c; i++){
		// var ligneCourante=recupereLigne(PT1xS_R,i);
		// var boolEstPresent=false;
		// for(var j = 0, z = T2.getNombreLigne(); j < z; j++){
			// if(JSON.stringify(ligneCourante)==JSON.stringify(recupereLigne(T2,j))){
				// boolEstPresent=true;
			// }
		// }
		// if(!boolEstPresent){
			// T2.ajoutLigne(ligneCourante);
		// }
	// }
	
	for (var i = 0, c = PT1xS_R.getNombreLigne(); i < c; i++){
		var ent = PT1xS_R.Contenu["E0"];
		var boolEstPresent=false;
		for(var j = 0, z = table2.getNombreLigne(); j < z; j++){
			if(PT1xS_R.Contenu["E0"][i]===table2.Contenu["E0"][j]){
				boolEstPresent=true;
			}
		}
		if(!boolEstPresent){
			supprLigne(,i);
		}
	}
	
	
	
	var T2 = new Table();
	for(var i = 0, c = PT1xS_R.getNombreLigne(); i < c; i++){
		var ligneCourante=recupereLigne(PT1xS_R,i);
		var boolEstPresent=false;
		for(var j = 0, z = T2.getNombreLigne(); j < z; j++){
			if(JSON.stringify(ligneCourante)==JSON.stringify(recupereLigne(T2,j))){
				boolEstPresent=true;
			}
		}
		if(!boolEstPresent){
			T2.ajoutLigne(ligneCourante);
		}
	}
	// console.log(T1);
	// console.log(T2);
	
	// var T = new Table();
	
	
	
	// T = createDiff(T1, T2);
	
	// console.log(T);
	// Tables.AjoutTable(T);
    // NombreTable++;
	// tableToHTML(T);
	return true;
}*/


