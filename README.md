# zodiac-backend

Zero-dependency Node API. Send a name and date of birth, get back the zodiac
sign with a few fun facts. Frontend lives in
[zodiac-frontend](https://github.com/ashpect/zodiac-frontend).

## Run

    npm start        # http://localhost:4000 (PORT to override)

## API

    POST /api/zodiac
    {"name": "Ada", "dob": "1815-12-10"}
    curl -s localhost:4000/api/zodiac -d '{"name": "Ada", "dob": "1815-12-10"}'

Returns `sign`, `symbol`, `element`, `dates`, `bornOn`, `age` and `funFacts`.
Missing or malformed fields answer 400 with an `error`. `GET /health` answers
`{"ok": true}`.
