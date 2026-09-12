import { expect, test } from "@playwright/test";

test.describe(`Hotel Bookings`, async () => {
    test.describe.configure({mode:"serial"})
    
    let bookingId: any;
    let authToken: any;

    test(`TC001 - Create a new booking using API's`, async ({ request }) => {
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

        console.log(`Status code for Create Booking is ${statusCode}`)
        console.log(`Response body for Create Booking is`)
        console.log(responseBody)
        console.log(`Response Url for Create Booking is ${responseUrl}`)

        expect(statusCode).toBe(200)
        expect(responseBody.booking.firstname).toBe("Manoj")
        expect(responseBody.booking.lastname).toBe("Venu")

        bookingId = responseBody.bookingid

        console.log(`Booking id is ${bookingId}`)
    })

    test(`TC002 - Get booking details`, async ({ request }) => {
        const apiEndPoint = `https://restful-booker.herokuapp.com/booking/${bookingId}`
        const apiResponse = await request.get(apiEndPoint)

        const statusCode = apiResponse.status()
        const responseBody = await apiResponse.json()
        const responseheaders = apiResponse.headers()
        const responseUrl = apiResponse.url()

        console.log(`Status code for Get Booking is ${statusCode}`)
        console.log(`Response body for Get Booking is`)
        console.log(responseBody)
        console.log(`Response Url for Get Booking is ${responseUrl}`)

        expect(statusCode).toBe(200)
        expect(responseBody.firstname).toBe("Manoj")

    })

    test(`TC003 - Get all booking Id's and verify if my booking id is present`, async ({ request }) => {
        const apiEndPoint = `https://restful-booker.herokuapp.com/booking`
        const apiResponse = await request.get(apiEndPoint)

        const statusCode = apiResponse.status()
        const responseBody:[] = await apiResponse.json()

        console.log(`Status code is ${statusCode}`)
        console.log(`Response body is`)
        console.log(responseBody)

        expect(statusCode).toBe(200)

        // responseBody.forEach((bookingObj: any) => {
        //     if (bookingObj.bookingid == bookingId) {
        //         console.log(`My Booking id ${bookingId} is present in the database`)
        //     }
        // })

        expect(responseBody, `Trying to verify booking id is present in database`).toContainEqual({ "bookingid": bookingId })
        
    })

    test(`TC004 - Create Auth Token`, async ({ request }) => {
        const apiEndPoint = "https://restful-booker.herokuapp.com/auth"
        const apiPayload = {
            "username": "admin",
            "password": "password123"
        }
        const apiHeader = {
            "content-type": "application/json"
        }
        const apiResponse = await request.post(apiEndPoint, { data: apiPayload, headers: apiHeader })

        const statusCode = apiResponse.status()
        const responseBody = await apiResponse.json()

        console.log(`Status code for Create Auth Token is ${statusCode}`)
        console.log(`Response body for Auth Token is`)
        console.log(responseBody)

        expect(statusCode).toBe(200)
        authToken = responseBody.token
        
    })

    test(`TC005 - Delete Booking & verify if it is not in database`, async ({ request }) => {
        const apiEndPoint = `https://restful-booker.herokuapp.com/booking/${bookingId}`
        const apiHeader = {
            "content-type": "application/json",
            "cookie": `token=${authToken}`
        }
        const apiResponse = await request.delete(apiEndPoint, {headers: apiHeader})

        const statusCode = apiResponse.status()

        console.log(`Status code for Delete Booking is ${statusCode}`)
        console.log(`Response for Delete Booking is`)
        console.log(apiResponse)

        expect(statusCode).toBe(201)
    })

    test(`TC006 - Get all booking Id's and verify if my booking id is not present`, async ({ request }) => {
        const apiEndPoint = `https://restful-booker.herokuapp.com/booking`
        const apiResponse = await request.get(apiEndPoint)

        const statusCode = apiResponse.status()
        const responseBody: [] = await apiResponse.json()

        console.log(`Status code is ${statusCode}`)
        console.log(`Response body is`)
        console.log(responseBody)

        expect(statusCode).toBe(200)
        expect(responseBody, `Trying to verify booking id is not present in database`).not.toContainEqual({ "bookingid": bookingId })

    })
    
})