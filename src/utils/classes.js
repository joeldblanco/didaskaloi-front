// const classSchema = new Schema({
//     name: {
//       type: String,
//       required: true,
//     },
//     day: {
//       type: String,
//       required: true,
//     },
//     time: {
//       type: String,
//       required: true,
//     },
//     students: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Student",
//       },
//     ],
//   });

const classes = [
  {
    id: "1",
    name: "Contigo Perú",
    day: "Monday",
    time: "10:00",
    students: [
      {
        name: "Student 1",
      },
      {
        name: "Student 2",
      },
      {
        name: "Student 3",
      },
    ],
  },
  {
    id: "2",
    name: "Huayán",
    day: "Tuesday",
    time: "11:00",
    students: [
      {
        name: "Student 4",
      },
      {
        name: "Student 5",
      },
      {
        name: "Student 6",
      },
    ],
  },
  {
    id: "3",
    name: "Macatón",
    day: "Wednesday",
    time: "12:00",
    students: [
      {
        name: "Student 7",
      },
      {
        name: "Student 8",
      },
      {
        name: "Student 9",
      },
    ],
  },
  {
    id: "4",
    name: "Villaclub de Nazaret",
    day: "Thursday",
    time: "13:00",
    students: [
      {
        name: "Student 10",
      },
      {
        name: "Student 11",
      },
      {
        name: "Student 12",
      },
    ],
  },
  {
    id: "5",
    name: "Victoria Baja",
    day: "Friday",
    time: "14:00",
    students: [
      {
        name: "Student 13",
      },
      {
        name: "Student 14",
      },
      {
        name: "Student 15",
      },
    ],
  },
  {
    id: "6",
    name: "Casablanca",
    day: "Saturday",
    time: "14:00",
    students: [
      {
        name: "Student 13",
      },
      {
        name: "Student 14",
      },
      {
        name: "Student 15",
      },
    ],
  },
  {
    id: "7",
    name: "Buenavista",
    day: "Saturday",
    time: "16:00",
    students: [
      {
        name: "Student 16",
      },
      {
        name: "Student 17",
      },
      {
        name: "Student 18",
      },
    ],
  },
];

export default classes;
