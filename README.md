# Backbone on Sinatra Boilerplate
## Setup
Install the necessary gems:

    gem install sinatra

Install the Grunt build tool dependencies:

    npm install

Run grunt dev command to compile the library dependencies:

    grunt dev

Run the Sinatra server on rack:

    rackup

## To Use During Development

Tell grunt to watch the related files:

    grunt watch

## To Compile for Production

Grunt will build the coffee script files and minify all resource files using the following command:

    grunt build