import axios from 'axios';
import localIp from '../../ip';

const api = axios.create({
    baseURL:`http://${localIp}:3333` // React Native da bugs ao utilizar localhost
});

export { api };