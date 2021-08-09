import { hostname } from './hostname';

export const websocket = new WebSocket(`ws://${hostname}:3012`)

//get ip address for anonymous user identification without requiring a sign up (such as chat)
/*
websocket.onopen = function(event) {
  websocket.send('IPAssignmentMessage')
}
*/