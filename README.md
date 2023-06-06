# Rather Labs take home

This project is a School Management System that allows you to create and manage classrooms, add students to classrooms, and view classroom details. It is built using React, Next.js, React Query, Chakra UI, and Prisma.

## Prerequisites

- Node.js (v14 or higher)
- Yarn package manager

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/NotNotRama/ratherlabs.git
```

2. Navigate to the project directory:

```bash
cd ratherlabs
```

3. Install the dependencies:
```bash
yarn
```

4. Start the development server:
```bash
yarn dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Screens

### Index

The "Index" screen provides an overview of all the rooms. It displays a list of existing rooms and their basic information. From this screen, you can navigate to the details of a specific room.

### Create classroom

The "Create Classroom" screen allows you to create new rooms. Fill in the required details such as room name and capacity to create a new room.

### Individual classroom

The "Classroom Details" screen (located at `[id].tsx`) shows the details of a specific room, including its participants (students). It provides information about the room's capacity and a list of students belonging to that room.

### Add Student

The "Add Student" screen allows you to add students to the system. Specify the student's name, age, gender, and select the room to which they belong. The form includes validation to ensure the correct input format.

## Technologies Used

- React
- Next.js
- Chakra UI
- Prisma
- React Query
- Axios

## Demo

Here are some animated GIFs showcasing the functionality of the application:

### Classroom Creation

![Classroom Creation](https://i.imgur.com/pvS62DI.gif)

### Student Creation

![Student Creation](https://i.imgur.com/y9LL2QD.gif)


