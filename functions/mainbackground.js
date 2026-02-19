const popupBackGround = document.createElement("div")
popupBackGround.className = "alPopupBackground"


const albackstyle = document.createElement("style")

albackstyle.innerHTML = `
.alPopupBackground{
    height: 100vh;
    width: 100%;
    background-color: black;
    opacity: .8;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display:none
}
`



document.body.appendChild(popupBackGround)
document.head.appendChild(albackstyle)