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
        this.width =35
        this.height = 35
        }

// // draw refers to shadow on canvas. "c." targets element on canvas
    draw(){
        c.fillStyle = 'orange'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y < canvas.height)
        this.velocity.y += gravity
        else this.velocity.y = 0
    }
}



class Platform {
    constructor({x, y }) {
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


const shadow = new Shadow ()
const platforms = [new Platform({x: 200, y: 100}), new Platform({x:450, y: 175})]


const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false,
    },
}


//declare shadow.update to target animation update. This creates a loop. clearRect needs 4 argument(x,y,width,height)
function animate () {
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width, canvas.height)
    shadow.update()
    platforms.forEach((platform) => {
        platform.draw()
    })

     if (keys.right.pressed && shadow.position.x < 400) {
        shadow.velocity.x = 5
    } else if (keys.left.pressed && shadow.position.x > 100) {
        shadow.velocity.x = -5
    } else {
        shadow.velocity.x = 0
        if (keys.right.pressed) {
            platforms.forEach((platform) => {
                platform.position.x -= 5
                
            })
            
        } else if (keys.left.pressed) {
            platforms.forEach((platform) => {
                platform.position.x += 5
            })
           
        }
    }
}
//platform collision detect.
platforms.forEach((platform) => {
    if (shadow.position.y + shadow.height <= platform.position.y 
        && shadow.position.y + shadow.height + shadow.velocity.y >= platform.position.y 
        && shadow.position.x + shadow.width >= platform.position.x && shadow.position.x <= platform.position.x + platform.width) {
        shadow.velocity.y = 0
        }
    })


animate();

//without addressing "window" as argument. function was unresponsive.
window.addEventListener('keydown', ({keyCode}) => {
switch (keyCode) {
    case 65:
        keys.left.pressed = true
        console.log('left')
        break
    case 87:
        shadow.velocity.y -= 10
        console.log('up')
        break
    case 83:
        shadow.velocity.y += 10
        console.log('down')
        break
    case 68:
        keys.right.pressed = true
        console.log('right')
        break
}
})

window.addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = false
            break
        case 87:
            shadow.velocity.y = 20
            break
        case 83:
            shadow.velocity.y = 20
            break
        case 68:
            keys.right.pressed = false
            break
    }
 })

