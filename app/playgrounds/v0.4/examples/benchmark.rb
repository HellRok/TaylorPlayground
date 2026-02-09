# Open up a window
Window.open(width: 800, height: 480, title: "Welcome!")

# Setup audio so we can play sounds
Audio.open

# Get the current monitor frame rate and set our target framerate to match.
Window.target_frame_rate = Monitor.current.refresh_rate

# Sprites from https://kenney.nl/assets/pixel-platformer
$characters = Texture2D.new("./assets/characters.png")
$backgrounds = Texture2D.new("./assets/backgrounds.png")

# Fonts from https://kenney.nl/assets/kenney-fonts (only kenney_pixel.ttf and kenney_blocks.ttf)
$pixel_font = Font.new("./assets/kenney_pixel.ttf", size: 32)

class Character
  def initialize
    @timer = 0.5
    @colour = [:green, :blue, :pink, :yellow, :cream].sample
    @destination = Rectangle.new(
      x: 388, y: 228,
      width: 24, height: 24
    )
    @direction = Vector2.new(
      x: 50 - (rand * 100),
      y: 50 - (rand * 100)
    )

    default_sprite_position
  end

  def update(delta)
    @destination.x += @direction.x * delta
    @destination.y += @direction.y * delta

    if @destination.x < 0
      @direction.x = @direction.x.abs
    elsif @destination.x > 800 - 24
      @direction.x = -@direction.x.abs
    end

    if @destination.y < 0
      @direction.y = @direction.y.abs
    elsif @destination.y > 480 - 24
      @direction.y = -@direction.y.abs
    end

    @timer -= delta
    toggle_sprite if @timer <= 0
  end

  def draw
    $characters.draw(
      source: @sprite_position,
      destination: @destination
    )
  end

  private

  def toggle_sprite
    @timer = 0.25 + (rand * 0.5)
    if @sprite_position.x % 48 == 0
      @sprite_position.x += 24
    else
      @sprite_position.x -= 24
    end
  end

  def default_sprite_position
    x, y = case @colour
    when :green
      [0, 0]
    when :blue
      [48, 0]
    when :pink
      [96, 0]
    when :yellow
      [144, 0]
    when :cream
      [0, 24]
    end
    @sprite_position = Rectangle.new(x: x, y: y, width: 24, height: 24)
  end
end

class Tilemap
  def initialize(image:, size:)
    @image = Image.new(image)
    @size = size
  end

  def tile_count
    (@image.width / @size) * (@image.height / @size)
  end

  def tiles_per_row
    @image.width / @size
  end

  def tile_for(id)
    x = id % tiles_per_row
    y = (id / tiles_per_row.to_f).floor
    Rectangle.new(
      x: x * @size, y: y * @size,
      width: @size, height: @size
    )
  end

  def generate_from(csv)
    start_time = Time.now
    ids = File.read(csv).each_line.map { |line| line.split(",").map(&:to_i) }

    @width = ids.first.size
    @height = ids.size

    map = Image.generate(width: @width * 18, height: @height * 18, colour: Colour::BLUE)

    ids.each.with_index { |row, y|
      row.each.with_index { |id, x|
        unless id.negative?
          map.draw!(
            image: @image,
            source: tile_for(id),
            destination: Rectangle.new(
              x: x * @size, y: y * @size,
              width: @size, height: @size
            )
          )
        end
      }
    }

    puts "INFO: Generated map from #{csv} in #{Time.now - start_time} seconds"

    map
  end
end

$chars = 1000.times.map { Character.new }
$text_position = Vector2.new(x: 20, y: 20)
$tilemap = Tilemap.new(image: "./assets/tiles.png", size: 18)
$map = $tilemap.generate_from("./assets/map.csv").to_texture

def main
  delta = Window.frame_time

  if Window.frame_rate > 60
    50.times { $chars << Character.new }
  elsif Window.frame_rate < 55
    5.times { $chars.shift }
  end

  $chars.each { |char| char.update(delta) }

  Window.draw do
    Window.clear
    $map.draw(
      destination: Rectangle.new(
        x: -5, y: -3,
        width: $map.width,
        height: $map.height,
      ),
      origin: Vector2[0, 0]
    )
    $chars.each(&:draw)
    $pixel_font.draw(
      "FPS: #{Window.frame_rate}\nAliens: #{$chars.size}",
      position: $text_position
    )
  end
end

if Taylor::Platform.browser?
  Browser.main_loop = "main"
else
  # Detect window close button or ESC key
  main until Window.close?
end

Audio.close
Window.close
