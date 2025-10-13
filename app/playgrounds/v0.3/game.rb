# Add the path ./vendor so we can easily require third party libraries.
$: << './vendor'

puts "INFO: Playground made using Taylor v#{TAYLOR_VERSION}"

def error_main
  drawing do
    clear
    draw_text($error.message, 10, 10, 20, RED)
    draw_text($error.backtrace.join("\n"), 10, 30, 20, BLACK) unless $error.backtrace.nil?
  end
end

def fetch_code
  code = get_attribute_from_element('#code', 'value')
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

  unless window_ready?
    init_window(800, 480, "Error!")
    set_target_fps(30)
  end

  set_main_loop 'error_main'
end
