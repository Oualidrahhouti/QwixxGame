let body=document.getElementsByTagName("body")[0]
let title=document.createElement("h1")
title.innerText="Quixx Oualid RAHHOUTI"
let resetSessionBtn=document.createElement("button")
resetSessionBtn.innerText="Réinitialiser"
body.appendChild(title)
body.appendChild(resetSessionBtn)
let playLines=[]
let penaltiesLine=document.createElement("div")
let scoresLine=document.createElement("div")
let scores=[0,0,0,0]
let penaltiesScores=[0,0,0,0]
let penaltiesClicked=[false,false,false,false]
let numOfPlayerDone=0
let gameOver=false
//Create Play Lines
for(let i=0;i<4;i++)
    playLines.push(document.createElement("div"))
//Create Play Lines's Elements
playLines.forEach((element,i)=>{
    if(i<2)
    {
        for(let j=2;j<13;j++)
            CreateNumberDiv(element,j) 
        CreateNumberDiv(element,"x")
    }
    else
    {
        for(let j=12;j>1;j--)
            CreateNumberDiv(element,j)
        CreateNumberDiv(element,"x")
    }        
})
//Create Penalties Line's elements
for(let i=0;i<2;i++)
    penaltiesLine.appendChild(document.createElement("div"))
for(let i=0;i<4;i++)
    penaltiesLine.childNodes[1].appendChild(document.createElement("div"))
//Create Scores Line's elements
for(let i=0;i<6;i++)
    scoresLine.appendChild(document.createElement("div"))

//Set Style to reset Btn
resetSessionBtn.style.borderRadius=".3em"
resetSessionBtn.style.width="8em"
resetSessionBtn.style.backgroundColor="#0a0a23"
resetSessionBtn.style.color="white"
resetSessionBtn.style.marginBottom="1em"
resetSessionBtn.style.aspectRatio="5/2"

//Handle resetSessionBtn Click
resetSessionBtn.addEventListener("click",()=>{
    sessionStorage.clear()
    location.reload()
})





//Set Style to elements with numbers

playLines.forEach((line,i)=>{
   if(i==0)
        line.childNodes.forEach((element)=>{
            SetStandardNodeStyle(element,"red","lightcoral")
        })
    else if(i==1)
        line.childNodes.forEach((element)=>{
            SetStandardNodeStyle(element,"yellow","Khaki")
        })
    else if(i==2)
        line.childNodes.forEach((element)=>{
            SetStandardNodeStyle(element,"green","Lime")
        })
    else
        line.childNodes.forEach((element)=>{
            SetStandardNodeStyle(element,"blue","PaleTurquoise")
        })
})
//Set Disabled Color to play lines's elements
playLines.forEach((line)=>{
    
})




//Set Style To Penalties Line's elements
penaltiesLine.children[1].childNodes.forEach((element,i)=>{
        SetStandardNodeStyle(element,"black","Gainsboro")
})
SetStandardNodeStyle(penaltiesLine.childNodes[0],"black","white")
penaltiesLine.style.gap="3em"
penaltiesLine.children[0].innerText="Pénalités"
penaltiesLine.children[0].style.color="black"
penaltiesLine.children[0].style.aspectRatio="6/1"
penaltiesLine.children[0].style.alignItems="flex-start"
penaltiesLine.children[1].style.aspectRatio="13/1"
penaltiesLine.children[1].style.display="flex"
penaltiesLine.children[1].style.height="2.1em"
penaltiesLine.children[1].style.justifyContent="space-between"

//Set Style to Score line's elements
scoresLine.childNodes.forEach((element)=>{
    SetStandardNodeStyle(element,"black","white")
    element.style.aspectRatio="1.96/1"
    element.innerText="0"
    element.style.color="red"
})
scoresLine.style.display="flex"
scoresLine.style.gap=".2em"





//Create a css class to align lines's elements
playLines.forEach((element)=>{
    element.classList.add("lines")
})
penaltiesLine.classList.add("lines")




let linesStyle=document.createElement("style")
linesStyle.innerHTML=`
    .lines{
        display:flex;
        gap:1em;
    }
    .disabled
    {
        background-color:black; 
    }
`
document.head.appendChild(linesStyle)
//Set Body Style

body.style.width="80%"

body.style.margin="auto"






//Set Nodes Standard's Style
function SetStandardNodeStyle(element,borderColor,BGColor)
{
    element.style.border="solid 1px "+borderColor
    element.style.backgroundColor=BGColor
    element.style.borderRadius="0.3em"
    element.style.color="white"
    element.style.aspectRatio="4/5"
    element.style.height="2.5em"
    element.style.display="flex"
    element.style.justifyContent="center"
    element.style.alignItems="center"
    element.style.fontSize="2em"
}

//Load Session Data
if(sessionStorage.getItem("scores")!=null)
{
       window.addEventListener("load",()=>{
        if(sessionStorage.getItem("lastRedNodeClicked")!=null)
            disablePreviousSiblings(playLines[0].childNodes[sessionStorage.getItem("lastRedNodeClicked")])
        if(sessionStorage.getItem("lastYellowNodeClicked")!=null)
            disablePreviousSiblings(playLines[1].childNodes[sessionStorage.getItem("lastYellowNodeClicked")])
        if(sessionStorage.getItem("lastGreenNodeClicked")!=null)
            disablePreviousSiblings(playLines[2].childNodes[sessionStorage.getItem("lastGreenNodeClicked")])
        if(sessionStorage.getItem("lastBlueNodeClicked")!=null)
            disablePreviousSiblings(playLines[3].childNodes[sessionStorage.getItem("lastBlueNodeClicked")])

    })
    scores=sessionStorage.getItem("scores").split(',').map((element)=>{
        return parseInt(element)
    })
    penaltiesScores=sessionStorage.getItem("penaltiesScores").split(',').map((element)=>{
        return parseInt(element)
    })
    numOfPlayerDone=Number(sessionStorage.getItem("numOfPlayerDone"))
    gameOver=sessionStorage.getItem("gameOver")==="true"?true:false
    penaltiesClicked=sessionStorage.getItem("penaltiesClicked").split(',').map((element)=>{
        return element==="true"
    })
    updateScore()
}







//Closure to calculate clicks for each line and save the index of last node clicked of each line in session
function countClick()
{
    let redLine=sessionStorage.getItem("redLine")!=null?sessionStorage.getItem("redLine"):0
    let yellowLine=sessionStorage.getItem("yellowLine")!=null?sessionStorage.getItem("yellowLine"):0
    let greenLine=sessionStorage.getItem("greenLine")!=null?sessionStorage.getItem("greenLine"):0
    let blueLine=sessionStorage.getItem("blueLine")!=null?sessionStorage.getItem("blueLine"):0
    function manageClick(color,index)
    {
        if(color=="red")
        {
            redLine++
            sessionStorage.setItem("redLine",redLine)
            sessionStorage.setItem("lastRedNodeClicked",index)
            scores[0]=redLine*(redLine+1)/2
            return redLine
        }
            
        if(color=="yellow")
        {
            yellowLine++
            sessionStorage.setItem("yellowLine",yellowLine)
            sessionStorage.setItem("lastYellowNodeClicked",index)
            scores[1]=yellowLine*(yellowLine+1)/2
            return yellowLine
        }
            
        if(color=="green")
        {
            greenLine++
            sessionStorage.setItem("greenLine",greenLine)
            sessionStorage.setItem("lastGreenNodeClicked",index)
            scores[2]=greenLine*(greenLine+1)/2
            return greenLine
        }
            
        if(color=="blue")
        {
            blueLine++
            sessionStorage.setItem("blueLine",blueLine)
            sessionStorage.setItem("lastBlueNodeClicked",index)
            scores[3]=blueLine*(blueLine+1)/2
            return blueLine
        }    
    }
    return manageClick
}
let countClickClosure=countClick()



//Append Elements Into Body
playLines.forEach((element)=>{
    body.appendChild(element)
})
body.appendChild(penaltiesLine)
body.appendChild(scoresLine)

//Create Divs with an inner number in a parent element
function CreateNumberDiv(parent,number)
{
    let div=document.createElement("div")
    fillWithNumber(div,number)
    parent.appendChild(div)
}

function fillWithNumber(element,number)
{
    if(element.tagName!="DIV")
        return
    element.innerText=number
}


// Handle Play Lines Click 
playLines.forEach((element)=>{
    element.childNodes.forEach((b)=>{
        if(b.innerText!="x")
            b.addEventListener("click",clickHandler)
    })
})
playLines[0].children[0].classList.add(".disabled")
//Play Lines click function
function clickHandler(event)
{
    if(!gameOver)
    {
        let clickedNode=event.target
        //Count Clicks and check if we need to enable the 'x' element
        if(countClickClosure(clickedNode.style.borderColor,
            Array.from(clickedNode.parentNode.children).indexOf(clickedNode))==5)
        {
            //activate last node
            let currentNode=clickedNode
            while(currentNode.nextSibling!=null)
                currentNode=currentNode.nextSibling
            currentNode.addEventListener("click",clickHandler)
        }
        //Count the clicks of last nodes and check if the game is over
        if(clickedNode.innerText=="x")
            {
                numOfPlayerDone++
                if(numOfPlayerDone==2){
                    gameOver=true
                    alert("Game Over !")
                }
                    
            }
        //Disable previous siblings
        let previousSibling=clickedNode
        disablePreviousSiblings(previousSibling)
        //Update Score
        updateScore()
    }
}

//Handle Penalties Line clicks
penaltiesLine.childNodes[1].childNodes.forEach((element,i)=>{
    element.addEventListener("click",()=>{
        if(!gameOver)
        {
            penaltiesScores[i]+=5
            penaltiesClicked[i]=true
            //if 2 different penalties were clicked, finish the game !
            if(penaltiesClicked.filter((element)=>{
                return element==true
            }).length>1)
                {
                    gameOver=true
                    alert("Game Over !")
                }
            updateScore()
        }
    })
})



//Disable previous siblings
function disablePreviousSiblings(element)
{
    while(element!=null)
            {
                element.removeEventListener("click",clickHandler)
                element=element.previousSibling
            }
}

//update scores view and data in session
function updateScore()
{
    
    sessionStorage.setItem("scores",scores)
    sessionStorage.setItem("penaltiesClicked",penaltiesClicked)
    sessionStorage.setItem("penaltiesScores",penaltiesScores)
    sessionStorage.setItem("numOfPlayerDone",numOfPlayerDone)
    sessionStorage.setItem("gameOver",gameOver)
    scoresLine.childNodes.forEach((element,i)=>{
        if(i<4)
            element.innerText=scores[i]-penaltiesScores[i]
    })
    let penaltiesSum=penaltiesScores.reduce((accumulator,current)=>{
        return accumulator+current
    })
    let scoresSum=scores.reduce((accumulator,current)=>{
        return accumulator+current
    })
    let total=scoresSum-penaltiesSum
    scoresLine.childNodes[4].innerText=penaltiesSum
    scoresLine.childNodes[5].innerText=total
}


