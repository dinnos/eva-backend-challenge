# Eva Backend Challenge

Requirements (software)
* docker v19.03.4
* docker-compose v1.24.1
* node min version v10.X.X

Technologies Stack
* Node v12 provide by docker
* Nestjs v6.10.5
    * Typescript 3.7
    * Json Web Token (JWT)
* Mongodb v4.2

Setup
```
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d 
cd seeder 
npm start
```

Once you run the setup commands you will have access to the api  
In order to use it you will need to get a token by making a POST request to localhost:3000/auth/login with the following example {username: "science_data", password: "science_data"} now the next requests need to setup a Authorization Header with the following value "Bearer ${token receive from /auth/login}".  
The get the consumed-medications perform a GET request to localhost:3000/booking/consumed-medications this request needs the next payload: 
```
{
   period: {
      start: Date,
      end?: Date, // (Optional)
   },
   
   clinicName: string,
   
   isStrict: boolean,
   
   consumedMedications: string[]
}
```

Testing
```
docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```

Folder structure
```
/
|---.envs
|---apps
|   |---challenge
|       |---src
|       |   |---auth
|       |   |   |---decorators
|       |   |   |---guards
|       |   |   |---interfaces
|       |   |   |---schemas
|       |   |   |---strategies
|       |   |---booking
|       |   |   |---dto
|       |   |   |---schemas
|       |   |---shared
|       |       |---decorators
|       |       |---dto
|       |       |---interfaces
|       |       |---utils
|       |       |---validators
|       |---test
|---seeder
|   |---src
|       |---seeds
|       |---utils
|   docker-compose.override.yml
|   docker-compose.test.yml
|   docker-composee.yml
```

- .envs  
Contains all the environment files required for the docker-compose services
    - .db.env  
       username and password required for mongodb image
    -  backend.env  
       set mongo default database and mongo uri required for app service (Docker)
- apps 
Contain a folder for each development app, all the apps contains his single Dockerfile
    - challenge app  
      REST API to serve the explorations resources 
      - src contains the source code of the API divided into modules
        - Auth module
          Serves the auth resource with the following endpoints the strategies folder contains files with particular implementations of [passport](http://www.passportjs.org/) strategies (auth) 
          POST /auth/login  handle the user authentication in base a Passport local strategy (username, password)
        - Booking module 
          Code related with the bookings - explorations resource
          GET /booking/consumed-medications (need Authentication/Authorization)
        - Shared module  
          Contains libs, classes, etc, that are useful or need for all other modules 
      - test folder with all the e2e tests of the API
- seeder  
Node script that fills the database with default information
    - seeds folder
      contains a json file for each database collection 
    - utils  
      Group of libraries that transform and read the json files of the seed folder so that they are provided to the entry point of the script (index.js)
- docker-compose files
    - docker-compose.yml File that contains the default services configuration for all environments
    - docker-compose.override.yml Overrides the services for development env
    - docker-compose.test.tml Overrides the services for test env
    
schemas folders  
Files that declare the mongodb document of the module

guards folders
Handler interceptors that validates conditions to give access to particular resource (endpoint)

dto folders
Classes that works like payloads for the resources (endpoints) if the body or an other part of the request didn't meet the required attributes of the class throws an 400 error
 
decorators folders
Provides custom decorator to inject attributes into the handlers


