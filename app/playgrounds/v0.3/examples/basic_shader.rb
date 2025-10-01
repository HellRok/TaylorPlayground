# Open up a window
init_window(800, 480, "Taylor Application")

# Setup audio so we can play sounds
init_audio_device

# Get the current monitor frame rate and set our target framerate to match.
set_target_fps(get_monitor_refresh_rate(get_current_monitor))

$shader = Shader.load(fragment_shader_code: <<-SHADER)
  #version #{GLSL_VERSION}

  precision mediump float;

  // Input vertex attributes (from vertex shader)
  varying vec2 fragTexCoord;
  varying vec4 fragColor;

  // Input uniform values
  uniform sampler2D texture0;
  uniform vec4 colDiffuse;

  void main() {
    // Texel color fetching from texture sampler
    vec4 texelColor = texture2D(texture0, fragTexCoord)*colDiffuse*fragColor;

    // Convert texel color to grayscale using NTSC conversion weights
    float gray = dot(texelColor.rgb, vec3(0.299, 0.587, 0.114));

    // Calculate final fragment color
    gl_FragColor = vec4(gray, gray, gray, texelColor.a);
  }
SHADER

$scarfy = Texture2D.load("assets/scarfy.png")
$scarfy_destination = Rectangle.new(
  (get_screen_width - $scarfy.width) / 2.0,
  (get_screen_height - $scarfy.height) / 2.0,
  $scarfy.width, $scarfy.height
)

# Define your main method
def main
  # Get the amount of time passed since the last frame was rendered
  delta = get_frame_time

  # Your update logic goes here

  drawing do
    # Your drawing logic goes here

    clear
    if key_down?(KEY_SPACE) || mouse_button_down?(MOUSE_LEFT_BUTTON)
      $shader.draw do
        $scarfy.draw(destination: $scarfy_destination)
      end
    else
      $scarfy.draw(destination: $scarfy_destination)
    end

    draw_text(
      "Hold space or click the screen to apply the shader",
      160, 10, 20, DARKGRAY
    )
  end
end

if browser?
  set_main_loop 'main'
else
  # Detect window close button or ESC key
  main until window_should_close?
end

close_audio_device
close_window
