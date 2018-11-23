function recupValeur(){
val1=document.forms["Requete"].elements["Table1"].value;
document.forms["Requete"].elements["Table1"].value=0;
console.log("Valeur premiere table ="+val1);

op=document.forms["Requete"].elements["operateur"].value;
document.forms["Requete"].elements["operateur"].value=0;
console.log("Valeur operateur ="+op);

val2=document.forms["Requete"].elements["Table2"].value;
document.forms["Requete"].elements["Table2"].value=0;
console.log("Valeur deuxieme table ="+val2);
}
