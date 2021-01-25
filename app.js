document.addEventListener('DOMContentLoaded' , () => {
   const bird = document.querySelector('.bird')
   const gameDisplay = document.querySelector('.game-container')
   const ground = document.querySelector('.ground')

   let birdLeft = 220
   let birdBottom = 100
   let gravity = 2
   let isGameOver = false

   function startGame(){
       birdBottom -= gravity
       bird.style.bottom = birdBottom + 'px'
       bird.style.left = birdLeft + 'px'
             
   }

   let gameTimerId = setInterval(startGame, 20) // 20 milisecond

//    function control(e) {
//        if (e.keyCode === 32) {
//            jump()
//        }
//    }

   function jump() {
       if (birdBottom < 500) birdBottom += 50   
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom);
   }
   document.addEventListener('click', jump)




    function generateObstacle() {
         let obstacleLeft = 500
         let randomHeight = Math.random() * 60 // mengatur ketinggian obstacle random
         let obstacleBottom = randomHeight
         let gap = 430

         const obstacle = document.createElement('div')
         const topObstacle = document.createElement('div')

         if (!isGameOver) {
             
             obstacle.classList.add('obstacle')
             topObstacle.classList.add('topObstacle')
         }


         gameDisplay.appendChild(obstacle) // memasukkan obstacle ke dalam div
         gameDisplay.appendChild(topObstacle)

         obstacle.style.left = obstacleLeft + 'px'
         topObstacle.style.left = obstacleLeft + 'px'

         obstacle.style.bottom = obstacleBottom + 'px'
         topObstacle.style.bottom = obstacleBottom + gap + 'px'



         function moveObstacle() {
             obstacleLeft -= 2
             obstacle.style.left = obstacleLeft + 'px'
             topObstacle.style.left = obstacleLeft + 'px'

             if (obstacleLeft === -60) { //menghilangkan obstacle setelah obstacle menyentuh left 0 px
                 clearInterval(timerId)
                 gameDisplay.removeChild(obstacle)
                 gameDisplay.removeChild(topObstacle)
             } 
             if (
                 obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && 
                 (birdBottom < obstacleBottom  + 152 /*variabel obstacel bawah*/  || birdBottom > obstacleBottom + gap -203) /*variabel obtacle atas)*/ ||      // rules kena obstacle bawah dan bird jatuh ke ground
                 birdBottom === 0
                 ) {
                 gameOver()
                 clearInterval(timerId)
             }
         }

         let timerId = setInterval (moveObstacle , 20)
         if (!isGameOver) setTimeout(generateObstacle, 3000) // mengulang obstacle per 3 detik
    }  
    
    generateObstacle()

    function gameOver() {
        clearInterval(gameTimerId)
        console.log('game over');
        isGameOver = true
        document.removeEventListener('click' , jump)
        
    }
  




})
 