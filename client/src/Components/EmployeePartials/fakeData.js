import { sample } from 'lodash';
// utils
import mockImgAvatar from "../../img/avatar_default.jpg"

// ----------------------------------------------------------------------

const users = [...Array(5)].map((_, index) => ({
  id: '1',
  avatarUrl: mockImgAvatar,
  name: 'Mason Mount',
  company: "Chelsea",
  isVerified: "True",
  status: sample(['active', 'banned']),
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
