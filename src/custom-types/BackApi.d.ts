interface UserData {
  _id: string;
  email: string;
  username: string;
  name: string;
  userId: string;
}
interface MeetingData {
  _id: string;
  meetingId: string;
  meetingName: string;
  startedDate: string;
  finishedDate: string;
  ongoing: boolean;
  creator: Omit<UserData, 'email'>;
  chat: Omit<UserData, 'email'>[];
  members: string[];
}

interface GroupData {
  _id: string;
  groupId: string;
  name: string;
  creator: string;
  members: string[];
  meetings: string[];
}
