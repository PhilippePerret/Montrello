# encoding: UTF-8
# frozen_string_literal: true
=begin
	Chargement de toutes les données par type
=end
require 'yaml'

type = Ajax.param(:type)

path_type = File.join(APP_FOLDER,'data','montrello', type.to_s)

data =
if File.exist?(path_type)
	Dir["#{path_type}/*.yaml"].collect do |fpath|
		YAML.load_file(fpath)
	end
else
	[]
end

Ajax << {data:data, type:type}