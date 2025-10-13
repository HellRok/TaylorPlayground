# Add the path ./vendor so we can easily require third party libraries.
$: << './vendor'

puts "INFO: Playground made using Taylor v#{TAYLOR_VERSION}"

$main = -> {}
$original_main_loop = method(:set_main_loop).to_proc

def set_main_loop(method)
  $main = method(method)
  $original_main_loop.call("__playground_main")
end

def __playground_main
  $main.call
rescue StandardError => error
  puts "trace (most recent call last):"
  puts error.backtrace.reverse.map.with_index { |line, index|
    "\t[#{error.backtrace.size - index}] #{line}"
  }.join("\n") if error.backtrace
  puts "#{error} (#{error.class})"
end

def fetch_code
  code = get_attribute_from_element('#code', 'value')
  example = File.open('example.rb', 'w')
  example.write(code)
  example.close
end

fetch_code

require %q(./example)
