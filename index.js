
const canvas = document.querySelector('canvas')
console.log(canvas)

// Ideally have 'window.innderWidth' when adjusting canvas to take up screen space. when in js you can remove the prefix 'window.' from innderwidth.
canvas.width = innerWidth
canvas.height = innerHeight

//Applyies "workspace" to the page for the js to communicate with in 2d space
const c = canvas.getContext('2d')
console.log(c)

//Generel shadow setup. Use this class to give specific attibutes to shadow (e.g. size,speed, color) Start with basic square shape then style later.
const gravity = 0.5

class Shadow {
    constructor() {
        this.position = {
            x:100,
            y:100
        }
        this.velocity = {
            x:0,
            y:0
        }
        this.width =100
        this.height = 75
        this.image = document.getElementById("dog_sit_right")
        this.frames = 0
        this.sprites = {
            stand: {
                right: document.getElementById("dog sit right"),
                left: document.getElementById("dog sit left")
            },
            run: {
                right: document.getElementById("dog right"),
                left: document.getElementById("dog left")
            },
            bear: {
                baby: document.getElementById("baby bear")
            }
        }

        this.currentSprite = this.sprites.stand.right
        }


// // draw refers to shadow on canvas. "c." targets element on canvas
    draw(){
        // c.fillStyle = 'orange'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(this.currentSprite, 63.87 * this.frames, 0, 63.87, 40, this.position.x, this.position.y,
            this.width, this.height)
    }
    update() {
        this.frames++
        if (this.frames > 8) this.frames = 0

        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
        {this.velocity.y += gravity}
        else this.velocity.y = 0
    }
}

class smallPlatform{
    constructor (x,y) {
        this.position = {
            x,
            y
        }
        this.width = 100
        this.height = 10
    }
    draw() {
        c.fillStyle = "orange"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Platform {
    constructor(x, y) {
        this.position = {
            x,
            y
        }
        this.width = 200
        this.height = 20
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

//using closing brackets inside array paranthesis will make platforms disappear. Don't list (x,y) in Platform just number.
const shadow = new Shadow ()
const platforms = [new Platform(200, 100), new Platform (550, 280), new Platform(0,500), new Platform(780,200), new Platform(1200, 400), new Platform(1480,330), new smallPlatform(1800,300), new smallPlatform(2100,150), new smallPlatform(2400,500),new smallPlatform(2780,100), new smallPlatform(3050,550), new smallPlatform(3300,300),new smallPlatform(3600,400), new Platform(4000,75)]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false,
    },
}

let scrollOffset = 0

//declare shadow.update to target animation update. This creates a loop. clearRect needs 4 argument(x,y,width,height)
function animate () {
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width, canvas.height)
    shadow.update()
    platforms.forEach(platform =>{
        platform.draw()
    })
     
     if (keys.right.pressed && shadow.position.x < 400) {
        shadow.velocity.x = 5
    } else if (keys.left.pressed && shadow.position.x > 100) {
        shadow.velocity.x = -5
    } else {
        shadow.velocity.x = 0
       
     if (keys.right.pressed) {
        scrollOffset += 5
        platforms.forEach((platform) => {
            platform.position.x -= 5
        })
    } else if (keys.left.pressed) {
        scrollOffset -= 5
        platforms.forEach((platform) => {
        platform.position.x += 5
       })
    }
    if (scrollOffset > 3585) {
        console.log("You survived")
    }
}

//platform collision detect.
platforms.forEach((platform) => {
    if (
        shadow.position.y + shadow.height <= platform.position.y && shadow.position.y + shadow.height + shadow.velocity.y >= platform.position.y
        && shadow.position.x + shadow.width >= platform.position.x && shadow.position.x <= platform.position.x + platform.width
        ) { 
       shadow.velocity.y = 0
    }
})
}


animate();

//without addressing "window" as argument. function was unresponsive.
window.addEventListener('keydown', ({keyCode}) => {
switch (keyCode) {
    case 65:
        keys.left.pressed = true
        console.log('left')
        shadow.currentSprite = shadow.sprites.run.left
        break
    case 87:
        shadow.velocity.y -= 15
        console.log('up')

        break
    case 83:
        shadow.velocity.y += 10
        console.log('down')
        break
    case 68:
        keys.right.pressed = true
        console.log('right')
        shadow.currentSprite = shadow.sprites.run.right
        break
}
})

window.addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = false
            shadow.currentSprite = shadow.sprites.stand.left
            break
        case 87:
            shadow.velocity.y = 20
            break
        case 83:
            shadow.velocity.y = 20
            break
        case 68:
            keys.right.pressed = false
            shadow.currentSprite = shadow.sprites.stand.right
            break
    }
 })

