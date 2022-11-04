import axios from 'axios';

export const AxiosConnect = axios.create({
    baseURL:"https://thewasserstoff.herokuapp.com/",//"http://localhost:1369",
    headers:{
        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUowYjJ0bGJpSTZJblJvWlhkaGMzTmxjbk4wYjJabUlpd2lhV0YwSWpveE5qWTNOREkyTURBd0xDSmxlSEFpT2pFMk5qYzBNamt3TURCOS4xeDhFemJxdEgzVVFvR1FpdXNBV1VkNTFFTWxwOElRSFV4UzZRRGVNbEhrIiwiaWF0IjoxNjY3NDI2NDk0LCJleHAiOjE2Njc0Mjk0OTR9.ifnIU6w7_x_0h-LZ3zutFdnepbMdJKuMBrFnj-kcqrA'
    }
})