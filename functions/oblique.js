
const obliqueScreen= `
<div class= "obliqueMainScreen">
</div>
`


$(document).ready(()=>{
    const obliqueMainScreen= document.createElement("div")
    obliqueMainScreen.innerHTML= obliqueScreen


    document.body.appendChild(obliqueMainScreen)
})