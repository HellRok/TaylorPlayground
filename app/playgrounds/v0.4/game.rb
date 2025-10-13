# Add the path ./vendor so we can easily require third party libraries.
$: << './vendor'

puts "INFO: Playground made using Taylor v#{TAYLOR_VERSION}"

def error_main
  Window.draw do

    clear
    Font.default.draw(
      $error.message,
      x: 10, y: 10,
      sizing: 20,
      colour: Colour::RED
    )
    Font.default.draw(
      $error.backtrace.join("\n"),
      x: 10, y: 30,
      sizing: 20,
      colour: Colour::BLACK
    ) unless $error.backtrace.nil?
  end
end

def fetch_code
  code = Browser.attribute_from_element('#code', 'value')
  example = File.open('example.rb', 'w')
  example.write(code)
  example.close
end

fetch_code

begin
  require %q(./example)
rescue SyntaxError, StandardError => error
  $error = error
  puts $error.message
  puts $error.backtrace unless $error.backtrace.nil?

  unless Window.ready?
    Window.open(width: 800, height: 480, title: "Error!")
    Window.target_frame_rate = 30
  end

  Browser.cancel_main_loop
  Browser.main_loop = 'error_main'
end
