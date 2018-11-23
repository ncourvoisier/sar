function recupValeur(){
val1=document.forms["Requete"].elements["Table1"].value;
console.log("Valeur premiere table ="+val1);

op=document.forms["Requete"].elements["operateur"].value;
console.log("Valeur operateur ="+op);

val2=document.forms["Requete"].elements["Table2"].value;
console.log("Valeur deuxieme table ="+val2);
}
