require 'sinatra'

class Project < Sinatra::Application
	get '/' do
		erb :index
	end
end