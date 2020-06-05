import axios from 'axios';

export const API_BASE_URL = '178.62.102.69:8080/api/v1';
export const API_JOB_URL = `${API_BASE_URL}/jobs`;
export const API_WORKER_SIGNUP_URL = `${API_BASE_URL}/signup/worker`;
export const API_RESTAURANT_SIGNUP_URL = `${API_BASE_URL}/signup/restaurant`;
export const HTTP_PROTOCOL = 'http://';
export const WEBSOCKET_PROTOCOL = 'ws://';
export const API_LOGIN_URL = `${API_BASE_URL}/login`;

export async function getJobRequest() {
    const jobsObjList = []
    let response = await sendHttpGetRequest(API_JOB_URL);
    if(response.status === 200){
        return convertDataToJobCardData(response.data.jobsList);
    } else {
        return jobsObjList;
    }
}


export async function getLoginRequest(params) {
    let response = await sendHttpPostRequest(params, API_LOGIN_URL );
    if(response.status === 200){
        return {data: response.data, isSuccessful: true};
    } else {
        return {isSuccessful: false};
    }
}

export async function sendJobRequest(data, restaurantId, expertiseId) {
    data.restaurantId = restaurantId;
    data.expertiseId = expertiseId;
    return await sendHttpPostRequest(data, API_JOB_URL)
}

async function sendSignup(data, url) {
    let response = await sendHttpPostRequest(data, url)
    console.log(JSON.stringify(response))
    if (response === undefined) {
        return {isSuccesful: false}
    }
    if (response.status === 201) {
        return {data: response.data, isSuccessful: true}
    }
    return {isSuccessful: false}
}

export async function sendWorkerSignup(data) {
    return await sendSignup(data, API_WORKER_SIGNUP_URL)
}

export async function sendRestaurantSignup(data) {
    return await sendSignup(data, API_RESTAURANT_SIGNUP_URL)
}

async function sendHttpPostRequest(data, url) {
    let responseObject = {}
    await axios.post(`${HTTP_PROTOCOL}${url}`, data, dontStoreCache).then( (response) => {
        console.log(JSON.stringify(response))
        responseObject = response
    }).catch( (error) => {
        console.log(JSON.stringify(error))
        responseObject = error.response
    });
    return responseObject
}

let dontStoreCache = {
    headers: {
        'Cache-Control': 'no-store'
    }
}


async function sendHttpGetRequest(url, params) {
    let responseObject = {}
    await axios.get(`${HTTP_PROTOCOL}${url}`, dontStoreCache).then( (response) => {
        console.log(JSON.stringify(response))
        responseObject = response;
    }).catch( (error) => {
        console.log(JSON.stringify(error))
        responseObject = error.response;
    });
    return responseObject
}

export function convertDataToJobCardData(data) {
    console.log(JSON.stringify(data))
    let jobs = data.jobsList
    const jobsObjList = []
    let jobObj = {
        id: '',
        name: '',
        date: '',
        startTime: '',
        endTime: '',
        hourlyRate: '',
        extraInfo: '',
    };
    for (i = 0; i < jobs.length; i++) {
        const job = jobs[i].job
        jobObj = {
            id: job._id,
            name: jobs[i].restaurant.name,
            date: "Date: " + job.date,
            startTime: "Start Time: " + job.startTime,
            endTime: "End Time: " + job.endTime,
            hourlyRate: "Hourly Rate: " + job.hourlyRate,
            extraInfo: "Extra Info: " + job.extraInfo
        }
        jobsObjList.push(jobObj)
    }
    console.log(JSON.stringify(jobsObjList))
    return jobsObjList;
}
