import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {Card, List, Title, Paragraph} from 'react-native-paper';
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
      console.log(jobsList.filter(job => job.workerId !== workerId).length === 0)

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

   function EmptyJobOffers(){
    let shouldShow = jobsList.filter(job => job.workerId !== workerId).length === 0 && !props.accepted;
    if (shouldShow) {
      return (<View>
        <Card style={{marginTop: 30 , marginHorizontal: 10}}>
        <Card.Content>
          <Title>No Jobs Currently Available</Title>
          <Paragraph>Make sure to keep you profile update to increase chances of getting a job!</Paragraph>
        </Card.Content>
      </Card>
      </View>);
    } else {
      return null;
    }
  }
  function EmptyAcceptedOffers(){
    let shouldShow = jobsList.filter(job => job.workerId === workerId).length === 0 && props.accepted;
    if (shouldShow) {
      return (<View>
        <Card style={{marginTop: 30,  marginHorizontal: 10}}>
          <Card.Content >
            <Title>You Have Not Accepted Any Jobs Yet!</Title>
            <Paragraph>Make sure to keep you profile update to increase chances of getting a job!</Paragraph>
          </Card.Content>
        </Card>
      </View>);
    } else {
      return null;
    }
  }



  return (
    <ScrollView >
      <List.Section style={{marginTop:30}}>
        <EmptyJobOffers/>
        <EmptyAcceptedOffers/>
        {jobsList.map(jobCardMaker)}
      </List.Section>
    </ScrollView>
  );

}



