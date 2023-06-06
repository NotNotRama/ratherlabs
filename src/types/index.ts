export interface Student {
  name: string;
  age: number;
  gender: string;
  room: string;
}

export interface Classroom {
  id: number;
  name: string;
  capacity: number;
  students: Student[];
}
