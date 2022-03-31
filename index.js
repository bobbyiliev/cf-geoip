import { Router } from 'itty-router'

// Create a new router
const router = Router()

router.get("/", async request => {
  // Get visitor IP
  let ip = request.headers.get('cf-connecting-ip') || 'unknown'
  // Get visitor country
  const country = request.cf.country
  // Return a response with the IP and country
  return new Response(`${ip} - ${country}`)

})

router.get("/:ip", ({ params }) => {
  // Decode text like "Hello%20world" into "Hello world"
  const ip = decodeURIComponent(params.ip)
  // Check if valid IP
  if (ip.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
    return fetch(`https://bobbyiliev.com/ip.php?ip=${ip}`)
  } else {
    // Return a response with the IP and country
    return new Response(`${ip} is not a valid IP`)
  }

})

/*
This is the last route we define, it will match anything that hasn't hit a route we've defined
above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).

Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all("*", () => new Response("404, not found!", { status: 404 }))

/*
This snippet ties our worker to the router we deifned above, all incoming requests
are passed to the router where your routes are called and the response is sent.
*/
addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
})