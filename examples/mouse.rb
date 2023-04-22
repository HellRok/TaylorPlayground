# Open up a window
init_window(800, 480, "Taylor Application")

# Setup audio so we can play sounds
init_audio_device

# Get the current monitor frame rate and set our target framerate to match.
set_target_fps(get_monitor_refresh_rate(get_current_monitor))

$mouse_outline = Rectangle.new(285, 70, 230, 340)

$left_button = Rectangle.new(295, 80, 80, 120)
$right_button = Rectangle.new(425, 80, 80, 120)
$scroll_wheel = Rectangle.new(385, 90, 30, 100)
$scroll_wheel_up = Rectangle.new(387, 92, 26, 46)
$scroll_wheel_down = Rectangle.new(387, 142, 26, 46)

# Define your main method
def main
  # Get the amount of time passed since the last frame was rendered
  delta = get_frame_time

  mouse_position = get_mouse_position

  # This doesn't work on web
  set_mouse_position(10, 10) if mouse_button_down?(MOUSE_LEFT_BUTTON)

  # Your update logic goes here

  drawing do
    # Your drawing logic goes here

    clear
    draw_text(
      "Mouse: #{mouse_position.x}x#{mouse_position.y}",
      10, 10, 20, DARKGRAY
    )

    $mouse_outline.draw(outline: true, rounded: true, radius: 0.2, colour: BLACK)

    $left_button.draw(outline: false, rounded: true, colour: RED) if mouse_button_down?(MOUSE_LEFT_BUTTON)
    $left_button.draw(outline: true, rounded: true, colour: BLACK)

    $right_button.draw(outline: false, rounded: true, colour: RED) if mouse_button_down?(MOUSE_RIGHT_BUTTON)
    $right_button.draw(outline: true, rounded: true, colour: BLACK)

    $scroll_wheel.draw(outline: false, rounded: true, colour: RED) if mouse_button_down?(MOUSE_MIDDLE_BUTTON)
    $scroll_wheel_up.draw(outline: false, rounded: true, colour: GREEN) if get_mouse_wheel_move > 0
    $scroll_wheel_down.draw(outline: false, rounded: true, colour: GREEN) if get_mouse_wheel_move < 0
    $scroll_wheel.draw(outline: true, rounded: true, colour: BLACK)
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

