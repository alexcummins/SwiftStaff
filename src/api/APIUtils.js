import axios from 'axios';
export const API_BASE_URL = '178.62.102.69:8080/api/v1';
export const API_JOB_URL = `${API_BASE_URL}/jobs`;
export const HTTP_PROTOCOL = 'http://'
export const WEBSOCKET_PROTOCOL = 'ws://'
export  async function getJobs() {
  let jobObj = {
    id: '',
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    hourlyRate: '',
    extraInfo: '',
  };
  const jobsObjList = []
  await axios.get(API_JOB_URL).then(function (response) {
    return convertDataToJobCardData(response.data.jobsList)
  }).catch(function (error) {
    console.log(JSON.stringify(error))
  });

  return jobsObjList;
}

export  async function sendRequest(data) {
  axios.post(`${HTTP_PROTOCOL}${API_JOB_URL}`, data).then(function (response) {
    console.log(JSON.stringify(response))
  }).catch(function (error) {
    console.log(JSON.stringify(error))
  });
}

export function convertDataToJobCardData(data){
  console.log(JSON.stringify(data));
  let jobs = data.jobsList;
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
  for(i = 0; i < jobs.length; i++){
    const job = jobs[i]
    jobObj = {
      id: job._id,
      name: "Test restaurant",
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
