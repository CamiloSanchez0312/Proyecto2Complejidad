% Use this editor as a MiniZinc scratch book
%include "datos.dzn";
float: CapT;
float: CapN;
float: CapH;
float: Ct;
float: Ch;
float: Cn;
int: n;
int: S;
var float: f;
array[1..S,1..n]of float: dsi;
float: CapTotal = CapT + CapN + CapN;
array[1..n] of var float: Hi;
array[1..n] of var float: Ni;
array[1..n] of var float: Ti;
constraint forall(i in 1..n)(Hi[i]>=0);
constraint forall(i in 1..n)(Ni[i]>=0);
constraint forall(i in 1..n)(Ti[i]>=0);
constraint forall(i in 1..n)(Ti[i] <= CapT);
constraint forall(i in 1..n)(Ni[i] <= CapN);
constraint forall(i in 1..n)(Hi[i]<= CapH);
constraint forall(i in 1..n)(Hi[i] + Ti[i] + Ni[i] >= sum(s in 1..S)(dsi[s,i]));
f= sum(i in 1..n)(Hi[i]*Ch + Ti[i]*Ct + Ni[i]*Cn);
solve minimize f;
output ["Hi:", show(Hi), "Ni:", show(Ni),"Ti:",show(Ti) ,"f:", show(f)];
%http://paolodragone.com/pymzn/tutorial.html
