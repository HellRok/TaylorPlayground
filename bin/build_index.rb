#!/usr/bin/env ruby

def generate_example_selector
  examples = Dir.entries('./examples').reject! { _1.start_with?(".") }.sort
  option_elements = '';
  example_elements = '';

  examples.each { |example|
    puts "Adding #{example}"
    code = File.read(File.join('examples', example))
    option_elements += "<option value='##{example.gsub('.rb', '')}'>#{example}</option>"
    example_elements += "<div id='#{example.gsub('.rb', '')}' class='hidden'>#{code}</div>"
  }

  <<-EOS
    <select class="examples" id="example">#{option_elements}</select>
    #{example_elements}
  EOS
end

template = File.read('index.template.html')

template.gsub!('<!-- examples -->', generate_example_selector)

output = File.open('index.html', 'w')
output.write(template)
output.close
