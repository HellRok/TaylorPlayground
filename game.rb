# Add the path ./vendor so we can easily require third party libraries.
$: << './vendor'

puts "INFO: Playground made using Taylor v#{TAYLOR_VERSION}"

def fetch_code
  $code = get_attribute_from_element('#code', 'value')
  example = File.open('example.rb', 'w')
  example.write($code)
  example.close

  begin
    require %q(./example)
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
