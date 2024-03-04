const ruleBtn = document.querySelector('.rule-btn')
const modalSec = document.querySelector('.modal')
const crossBtn = document.querySelector('.cross')

const middleArea = document.querySelector('.middle')
const afterSelection = document.querySelector('.after-selection')
const upperArea = document.querySelector('.upper')

const ruleH = document.querySelector('.rule-btn-a')
const crossH = document.querySelector('.cross-a')
const playH = document.querySelector('.play-a')

const nextBtn = document.querySelector('.next')

const pcScoreBoard = document.querySelector('.pc-score')
const userScoreBoard = document.querySelector('.user-score')

const playAgain = document.querySelector('.play-again')
const rockBtn = document.querySelector('.rock')
const paperBtn = document.querySelector('.paper')
const scissorBtn = document.querySelector('.scissor')
const upDiv = document.querySelector('.up')

let totalArr = localStorage.getItem("data") !==null ? JSON.parse(localStorage.getItem("data")) : [0,0]

if(pcScoreBoard && userScoreBoard){
    pcScoreBoard.textContent = totalArr[1]
    userScoreBoard.textContent = totalArr[0]
}




//!============================================ HOME PAGE SCENARIO ==============================================================

if(upDiv)
upDiv.addEventListener("click",(e)=>{
    if(e.target.parentElement.classList.contains("rock") || e.target.parentElement.classList.contains("paper") || e.target.parentElement.classList.contains("scissor")){
        middleArea.classList.add("hideModal")
        // afterSelection.classList.remove("hideModal")

        let userSelected = e.target.parentElement.getAttribute('value')

        let newDiv = document.createElement("div");
        newDiv.innerHTML = generateTemplate(userSelected)

        // console.log( middleArea.parentNode.children[1])
        middleArea.parentNode.replaceChild(newDiv, middleArea.parentNode.children[1]);
    }
})



function generateTemplate(userSelect){

    const newD = document.createElement("div");
   
    let fileName ;
    let imgSrc ;
        
        const all = document.querySelectorAll('.up>div')
        let randomDiv = Math.floor(Math.random()*2)
            if(all[randomDiv].classList.contains("up-up")){
                const upup = document.querySelector('.up-up')
                const arr = [1,6]
                let insiderandom = Math.floor(Math.random()*2)
                let upDivs = upup.querySelectorAll("div")
                
                newD.innerHTML = upDivs[arr[insiderandom]].innerHTML
                imgSrc = newD.querySelector("img").src
                fileName = imgSrc.split('/').pop().split('.')[0];
 
            }
            else{
                newD.innerHTML = all[randomDiv].innerHTML
                imgSrc = newD.querySelector("img").src
                fileName = imgSrc.split('/').pop().split('.')[0];
    
            }

    return `
            <section class="after-selection">

               ${displayResult(userSelect,fileName,newD.innerHTML)}
        
            </section>`
}




if(ruleBtn)
ruleBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    modalSec.classList.remove("hideModal")
})

if(crossBtn)
crossBtn.addEventListener("click",event=>{
    event.preventDefault()
    modalSec.classList.add("hideModal")
})

function myPageReload(){
    location.reload()
    
}


//!===================================== CONDITIONS for WIN DRAW AND LOSSE ===============================================


function displayResult(userSelection,compSelect,newD){
    if(userSelection==="rock" && compSelect==="rock"){
        nextBtn.classList.add("hideModal")
        return draw(userSelection,compSelect,newD)
        
    }
    else if(userSelection==="rock" && compSelect==="paper"){
        nextBtn.classList.add("hideModal")

        totalArr[1] =totalArr[1]+5
        pcScoreBoard.textContent = totalArr[1]
        localStorage.setItem("data",JSON.stringify(totalArr))
        
        return pcWin(userSelection,compSelect,newD)
       
    }else if(userSelection==="rock" && compSelect==="scissor"){
        

        totalArr[0] = totalArr[0]+5
        userScoreBoard.textContent = totalArr[0]
        localStorage.setItem("data",JSON.stringify(totalArr))

        return userWin(userSelection,compSelect,newD)

       
    }else if(userSelection==="paper" && compSelect==="scissor"){
        nextBtn.classList.add("hideModal")

        totalArr[1] = totalArr[1]+5
        pcScoreBoard.textContent = totalArr[1]
        localStorage.setItem("data",JSON.stringify(totalArr))

        return pcWin(userSelection,compSelect,newD)

    }else if(userSelection==="paper" && compSelect==="rock"){
        nextBtn.classList.add("hideModal")

        totalArr[0] = totalArr[0]+5
        userScoreBoard.textContent = totalArr[0]
        localStorage.setItem("data",JSON.stringify(totalArr))

        return userWin(userSelection,compSelect,newD)

    }else if(userSelection==="paper" && compSelect==="paper"){
        nextBtn.classList.add("hideModal")

        return draw(userSelection,compSelect,newD)

    }else if(userSelection==="scissor" && compSelect==="scissor"){
        nextBtn.classList.add("hideModal")

        return draw(userSelection,compSelect,newD)

    }else if(userSelection==="scissor" && compSelect==="rock"){
        nextBtn.classList.add("hideModal")

        totalArr[1] = totalArr[1]+5
        pcScoreBoard.textContent = totalArr[1]

        localStorage.setItem("data",JSON.stringify(totalArr))

        return pcWin(userSelection,compSelect,newD)

    }else if(userSelection==="scissor" && compSelect==="paper"){
        nextBtn.classList.remove("hideModal")

        totalArr[0] = totalArr[0]+5
        userScoreBoard.textContent = totalArr[0]
        localStorage.setItem("data",JSON.stringify(totalArr))

        return userWin(userSelection,compSelect,newD)
    }
}


//!========================================= DRAW --- YOU WIN --- PC WIN ===========================================================



function draw(userSelection,compSelect,newD){

    return `     

                <p class="choicel">YOU PICKED </p>
                <div class="paperr ${userSelection}s"  name="${userSelection}" value="${userSelection}">
                         
                        <img src="./images/${userSelection}.png" alt="">
                </div>
                     
                
                <div class="display-result">
                    <p>TIE UP</p>
                    
                    <button onclick="myPageReload()" class="play-again">REPLAY</button>
                </div>
                <p class="choicer">PC PICKED </p>
                <div class="paperr ${compSelect}s" value="${compSelect}" >
                        
                        ${newD}
                </div>
               
                
                `
}

function userWin(userSelection,compSelect,newD){
    
    nextBtn.classList.remove("hideModal")

    return `<p class="choicel">YOU PICKED </p>
            <div class="fl">
            
                <div class="sl">
                    <div class="tl">
                        <div class="paperr ${userSelection}s"  name="${userSelection}" value="${userSelection}">
                         
                        <img src="./images/${userSelection}.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="display-result">
                <p>YOU WIN</p>
                <p>AGAINST PC</p>
                <button onclick="myPageReload()" class="play-again">PLAY AGAIN</button>
            </div>
            <p class="choicer">PC PICKED </p>
            <div class="paperr ${compSelect}s" value="${compSelect}" >
            
                        ${newD}
            </div>
            
            `
}

function pcWin(userSelection,compSelect,newD){
    return `
            <p class="choicel">YOU PICKED </p> 
            <div class="paperr ${userSelection}s"  name="${userSelection}" value="${userSelection}">
            
            <img src="./images/${userSelection}.png" alt="">
            </div>
    
            <div class="display-result">
                <p>YOU LOST</p>
                <p>AGAINST PC</p>
                <button onclick="myPageReload()" class="play-again">PLAY AGAIN</button>
            </div>
            <p class="choicer">PC PICKED </p>
            <div class="fl">
                <div class="sl">
                    <div class="tl">
                    
                        <div class="paperr ${compSelect}s" value="${compSelect}" >
                        
                            ${newD}
                        </div>
                    </div>
                </div>
            </div>
            
            `
}


//!================================================= HURRAY PAGE SCENARIO==================================================

if(ruleH){
    ruleH.addEventListener("click",(e)=>{
        modalSec.classList.remove("hideModal")
    })
    
    crossH.addEventListener("click",(e)=>{
        modalSec.classList.add("hideModal")
    })
}






























