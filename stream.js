import EventSource from "eventsource";
import generateReports from './report.js';

const stream_url = 'https://stream.wikimedia.org/v2/stream/revision-create';
let events = []; 


const startStream = ()=>{
    const eventSource = new EventSource(stream_url); 
    console.log("Connected to Wikipead stream. Collective data..."); 
    eventSource.onmessage = (event)=>{
        const data = JSON.parse(event.data); 
        events.push({...data, timestamp: Date.now()}); 
    }; 
    setInterval(()=>{
        const now = Date.now(); 
        const windowEvents = events.filter(e=>now - e.timestamp<=5*60*1000); 
        generateReports(windowEvents); 
        events = windowEvents; 
    }, 60*1000); 
}

export default startStream; 