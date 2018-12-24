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
function createLine(IDTable){
	var output = document.getElementById('table1'),trs;
	console.log(output);
	var trNew  = document.createElement('tr');

	var Colonnes=output.getElementsByClassName('col');
	var nbColonnes=Colonnes.length;


	for (var i = 0; i < nbColonnes; i++) {
		var td = document.createElement('td');
		td.appendChild(document.createTextNode('Défaut'));
		trNew.appendChild(td);	
    }
	//trNew.appendChild(tdDevs);
	//trNew.appendChild(tdPart);

	if (output) {
	    trs = output.getElementsByTagName('tr');

	    if (trs[1]) { // Le <tr> de Chrome
	        trs[1].parentNode.insertBefore(trNew, trs[1]);
	    }
	}
}
function createColumn(IDTable){
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