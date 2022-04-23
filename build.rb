#!/usr/bin/env taylor

def generate_example_selector
  examples = Dir.entries('./examples').reject! { _1 == '.' || _1 == '..' }
  select_element = '<select id="example">';
  example_elements = '';

  examples.each { |example|
    code = File.read(File.join('examples', example))
    select_element += "<option value='##{example.gsub('.rb', '')}'>#{example}</option>"
    example_elements += "<div id='#{example.gsub('.rb', '')}' class='hidden'>#{code}</div>"
  }

  <<-EOS
    #{select_element}</select>
    #{example_elements}
  EOS
end

template = File.read('index.template.html')

template.gsub!('<!-- examples -->', generate_example_selector)

output = File.open('index.html', 'w')
output.write(template)
output.close
