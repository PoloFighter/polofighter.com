const di = document.querySelector('.debuginfo')
fetch('https://polofighter.github.io/polofighter.com/debuginfo.html')
.then(res=>res.text())
.then(data=>{
    di.innerHTML=data
})