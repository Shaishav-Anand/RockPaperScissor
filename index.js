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

let totalArr = localStorage.getItem("data") !==null ? JSON.parse(localStorage.getItem("data")) : [0,0]

let userPoints = 0
let pcPoints = 0 

// console.log(totalArr)




if(ruleH){
    ruleH.addEventListener("click",(e)=>{
        modalSec.classList.remove("hideModal")
    })
    
    crossH.addEventListener("click",(e)=>{
        modalSec.classList.add("hideModal")
    })
}



ruleBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    modalSec.classList.remove("hideModal")
    // console.log("HOME RULE")
})

crossBtn.addEventListener("click",event=>{
    event.preventDefault()
    modalSec.classList.add("hideModal")
})

const playAgain = document.querySelector('.play-again')
const rockBtn = document.querySelector('.rock')
const paperBtn = document.querySelector('.paper')
const scissorBtn = document.querySelector('.scissor')
const upDiv = document.querySelector('.up')

function myPageReload(){
    location.reload()
    
}


upDiv.addEventListener("click",(e)=>{
    if(e.target.parentElement.classList.contains("rock") || e.target.parentElement.classList.contains("paper") || e.target.parentElement.classList.contains("scissor")){
        middleArea.classList.add("hideModal")
        // afterSelection.classList.remove("hideModal")

        let userSelected = e.target.parentElement.getAttribute('value')

        let newDiv = document.createElement("div");
        
        newDiv.innerHTML = generateTemplate(userSelected)

      
        // console.log(newDiv)
       
        middleArea.parentNode.insertBefore(newDiv, middleArea.nextSibling);
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
                
                // console.log("Paper",fileName)
                
            }

    return `<section class="after-selection">
                <div class="fl">
                    <div class="sl">
                        <div class="tl">
                            <div class="paperr ${userSelect}s"  name="${userSelect}" value="${userSelect}">
                                <img src="./images/${userSelect}.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            

               ${displayResult(fileName,userSelect)}
               <div class="fl">
                    <div class="sl">
                        <div class="tl">
                            <div class="paperr ${fileName}s" value="${fileName}" >
                                ${newD.innerHTML}
                            </div>
                        </div>
                    </div>
                </div>
                
                  
                
            </section>`
}


function displayResult(compSelect,userSelection){
    if(userSelection==="rock" && compSelect==="rock"){
        nextBtn.classList.add("hideModal")
        return `<div class="display-result">
                    <p>DRAW</p>
                    <p>NO WINS</p>
                    <button onclick="myPageReload()" class="play-again">PLAY AGAIN</button>
                </div>`
    }
    else if(userSelection==="rock" && compSelect==="paper"){
        nextBtn.classList.add("hideModal")

        totalArr[1] =totalArr[1]+5
        pcScoreBoard.textContent = totalArr[1]
        localStorage.setItem("data",JSON.stringify(totalArr))
        
        return `<div class="display-result">
                    <p>PC WINS</p>
                    <p>AGAINST YOU</p>
                    <button onclick="myPageReload()" class="play-again">PLAY AGAIN</button>
                </div>`
    }else if(userSelection==="rock" && compSelect==="scissor"){
        nextBtn.classList.remove("hideModal")

        totalArr[0] = totalArr[0]+5
        userScoreBoard.textContent = totalArr[0]
        localStorage.setItem("data",JSON.stringify(totalArr))


        return `<div class="display-result">
                    <p>YOU WIN</p>
                    <p>AGAINST PC</p>
                    <button onclick="myPageReload()" class="play-again">PLAY AGAIN</button>
                </div>`
    }else if(userSelection==="paper" && compSelect==="scissor"){
        nextBtn.classList.add("hideModal")

        totalArr[1] = totalArr[1]+5
        pcScoreBoard.textContent = totalArr[1]
        localStorage.setItem("data",JSON.stringify(totalArr))

        return `<div class="display-result">
                    <p>PC WINS</p>
                    <p>AGAINST YOU</p>
                    <button onclick="myPageReload()" class="play-again">PLAY AGAIN</button>
                </div>`
    }else if(userSelection==="paper" && compSelect==="rock"){
        nextBtn.classList.add("hideModal")

        totalArr[0] = totalArr[0]+5
        userScoreBoard.textContent = totalArr[0]
        localStorage.setItem("data",JSON.stringify(totalArr))

        return `<div class="display-result">
                    <p>YOU WIN</p>
                    <p>AGAINST PC</p>
                    <button onclick="myPageReload()" class="play-again">PLAY AGAIN</button>
                </div>`
    }else if(userSelection==="paper" && compSelect==="paper"){
        nextBtn.classList.add("hideModal")

        return `<div class="display-result">
                    <p>DRAW</p>
                    <p>NO WINS</p>
                    <button onclick="myPageReload()" class="play-again">PLAY AGAIN</button>
                </div>`
    }else if(userSelection==="scissor" && compSelect==="scissor"){
        nextBtn.classList.add("hideModal")

        return `<div class="display-result">
                    <p>DRAW</p>
                    <p>NO WINS</p>
                    <button onclick="myPageReload()" class="play-again">PLAY AGAIN</button>
                </div>`
    }else if(userSelection==="scissor" && compSelect==="rock"){
        nextBtn.classList.add("hideModal")

        totalArr[1] = totalArr[1]+5
        pcScoreBoard.textContent = totalArr[1]

        localStorage.setItem("data",JSON.stringify(totalArr))

        return `<div class="display-result">
                    <p>PC WINS</p>
                    <p>AGAINST YOU</p>
                    <button onclick="myPageReload()" class="play-again">PLAY AGAIN</button>
                </div>`
    }else if(userSelection==="scissor" && compSelect==="paper"){
        nextBtn.classList.remove("hideModal")

        totalArr[0] = totalArr[0]+5
        userScoreBoard.textContent = totalArr[0]
        localStorage.setItem("data",JSON.stringify(totalArr))

        return `<div class="display-result">
                    <p>YOU WIN</p>
                    <p>AGAINST PC</p>
                    <button onclick="myPageReload()" class="play-again">PLAY AGAIN</button>
                </div>`
    }
}

pcScoreBoard.textContent = totalArr[1]
userScoreBoard.textContent = totalArr[0]






























