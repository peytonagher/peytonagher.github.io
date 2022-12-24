# need to add keyboard input

import pygame
import sys

# Initialize Pygame
pygame.init()

# Set the window size
WIDTH, HEIGHT = 640, 480

# Create the window
screen = pygame.display.set_mode((WIDTH, HEIGHT))

# Set the title of the window
pygame.display.set_caption("Pong")

# Set the background color to white
screen.fill((0, 0, 0))

# Set the ball's starting position and velocity
ball_x, ball_y = WIDTH / 2, HEIGHT / 2
ball_vx, ball_vy = 5, 5

# Set the paddle's starting position and size
paddle_x, paddle_y = 20, HEIGHT / 2
paddle_width, paddle_height = 10, 50

# Set the game clock
clock = pygame.time.Clock()

# Main game loop
while True:
    # Handle events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    # Update the ball's position
    ball_x += ball_vx
    ball_y += ball_vy

    # Check if the ball has collided with a wall
    if ball_y < 0 or ball_y > HEIGHT:
        ball_vy *= -1
    if ball_x < 0:
        ball_vx *= -1
        ball_x = WIDTH / 2
        ball_y = HEIGHT / 2

    # Check if the ball has collided with the paddle
    if ball_x > WIDTH - paddle_width and ball_y > paddle_y and ball_y < paddle_y + paddle_height:
        ball_vx *= -1

    # Clear the screen
    screen.fill((0, 0, 0))

    # Draw the ball
    pygame.draw.circle(screen, (255, 255, 255), (int(ball_x), int(ball_y)), 10)

    # Draw the paddle
    pygame.draw.rect(screen, (255, 255, 255), (paddle_x, paddle_y, paddle_width, paddle_height))

    # Update the display
    pygame.display.flip()

    # Set the frame rate
    clock.tick(60)
