# Eva Backend Challenge

Requirements (software)
* docker
* docker-compose
* node

Setup
```
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d 
cd seeder 
npm start
```

Testing
```
docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```

Available endpoints

* POST /auth/login
* GET /bookings/consumed-medications 

Imagine it's your first day at Eva and you are fresh out of the onboarding process.
You've been assigned to the Backend team that will support the exploration experience at our Eva Centers in shopping malls.

Women book explorations through our website.
On the date of their exploration women visit the center, answer some questions about their health, and are scanned by our thermal cameras.
We recommend you watch this [video](https://youtu.be/12h-0qUdJag) for more context on the experience.

Back to work, you log into the issue tracker and find that you've already been assigned the following ticket:

```
ISSUE 01

The Science & Data team has detected a large correlation between consumed medications and breast cancer.
They've requested a new endpoint that will allow them to query explorations based on the consumed medications that were reported in the survey.

REQUIREMENTS

* Time based filtering, the team only wants to query a specific time frame at a time.
* Clinic filtering, the team only wants to query a specific clinic at a time.
* Filter by consumed medications STRICT MODE, the team wants to find out which explorations match ALL of the medications specified.
* Filter by consumed medications LAX MODE, the team wants to find out which explorations match ANY of the medications specified.
```

## Your mission, should you choose to accept it

- Clone this repo and create a repo of your own (DO NOT FORK THIS REPO).
- Seed a database of your choice with the provided explorations.
- Implement an API REST written in NodeJS with a framework of your choice that implements the required endpoint.
- Your api endpoint should be documented.
- Your api endpoint should be tested.
- Your api endpoint should not be public (Authentication).
- No other team (Customer Care, Growth, etc) should not be able to access the Science & Data endpoint (Roles/Authorization).
- It should be easy for your teammates to understand your repo and use your code in the unfortunate case of your sudden combustion.
