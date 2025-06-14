let dark = false;
let theme = document.getElementById('theme');
let logo = document.getElementById('logo');
let ht1 = document.getElementById('hitem1')
let ht2 = document.getElementById('hitem2')
let ht3 = document.getElementById('hitem3')
const services = document.getElementById('intersection1');
const target = document.getElementById('header');
     const observer = new IntersectionObserver((entries) => { entries.forEach(entry => {
        if (entry.isIntersecting)
        { target.style.backgroundColor = 'rgba(255,255,255,0.8)';
            ht1.style.color = 'var(--dark-blue)';
            ht2.style.color = 'var(--dark-blue)';
            ht3.style.color = 'var(--dark-blue)';
            theme.setAttribute("src", "res/stars.svg");
            dark = false;
        } else {
        target.style.backgroundColor = 'var(--yellow)';
        ht1.style.color = 'var(--dark-blue)';
        ht2.style.color = 'var(--dark-blue)';
        ht3.style.color = 'var(--dark-blue)';
        logo.setAttribute("src", "res/logodark.svg")
     }
        });
    }); 
observer.observe(services);
function themeChange() {
    if (dark) { 
        console.log("False");
        theme.setAttribute("src", "res/stars.svg");
        target.style.backgroundColor = 'var(--yellow)';
        ht1.style.color = 'var(--dark-blue)';
        ht2.style.color = 'var(--dark-blue)';
        ht3.style.color = 'var(--dark-blue)';
        logo.setAttribute("src", "res/logo light.svg")
        logo.style.filter = "unset";
        dark = false;
    } else {
        console.log("True");
        theme.setAttribute("src", "res/sun.svg");
        target.style.backgroundColor = 'var(--deep-dark-blue)';
        ht1.style.color = 'var(--yellow)';
        ht2.style.color = 'var(--yellow)';
        ht3.style.color = 'var(--yellow)';
        logo.setAttribute("src", "res/logodark.svg")
        dark = true;
    }
}
theme.onclick = themeChange
