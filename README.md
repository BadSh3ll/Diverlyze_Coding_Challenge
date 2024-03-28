# Diverlyze_Coding_Challenge

# Survey Score API

This is a simple API that calculates the average score for each gender in a survey.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- yarn/npm

### Installing

1. Clone the repository: `git clone https://github.com/iamthienthanh/Diverlyze_Coding_Challenge`
2. Navigate to the project directory: `cd Diverlyze_Coding_Challenge`
3. Install the dependencies: `yarn`

## Usage
Before running the server, make sure to provide a `survey.json` file in the root directory of the project, otherwise it will throw an error. This file should contain the survey data in the following format:

```json
[
    {
        "gender": "female",
        "score": 7
    },
    {
        "gender": "male",
        "score": 8
    },
    // more responses...
]
```
Run `yarn dev`

The API has one endpoints:

- `/scores`: This endpoint returns the average score for each gender in the survey. If any gender has less than 3 responses, all scores are set to 0.

To send a request to an endpoint, use a tool like curl or Postman. Then you would send a GET request to `http://localhost:8000/scores`.

## Running the tests

To run the tests, use the command `yarn test`.

## Built With

- [Express](https://expressjs.com/) - The web framework used
- [Morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js
- [dotenv](https://www.npmjs.com/package/dotenv) - Zero-dependency module that loads environment variables from a `.env` file into `process.env`
