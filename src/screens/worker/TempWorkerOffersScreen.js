import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import {API_JOB_URL, convertDataToJobCardData, WEBSOCKET_PROTOCOL} from '../../api/APIUtils';
import UserCard from '../../components/UserCard';
import AsyncStorage from '@react-native-community/async-storage';

let retrieveNotifications = () => {}
export default function TempWorkerOffersScreen( props) {
  const [jobsList, setJobsList] = useState(props.preFetchDataJobList);
  const [workerId, setWorkerId] = useState('')
  useFocusEffect(

    React.useCallback(() => {
      var ws = {};
      const asyncWorker = AsyncStorage.getItem('workerId').then((asyncWorkerId) => {
          setWorkerId(asyncWorkerId);

          const workerIdSocketString = `workerId: ${asyncWorkerId}`;
          console.log(`${WEBSOCKET_PROTOCOL}${API_JOB_URL}`);
          ws = new WebSocket(`${WEBSOCKET_PROTOCOL}${API_JOB_URL}`);
          ws.onopen = (e) => {
            console.log(workerIdSocketString);
            ws.send(workerIdSocketString);
          };

          ws.onerror = (e) => {
            console.log(e.message);
          };

          ws.onclose = (e) => {
            console.log(e.code, e.reason);
          };

          ws.onmessage = (e) => {
            console.log(JSON.stringify(e))
            if (e.data === 'update') {
              retrieveNotifications();
            } else {
              const newList = convertDataToJobCardData(JSON.parse(e.data));
              if (newList.length !== 0) {
                setJobsList(newList.reverse());
              }
            }
          };
          retrieveNotifications = async () => {
           ws.send(workerIdSocketString);
          };

        },
      );
      return () => {
        ws.close();
      };

    }, []))
  const updateJobsList = (newList) => {
    setJobsList(newList)
  }

  function jobCardMaker(job) {
    if(props.accepted){
      if(job.workerId === workerId){
        return (<UserCard data={job} workerId={workerId} key={job.id} accepted={true} updateCallBack={updateJobsList}/>)
      } else {
        return null
      }
    } else {
      if(job.workerId === workerId){
        return null
      } else {
        return (<UserCard data={job} workerId={workerId} key={job.id}  accepted={false} updateCallBack={updateJobsList}/>)
      }
    }
  }



  return (
    <ScrollView >
      <List.Section style={{marginTop:30}}>
        {jobsList.map(jobCardMaker)}
      </List.Section>
    </ScrollView>
  );

}



