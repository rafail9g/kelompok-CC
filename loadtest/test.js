import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },   // normal
    { duration: '1m',  target: 300 },  // lonjakan
    { duration: '30s', target: 20 },   // turun
  ],
};

export default function () {
  http.get('http://localhost:8080/api/heavy');
  sleep(0.2);
}
