# not my code below, will be re-engineering this program over time

# swap turtle for another graphics module
import turtle                                                   
import math                            
import random          
import os                   

i = 0
path = "/home/peytonagher/github/website/"
try:
    while i < 2:
        os.mkdir(path + "file" + str(i))
        i += 1
except OSError:
    print("File creation failed.")

#set up screen                                         
wn= turtle.Screen()                                
wn.bgcolor("black")                                
wn.title("Space invaders")                              
wn.bgpic("/website/media/background.gif")   
#Register the shapes
turtle.register_shape("/website/media/invader.gif") #this is pic.of invader  
turtle.register_shape("/website/media/player.gif")  # this is pic.of player 

#Draw border
border_pen = turtle.Turtle()
border_pen.speed(0)
border_pen.color("white")
border_pen.penup()
border_pen.setposition(-300,-300)
border_pen.pendown()
border_pen.pensize(3)
for side in range(4):
    border_pen.fd(600)
    border_pen.lt(90)
    border_pen.hideturtle()
    #Set the score to 0
    score = 0

#Draw the score
score_pen = turtle.Turtle()
score_pen.speed(0)
score_pen.color("white")
score_pen.penup()
score_pen.setposition(-290,280)
scorestring = "Score: %s" %score
score_pen.write(scorestring, False, align="left", font=("Arial",14,"normal" ))
score_pen.hideturtle()

#Create the player
player= turtle.Turtle()
player.color("blue")
player.shape("player.gif")
player.penup()
player.speed(0)
player.setposition(0,-250)
player.setheading(90)

playerspeed = 15

enemyspeed = 2
#Choose a number of enemies
number_of_enemies = 5
#Create an empty list of enemies
enemies = []



#Add enemies to the list
for i in range(number_of_enemies):
    # Create the enemy
    enemies.append(turtle.Turtle())
for enemy in enemies:
    enemy.color("red")
    enemy.shape("invader.gif")
    enemy.penup()
    enemy.speed(0)
    x= random.randint(-200,200)
    y= random.randint(100,250)
    enemy.setposition(x,y)



#Create the player's bullet
bullet = turtle.Turtle()
bullet.color("yellow")
bullet.shape("triangle")
bullet.penup()
bullet.speed(0)
bullet.setheading(90)
bullet.shapesize(0.5,0.5)
bullet.hideturtle()

bulletspeed = 70

#Define bullet state
#ready- ready to fire
#fire- bullet is firing
bulletstate = "ready"

#Move the player left and right
def move_left():
    x = player.xcor()
    x -=playerspeed
    if x < -280:
        x=-280
    player.setx(x)

def move_right():
    x = player.xcor()
    x += playerspeed
    if x > 280:
        x = 280
    player.setx(x)

def fire_bullet():
   #Declare bulletstate as a global if it need changed
    global bulletstate
    if bulletstate == "ready":
        bulletstate = "fire"
        #Move the bullet to the just above the player
        x = player.xcor()
        y = player.ycor() +10
        bullet.setposition(x,y)
        bullet.showturtle()

def isCollision(t1,t2):
    distance = math.sqrt(math.pow(t1.xcor()-t2.xcor(),2)+math.pow(t1.ycor()-t2.ycor(),2))
    if distance < 15:
        return True
    else:
        return False




#Create keyboard bindings
turtle.listen()
turtle.onkey(move_left, "Left")
turtle.onkey(move_right, "Right")
turtle.onkey(fire_bullet, "space")


#Main game loop
while True:

    for enemy in enemies:
        #Move the enemy
        x = enemy.xcor()
        x += enemyspeed
        enemy.setx(x)
        #Move the enemy back and down
        if enemy.xcor() > 280:
            #Move all the enemies down
            for e in enemies:
                y = e.ycor()
                y -= 30
                e.sety(y)
            enemyspeed *= -1
            #Change enemy direction
        if enemy.xcor() < -280:
            #Move all enemies down
            for e in enemies:
                y = e.ycor()
                y -= 30
                e.sety(y)
            enemyspeed *= -1
        # check for a collision between bullet and enemy
        if isCollision(bullet,enemy):
            # Reset the bullet
            bullet.hideturtle()
            bulletstate = "ready"
            bullet.setposition(0, -340)
            # reset the enemy
            x = random.randint(-200, 200)
            y = random.randint(100, 250)
            enemy.setposition(x, y)
            #Update the score
            score +=10
            scorestring="Score: %s" %score
            score_pen.clear()
            score_pen.write(scorestring, False, align = "left", font = ("Arial", 14, "normal"))
        if isCollision(player, enemy):
            player.hideturtle()
            enemy.hideturtle()
            print("Game Over")
            break



    #Move the bullet
    if bulletstate == "fire":
        y = bullet.ycor()
        y +=bulletspeed
        bullet.sety(y)
    #Check to see if the bullet has gone to the top
    if bullet.ycor() > 275:
        bullet.hideturtle()
        bulletstate = "ready"
while True:
    wn.update()