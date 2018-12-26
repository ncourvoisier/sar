var NombreTable=1;

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
function createArrayCedric() {
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
}
function createArray() {

    var nbLigne = prompt('Création d\'un nouveau tableau','nb ligne');
    //console.log(nbLigne);

    var grille = new Array();
    for(var i=0; i<nbLigne; i++){
        grille[i] = new Array();
        //alert("Case "+ i + "-" + j +" : "+ grille[i][j]);
    }

    var ent = prompt('Saisir le nom des attribut','clé,...');
    var line = new Array();
    line = ent.split(' ');
    var szLine = line.length;
    for (var i=0; i<szLine; i++) {
        console.log(line[i]);
    }

    /*var line1 = ["clé", "att1", "att2", "att3"];
    var line2 = ["0", "val1", "val2", "val3"];

    for (var i=0; i<2; i++) {
        for (var j=0; j<4; j++) {
            if (i === 0) {
                grille[i][j] = line1[j];
                continue;
            }
            grille[i][j] = line2[j];
        }
    }

    for (var i=0; i<2; i++) {
        for (var j=0; j<4; j++) {
            console.dir(grille[i][j]);
        }
        console.log("\n");
    }*/


}