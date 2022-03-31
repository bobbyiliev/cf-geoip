## GEO IP LOOKUP SERVICE

Simple service that returns the country code of the IP address passed as an argument.

Mainly intended for use with the access summary script:

[BASH Script to Summarize Your NGINX and Apache Access Logs](https://devdojo.com/bobbyiliev/bash-script-to-summarize-your-nginx-and-apache-access-logs)

## Demo URL

https://cf-geoip.bobbyiliev.workers.dev/

## Endpoints

- `GET /` - Returns your IP address and the country code
- `GET /{ip}` - Returns the country code of the IP address passed as an argument.