import { sample } from 'lodash';
// utils
import mockImgAvatar from "../../img/avatar_default.jpg"

// ----------------------------------------------------------------------

const users = [...Array(5)].map((_, index) => ({
  id: '1',
  avatarUrl: mockImgAvatar,
  firstName: sample(['Mason','Kai','Azpilicueta', 'Kante']),
  lastName: sample(['Mount','Havertz','Ngolo','Cesar']),
  old: 22,
  gender: sample(['male', 'female']),
  phone: sample(['0122131312', '0121212111', '0121213111']),
  province: sample(['Cobham', 'London','German']),
  email: sample(['kancute@gmail.com', 'mount@gmail.com']),
  adress: sample(['Cobham', 'London','German']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer'
  ])
}));

export default users;
