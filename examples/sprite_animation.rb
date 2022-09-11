# Adapted from https://github.com/raysan5/raylib/blob/master/examples/textures/textures_srcrec_dstrec.c
#
# Art used in this example is provided under a free and permissive license.
#  - [Scarfy spritesheet](scarfy.png) by [Eiden Marsal](https://www.artstation.com/artist/marshall_z), licensed as [Creative Commons Attribution-NonCommercial 3.0](https://creativecommons.org/licenses/by-nc/3.0/legalcode)

# Initialization
$screen_width = 800
$screen_height = 450

init_window($screen_width, $screen_height, "raylib [textures] examples - texture source and destination rectangles")

# NOTE: Textures MUST be loaded after Window initialization (OpenGL context is required)

$scarfy = Texture2D.load("assets/scarfy.png")

$frame_width = $scarfy.width / 6
$frame_height = $scarfy.height

# Source rectangle (part of the texture to use for drawing)
$source = Rectangle.new(0, 0, $frame_width, $frame_height)

# Destination rectangle (screen rectangle where drawing part of texture)
$destination = Rectangle.new(
  $screen_width / 2.0, $screen_height / 2.0, $frame_width * 2, $frame_height * 2
)

# Origin of the texture (rotation/scale point), it's relative to destination rectangle size
$origin = Vector2.new($frame_width, $frame_height)

$rotation = 0

set_target_fps(60)

$frame_counter = 0

# Main game loop
def main
  # Update
  $rotation += 1
  $frame_counter += 1

  # Every 10 frames let's change frame of our animation
  if $frame_counter % 10 == 0
    $source.x += $frame_width
    # Reset the animation when we get to the end
    $source.x = 0 if $source.x >= $scarfy.width
  end

  # Draw
  drawing do

    clear_background(RAYWHITE)

    # NOTE: Using Texture2D.draw() we can easily rotate and scale the part of the texture we draw
    # source: defines the part of the texture we use for drawing
    # destination: defines the rectangle where our texture part will fit (scaling it to fit)
    # origin: defines the point of the texture used as reference for rotation and scaling
    # rotation: defines the texture rotation (using origin as rotation point)
    $scarfy.draw(
      source: $source,
      destination: $destination,
      origin: $origin,
      rotation: $rotation
    )

    draw_line($destination.x, 0, $destination.x, $screen_height, GRAY)
    draw_line(0, $destination.y, $screen_width, $destination.y, GRAY)

    draw_text("(c) Scarfy sprite by Eiden Marsal", $screen_width - 200, $screen_height - 20, 10, GRAY)

  end
end

if browser?
  set_main_loop 'main'
else
  # Detect window close button or ESC key
  main until window_should_close?
end

# De-Initialization
$scarfy.unload
close_window # Close window and OpenGL context
