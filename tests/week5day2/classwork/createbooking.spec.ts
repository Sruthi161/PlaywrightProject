import { expect, test } from "@playwright/test";

test(`Create a new booking using API's`, async ({ request }) => {
    const apiEndPoint = "https://restful-booker.herokuapp.com/booking"
    const apiPayload = {
        "firstname": "Manoj",
        "lastname": "Venu",
        "totalprice": 1500,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2024-01-01",
            "checkout": "2024-01-02"
        },
        "additionalneeds": "Breakfast"
    }
    const apiResponse = await request.post(apiEndPoint, { data: apiPayload })

    const statusCode = apiResponse.status()
    const responseBody = await apiResponse.json()
    const responseheaders = apiResponse.headers()
    const responseUrl = apiResponse.url()

    console.log(`Status code is ${statusCode}`)
    console.log(`Response body is`)
    console.log(responseBody)
    console.log(`Response headers are`)
    console.log(responseheaders)
    console.log(`Response Url is ${responseUrl}`)

    expect(statusCode).toBe(200)
    expect(responseBody.booking.firstname).toBe("Manoj")
    expect(responseBody.booking.lastname).toBe("Venu")

    console.log(`Booking id is ${responseBody.bookingid}`)

})