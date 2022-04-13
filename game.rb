# Add the path ./vendor so we can easily require third party libraries.
$: << './vendor'

# Open up a window
init_window(800, 480, "Taylor Playground")

# Setup audio so we can play sounds
init_audio_device

# Get the current monitor frame rate and set our target framerate to match.
set_target_fps(get_monitor_refresh_rate(get_current_monitor))

def main; end
def fetch_code
  $code = get_attribute_from_element('#code', 'value')
  begin
    eval $code
  rescue SyntaxError
    eval <<-CODE
      def main
        drawing do

          clear
          draw_text(
            "SYNTAX ERROR!",
            190, 200, 20, RED
          )
        end
      end
    CODE
  end
end

fetch_code

if browser?
  set_main_loop 'main'
else
  # Detect window close button or ESC key
  main until window_should_close?
end

close_audio_device
close_window
