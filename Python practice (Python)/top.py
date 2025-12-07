from turtle import Turtle , Screen
oyna = Screen()
oyna.title("mening dasturim")

chiziq = Turtle()
chiziq.color("red")
chiziq.pensize(5)
chiziq.speed(0)
chiziq.up()
chiziq.goto(300 ,300)
chiziq.down()
chiziq.goto(300, -300)
chiziq.goto(300, -300)
chiziq.goto(-300, -300)
chiziq.goto(-300, 300)
chiziq.goto(300, 300)
chiziq.hideturtle()

koptok = Turtle()
koptok.color("blue")
koptok.shape("circle")
koptok.up()
koptok.goto(0, 0)

xx = 3
yy = 2
while True:
    x , y = koptok.position()
    if  x+ xx >= 300 or x + xx <= -300:
        xx = -xx
    if  y+ yy >= 300 or y + yy <= -300:
        yy = -yy

    koptok.goto(x+ xx, y+ yy)


oyna.mainloop()