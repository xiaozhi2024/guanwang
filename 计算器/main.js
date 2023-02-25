let f=document.getElementById('h1')
let a=''
let d=''
function num(o){
    a+=o
    f.innerHTML=a
    d=o
}
function dengyu(){
    f.innerHTML=eval(a)
}
function c(){
    a=''
    f.innerHTML=a
}
function tui(){
    a=a.substring(0,a.length -1)
    f.innerHTML=a
}