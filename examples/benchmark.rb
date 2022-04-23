# Sprites from https://kenney.nl/assets/pixel-platformer
$characters = Texture2D.load('./assets/characters.png')
$backgrounds = Texture2D.load('./assets/backgrounds.png')

# Fonts from https://kenney.nl/assets/kenney-fonts (only kenney_pixel.ttf and kenney_blocks.ttf)
$pixel_font = Font.load('./assets/kenney_pixel.ttf', size: 32)

class Character
  def initialize
    @timer = 0.5
    @colour = [:green, :blue, :pink, :yellow, :cream].sample
    @destination = Rectangle.new(388, 228, 24, 24)
    @direction = Vector2.new(
      50 - (rand * 100),
      50 - (rand * 100)
    )

    default_sprite_position
  end


  def update(delta)
    @destination.x += @direction.x * delta
    @destination.y += @direction.y * delta

    @direction.x *= -1 if @destination.x < 0 || @destination.x > 776
    @direction.y *= -1 if @destination.y < 0 || @destination.y > 456

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
    @sprite_position = Rectangle.new(x, y, 24, 24)
  end
end

class Tilemap
  def initialize(image:, size:)
    @image = Image.load(image)
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
    Rectangle.new(x * @size, y * @size, @size, @size)
  end

  def generate_from(csv)
    start_time = Time.now
    ids = File.read(csv).each_line.map { |line| line.split(',').map(&:to_i) }

    @width = ids.first.size
    @height = ids.size

    map = Image.generate(width: @width * 18, height: @height * 18, colour: BLUE)

    ids.each.with_index { |row, y|
      row.each.with_index { |id, x|
        unless id.negative?
          map.draw!(
            image: @image,
            source: tile_for(id),
            destination: Rectangle.new(x * @size, y * @size, @size, @size)
          )
        end
      }
    }

    puts "INFO: Generated map from #{csv} in #{Time.now - start_time} seconds"

    map
  end
end

$chars = 1000.times.map { Character.new }
$text_position = Vector2.new(20, 20)
$tilemap = Tilemap.new(image: './assets/tiles.png', size: 18)
$map = $tilemap.generate_from('./assets/map.csv').to_texture

def main
  delta = get_frame_time

  if get_fps > 60
    50.times { $chars << Character.new }
  elsif get_fps < 55
    5.times { $chars.shift }
  end

  $chars.each { |char| char.update(delta) }

  drawing do
    clear
    $map.draw(destination: Rectangle.new(-14, 480 - $map.height, $map.width, $map.height))
    $chars.each(&:draw)
    $pixel_font.draw("FPS: #{get_fps}\nAliens: #{$chars.size}", size: $pixel_font.base_size, position: $text_position)
  end
end
