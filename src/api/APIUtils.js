import axios from 'axios';
import FormData from "form-data";

export const API_BASE_URL = '139.59.200.194:8080/api/v1';
// export const API_BASE_URL = 'localhost:8080/api/v1';

export const API_JOB_URL = `${API_BASE_URL}/jobs`;
export const API_WORKER_JOB_URL = `${API_BASE_URL}/jobs/worker`;
export const API_WORKER_SIGNUP_URL = `${API_BASE_URL}/signup/worker`;
export const API_RESTAURANT_SIGNUP_URL = `${API_BASE_URL}/signup/restaurant`;
export const API_RESTAURANT_DELETE_JOB = `${API_BASE_URL}/jobs/delete`
export const HTTP_PROTOCOL = 'http://';
export const WEBSOCKET_PROTOCOL = 'ws://';
export const API_LOGIN_URL = `${API_BASE_URL}/login`;
export const API_PROFILE_WORKER = `${API_BASE_URL}/profile/worker`
export const API_PROFILE_RESTAURANT = `${API_BASE_URL}/profile/restaurant`
export const API_NEW_RATING_WORKER = `${API_BASE_URL}/new/rating/worker`
export const API_EDIT_PROFILE_RESTAURANT = `${API_BASE_URL}/edit/profile/restaurant`
export const API_IMAGE_UPLOAD = `${API_BASE_URL}/uploads`
export const API_IMAGE_DOWNLOAD = `${API_BASE_URL}/downloads`
export const API_IMAGE_DOWNLOAD_URI = `${HTTP_PROTOCOL}${API_IMAGE_DOWNLOAD}`
export const API_EDIT_PROFILE_WORKER = `${API_BASE_URL}/edit/profile/worker`

export async function getJobRequest(workerId) {
    const jobsObjList = []
    let response = await sendHttpPostRequest(workerId, API_WORKER_JOB_URL);
    if(response.status === 200){
        return convertDataToJobCardData(response.data);
    } else {
        return jobsObjList;
    }
}

export async function deleteJob(jobId) {
    let response = await sendHttpPostRequest(jobId, API_RESTAURANT_DELETE_JOB);
    if(response.status === 200){
        return {isSuccessful: true};
    } else {
        return {isSuccessful: false};
    }
}


export async function getLoginRequest(params) {
    let response = await sendHttpPostRequest(params, API_LOGIN_URL);
    console.log(response.data);
    if(response.status === 200){
        return {data: response.data, isSuccessful: true};
    } else {
        return {isSuccessful: false};
    }
}


export async function getRestaurantProfile(params) {
    console.log(`Getting restaurant profile with restaurantId ${params.restaurantId}`)
    let response = await sendHttpPostRequest(params, API_PROFILE_RESTAURANT)
    if (response.status === 200) {
        return response.data
    }
}

export async function getWorkerProfile(params) {
    let response = await sendHttpPostRequest(params, API_PROFILE_WORKER)
    if (response.status === 200) {
        return response.data
    }
}

export async function updateWorkerProfile(params) {
    let response = await sendHttpPutRequest(params, API_EDIT_PROFILE_WORKER)
    if (response.status === 200) {
        return response.data
    }
}

export async function sendNewWorkerRating(params) {
    let response = await sendHttpPutRequest(params, API_NEW_RATING_WORKER)
    if (response.status === 200) {
        return response.data
    }
}

export async function updateRestaurantProfile(params) {
    let response = await sendHttpPutRequest(params, API_EDIT_PROFILE_RESTAURANT)
    if (response.status === 200) {
        return response.data
    }

}

export async function sendJobRequest(data, restaurantId, expertiseId) {
    // data.restaurantId = restaurantId;
    // data.expertiseId = expertiseId;
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

export async function sendWorkerAcceptDecline(data) {
    const jobsObjList = []
    let response =  await sendHttpPatchRequest(data, API_JOB_URL)
    if(response.status === 200){
        let  jobsObjList = convertDataToJobCardData(response.data);
        return {jobObjList: jobsObjList, isSuccessful: true}

    } else {
        return {jobObjList: jobsObjList, isSuccessful: false};
    }
}

export async function sendRestaurantAcceptDecline(data) {
    const jobsObjList = []
    let response =  await sendHttpPatchRequest(data, API_JOB_URL)
    if(response.status === 200){
        let  jobsObjList = convertDataToReviewCardData(response.data);
        return {jobObjList: jobsObjList, isSuccessful: true}
    } else {
        return {jobObjList: jobsObjList, isSuccessful: false};
    }
}

export async function sendWorkerSignup(data) {
    return await sendSignup(data, API_WORKER_SIGNUP_URL)
}

export async function sendRestaurantSignup(data) {
    return await sendSignup(data, API_RESTAURANT_SIGNUP_URL)
}

export async function uploadImage(localURI: string, userType : string, userId: string, resourceName : string) {
    console.log("Here")
    let data = new FormData()
    data.append("user-type", userType)
    data.append("user-Id", userId)
    data.append("resource-name", resourceName)
    data.append("photo-load", {uri: localURI, name: resourceName, type: "image/jpg"})
    return await sendMultiPartPostRequest(data, `${API_IMAGE_UPLOAD}`)
}

async function sendHttpPatchRequest(data, url){
    let responseObject = {}
    await axios.patch(`${HTTP_PROTOCOL}${url}`, data).then((response) => {
        console.log(JSON.stringify(response))
        responseObject = response
    }).catch( (error) => {
        console.log(JSON.stringify(error))
        responseObject = error.response
    });
    return responseObject
}

async function sendHttpPostRequest(data, url, headers : any = dontStoreCache) {
    let responseObject = {}
    await axios.post(`${HTTP_PROTOCOL}${url}`, data, headers).then( (response) => {
        console.log(JSON.stringify(response))
        responseObject = response
    }).catch( (error) => {
        console.log(JSON.stringify(error))
        responseObject = error.response
    });
    return responseObject
}

async function sendHttpPutRequest(data, url, headers : any = dontStoreCache) {
    let responseObject = {}
    await axios.put(`${HTTP_PROTOCOL}${url}`, data, headers).then( (response) => {
        console.log(JSON.stringify(response))
        responseObject = response
    }).catch( (error) => {
        console.log(JSON.stringify(error))
        responseObject = error.response
    });
    return responseObject
}

async function sendMultiPartPostRequest(data : FormData, url) {
    await sendHttpPostRequest(data, url, {
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-UK,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'Cache-Control': 'no-store'
        }})
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

let dontStoreCache = {
    headers: {
        'Cache-Control': 'no-store'
    }
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
        latitude: 0.0,
        longitude: 0.0,
        restaurantRating: 5,
        restaurantId: ''
    };
    for (i = 0; i < jobs.length; i++) {
        const job = jobs[i].job
        jobObj = {
            id: job._id,
            name: jobs[i].restaurant.name,
            date:  job.date,
            startTime:  job.startTime,
            endTime: job.endTime,
            hourlyRate: job.hourlyRate,
            extraInfo: job.extraInfo,
            latitude: jobs[i].restaurant.latitude,
            longitude: jobs[i].restaurant.longitude,
            restaurantRating: jobs[i].restaurant.rating,
            restaurantId: jobs[i].restaurant._id,
            reviewList: job.reviewList,
            workerId: job.workerId
        }
        jobsObjList.push(jobObj)
    }
    console.log(JSON.stringify(jobsObjList))
    return jobsObjList;
}

export function convertDataToReviewCardData(data) {
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
        latitude: 0.0,
        longitude: 0.0,
        restaurantRating: 5,
        credentials: [],
        restaurantId: ''
    };

    for (i = 0; i < jobs.length; i++) {
        const job = jobs[i].job
        const workersObjList = []

        jobObj = {
            id: job._id,
            date:  job.date,
            startTime:  job.startTime,
            endTime: job.endTime,
            hourlyRate: job.hourlyRate,
            extraInfo: job.extraInfo,
            reviewList: job.reviewList,
            isConfirmed: job.status === 1,
            credentials: job.credentials,
            confirmedWorkerId: job.workerId
        }

        const workers = jobs[i].workers
        let j;
        for (j = 0; j < workers.length; j++) {
            const worker = workers[j]
            const workerObj = {
                id: worker._id,
                fname: worker.fname,
                lname: worker.lname,
                phone: worker.phone,
                ratingTotal: worker.ratingTotal,
                ratingCount: worker.ratingCount
            }
            workersObjList.push(workerObj)
        }
        jobsObjList.push({jobObj: jobObj, workersObj: workersObjList})
    }
    console.log("Job objects fetched:")
    console.log(JSON.stringify(jobsObjList))
    return jobsObjList;
}
