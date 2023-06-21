//----------------MULTER------------------------------
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });

//----------------__DIRNAME------------------------------
import path from 'path';
import { fileURLToPath } from 'url';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//----------------MONGO------------------------------
import { connect, Schema, model } from 'mongoose';
import faker from 'faker';
import { UserModel } from './DAO/models/users.model.js';
export async function connectMongo() {
  try {
    await connect('mongodb+srv://rostmalena:KtKFWc0aRUSV18BH@malenarostcluster.wdwpyij.mongodb.net/?retryWrites=true&w=majority');
    console.log('plug to mongo!!!');

    /* let student = await StudentsModel.findOne({ _id: '6477e9884df43016016bf2fa' });
    student.courses.push({ course: '6477e9ed7ebf0ed7c12a3a16' });
    let res = await StudentsModel.updateOne({ _id: '6477e9884df43016016bf2fa' }, student); */

    /* let res2 = await StudentsModel.find({}); 
    console.log(JSON.stringify(res2, null, 4)); */

    /*  let student = await StudentsModel.find({});
    console.log(JSON.stringify(student, null, 2)); */
    /* let student = await StudentsModel.findOne({ _id: '6477bde9d7627dafa9ea28b2' }); .populate('courses.course');
    console.log(JSON.stringify(student, null, 2)); */

    /* let student = await StudentsModel.findOne({ _id: '6477be0ac11ecddd0d42aa51' });
    student.courses.push({ course: '6477c6d4c8f14bc83cca80f1' });
    let res = await StudentsModel.updateOne({ _id: '6477be0ac11ecddd0d42aa51' }, student);
    console.log(res); */

    /* let student = await StudentsModel.findOne({ _id: '648261af17398abe3ca41985' });
    student.courses.push({ course: '648262d8e1272ab070670c0e' });
    let res = await StudentsModel.updateOne({ _id: '648261af17398abe3ca41985' }, student);
    console.log(res); */

    /* let todosLosEstudiantes = await StudentsModel.findOne({ _id: '648261af17398abe3ca41985' });
    console.log(JSON.stringify(todosLosEstudiantes, null, 2)); */

    /* const created = CoursesModel.create({
      topics: ['web', 'software', 'backend'],
      students: [],
      title: 'backend',
      description: 'wonderfull backend course',
      dificulty: 10,
      professor: 'guile',
    }); */

    /* const created = CoursesModel.create({
      topics: ['software', 'python'],
      students: [],
      title: 'backend',
      description: 'wonderfull python course',
      dificulty: 10,
      professor: 'carlitos',
    }); */

    /* const created = StudentsModel.create({
      first_name: 'javier',
      last_name: 'guerrero',
      email: 'g@g.com',
      gender: 'femenino',
      courses: [],
    }); */

    /* let res = await UserModel.find({ lastName: 'werwrwer' }).explain('executionStats');
    console.log(res); */

    /* let res = await UserModel.find({ lastName: 'Upton' }).explain('executionStats');
    console.log(res); */

    (async () => {
      const users = [];
      for (let i = 0; i < 7000; i++) {
        users.push({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
        });
      }

      try {
        await UserModel.insertMany(users);
        console.log('Inserted', users.length, 'users');
      } catch (error) {
        console.error('Error en insert many:', error);
      }
    })();
  } catch (e) {
    console.log(e);
    throw 'can not connect to the db';
  }
}

//----------------SOCKET------------------------------
import { Server } from 'socket.io';
import { MsgModel } from './DAO/models/msgs.model.js';
export function connectSocket(httpServer) {
  const socketServer = new Server(httpServer);

  socketServer.on('connection', (socket) => {
    socket.on('msg_front_to_back', async (msg) => {
      const msgCreated = await MsgModel.create(msg);
      const msgs = await MsgModel.find({});
      socketServer.emit('msg_back_to_front', msgs);
    });
  });
}
