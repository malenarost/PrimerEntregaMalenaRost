import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { connect } from 'mongoose';
import bcrypt from 'bcrypt';

export default __dirname;

export async function connectMongo() {
  try {
    await connect('mongodb+srv://rostmalena:KtKFWc0aRUSV18BH@malenarostcluster.wdwpyij.mongodb.net/?retryWrites=true&w=majority');
    console.log('plug mongo');
  } catch (e) {
    console.log(e);
    throw new Error('Error de conexión');
  }
}

/* let res = await UserModel.find();
    console.log(res); */

/* const res = await UserModel.paginate({}, { limit: 10, page: 1 });
    console.log(res); */

/*let res;
    res = await OrderModel.insertMany([
      { name: 'Cheese', size: 'medium', price: 13, quantity: 5, date: '2022-01-12T21:23:13.331Z' },
      { name: 'Vegan', size: 'large', price: 18, quantity: 6, date: '2021-01-13T05:10:13Z' },
    ]);
    console.log(res);
    res = await OrderModel.aggregate([
      {
        $match: {
          size: 'medium',
        },
      },
      {
        $group: {
          _id: '$name',
          totalQuantity: {
            $sum: '$quantity',
          },
        },
      },
      {
        $sort: {
          totalQuantity: -1,
        },
      },
      {
        $group: {
          _id: 1,
          orders: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $project: {
          _id: 0,
          orders: '$orders',
        },
      },
      {
        $merge: {
          into: 'reports',
        },
      },
    ]);
    console.log(JSON.stringify(res, null, 2));*/
/* const res = await OrderModel.find({});

    console.log(res); */

/*let student = await StudentsModel.findOne({ _id: '64952f940c7e1eff7cd134af' });
    student.courses.push({ course: '6496648cff51edc57dc3c21c' });
    let res = await StudentsModel.updateOne({ _id: '64952f940c7e1eff7cd134af' }, student);*/

/*const created = await CoursesModel.create({
      topics: ['web', 'software', 'backend'],
      students: [],
      title: 'frontend',
      description: 'wonderfull backend course',
      dificulty: 10,
      professor: 'carla',
    });*/

/*const created = StudentsModel.create({
      first_name: 'agustin ',
      last_name: 'villanueva',
      email: 'av@g.com',
      gender: 'marculino',
      courses: [],
    });*/

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

/* const created = StudentsModel.create({
      first_name: 'javier',
      last_name: 'guerrero',
      email: 'g@g.com',
      gender: 'femenino',
      courses: [],
    }); */

/*let res = await UserModel.find({ lastName: 'werwrwer' }).explain('executionStats');
    console.log(res);*/

/* let res = await UserModel.find({ lastName: 'Upton' }).explain('executionStats');
    console.log(res); */
//CREATE USERS
/*(async () => {
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
    })();*/

//----------------SOCKET------------------------------
import { Server } from 'socket.io';
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

//----------------__DIRNAME------------------------------
import path from 'path';
import { fileURLToPath } from 'url';

/////////////////////bcrypt/////////////////
import bcrypt from 'bcrypt';
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);
