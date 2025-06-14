const di = document.querySelector('.debuginfo')
fetch('/debuginfo.html')
.then(res=>res.text())
.then(data=>{
    di.innerHTML=data
})