import { expect, test } from "@playwright/test";

test(`Post Request Testing`, async ({ request }) => {
    const apiEndPoint = "https://reqres.in/api/register"
    const apiPayload = {
        "email": "eve.holt@reqres.in",
        "password": "pistol"
    }
    const apiResponse = await request.post(apiEndPoint, { data: apiPayload })
  
    const statusCode = apiResponse.status()
    const responseBody = await apiResponse.json()
    const responseheaders = apiResponse.headers()
    const responseUrl = apiResponse.url()

    console.log(`Status code is ${statusCode}`)
    console.log(`Response body is`)
    console.log(responseBody)
    console.log(`Token from resp body is ${responseBody.token}`)
    console.log(`Response headers are`)
    console.log(responseheaders)
    console.log(`Response Url is ${responseUrl}`)

    expect(statusCode).toBe(200)

})