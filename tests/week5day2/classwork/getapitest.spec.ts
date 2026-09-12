import { expect, test } from "@playwright/test";

test(`Get Request Testing`, async ({ request }) => {
    const apiEndPoint = "https://reqres.in/api/users/4"
    const apiResponse = await request.get(apiEndPoint)

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
    expect(responseBody.data.email).toBe("eve.holt@reqres.in")

})