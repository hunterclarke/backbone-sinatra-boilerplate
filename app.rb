require 'sinatra'

class Project < Sinatra::Base
	get '/' do
		erb :index
	end
end