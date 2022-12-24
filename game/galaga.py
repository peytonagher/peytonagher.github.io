# loads blank pygame screen

import pygame
import random

# Initialize Pygame
pygame.init()

# Set the window dimensions
WINDOW_WIDTH = 640
WINDOW_HEIGHT = 480

# Create the window and set the title
window = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("Galaga")

# Load the player spaceship image
player_image = pygame.image.load("player.png")
player_rect = player_image.get_rect()

# Set the player's starting position
player_rect.x = WINDOW_WIDTH // 2
player_rect.y = WINDOW_HEIGHT - player_rect.height

# Load the enemy ship image
enemy_image = pygame.image.load("enemy.png")

# Create a group for the enemy ships
enemies = pygame.sprite.Group()

# Add 10 enemy ships to the game
for i in range(10):
    enemy = pygame.sprite.Sprite()
    enemy.image = enemy_image
    enemy.rect = enemy.image.get_rect()
    enemy.rect.x = random.randint(0, WINDOW_WIDTH - enemy.rect.width)
    enemy.rect.y = random.randint(0, WINDOW_HEIGHT // 2)
    enemies.add(enemy)

# Create a group for the player's bullets
bullets = pygame.sprite.Group()

# Set the game clock
clock = pygame.time.Clock()

# Main game loop
running = True
while running:
    # Check for player input
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            # Handle player movement
            if event.key == pygame.K_LEFT:
                player_rect.x -= 5
            elif event.key == pygame.K_RIGHT:
                player_rect.x += 5
            # Fire a bullet if the space key is pressed
            elif event.key == pygame.K_SPACE:
                bullet = pygame.sprite.Sprite()
                bullet.image = pygame.Surface((5, 10))
                bullet.rect = bullet.image.get_rect()
                bullet.rect.x = player_rect.x + player_rect.width // 2
                bullet.rect.y = player_rect.y
                bullets.add(bullet)
    
    # Update the positions of the enemy ships
    enemies.update()
    
    # Update the positions of the player's bullets
    bullets.update()
    
    # Check for collisions between enemy ships and player bullets
    for enemy in enemies:
        hits = pygame.sprite.spritecollide(enemy, bullets, True)
        if hits:
            # Remove the enemy ship from the game if it is hit
            enemies.remove(enemy)
    
    # Check for collisions between the player spaceship and enemy ships
    hits = pygame.sprite.spritecollide
