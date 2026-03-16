fetch(API_URL)
.then(r=>r.json())
.then(data=>{

document.getElementById("target").innerHTML =
"目標額 : "+data.target+"円"

document.getElementById("total").innerHTML =
"現在額 : "+data.total+"円"

const rate = Math.round(data.total/data.target*100)

document.getElementById("rate").innerHTML =
"達成率 : "+rate+"%"

document.getElementById("support-count").innerHTML =
"支援者数 : "+data.supporters.length+"人"



new Chart(
document.getElementById("money-chart"),
{
type:"bar",

data:{
labels:["支援状況"],
datasets:[
{
label:"支援額",
data:[data.total],
backgroundColor:"#00aa66"
},
{
label:"残り",
data:[data.target-data.total],
backgroundColor:"#ddd"
}
]
},

options:{
indexAxis:"y",
plugins:{
legend:{
position:"bottom"
}
}
}

}
)



let s=""
data.supporters.forEach(n=>{
s+="<li>"+n+"様</li>"
})
document.getElementById("supporters").innerHTML=s



let items=""
data.items.forEach(i=>{
items+=`
<tr>
<td>${i.name}</td>
<td>${i.support}</td>
<td>${i.buy}</td>
<td>${i.total}</td>
</tr>
`
})
document.getElementById("items").innerHTML=items



let uses=""
data.uses.forEach(u=>{

const d=new Date(u.date)
const date =
d.getFullYear()+"/"+
(d.getMonth()+1)+"/"+
d.getDate()

uses+=`
<tr>
<td>${date}</td>
<td>${u.item}</td>
<td>${u.use}</td>
<td>${u.price}</td>
</tr>
`
})

document.getElementById("uses").innerHTML=uses



let news=""

data.news.forEach(n=>{

const d=new Date(n.date)
const date =
d.getFullYear()+"/"+
(d.getMonth()+1)+"/"+
d.getDate()

news+=`<li>${date} ${n.text}</li>`

})

document.getElementById("news").innerHTML=news



if(data.popup){

document.getElementById("popup-text").innerText=data.popup
document.getElementById("popup").classList.remove("hidden")

}

document.getElementById("popup-close").onclick=()=>{
document.getElementById("popup").classList.add("hidden")
}

})
