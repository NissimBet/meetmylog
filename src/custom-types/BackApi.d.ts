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
  creator: MeetingCreator;
  chat: Chat[];
  members: Pick<UserData, 'userId', 'username', 'name'>[];
}

interface MeetingCreator extends Omit<UserData, 'email'> {}

interface Chat {
  _id: string;
  from: Omit<UserData, 'email'>;
  message: string;
  timeSent: string;
}

interface GroupData {
  _id: string;
  groupId: string;
  name: string;
  creator: UserData;
  members: UserData[];
  meetings: MeetingData[];
}
