#!/usr/bin/env taylor

template = File.read('index.template.html')

template.gsub!('<!-- index.js -->', File.read('app/javascripts/index.js'))
template.gsub!('<!-- index.css -->', File.read('app/stylesheets/index.css'))

output = File.open('index.html', 'w')
output.write(template)
output.close
