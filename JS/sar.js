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