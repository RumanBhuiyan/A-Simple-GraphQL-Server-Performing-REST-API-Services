const mongoose = require("mongoose");
//Defining the schema that every mode of insertion of data will follow
const PersonSchema = mongoose.Schema({
  name: String,
  roll: Number,
  cgpa: Number,
});

//Creating the model throw which every data item will be generated to insert before database
const Person = mongoose.model("graphql-person", PersonSchema);

//creating a new item to insert into GraphqlDB
//after executing once comment the lines not be assigned again & again in database.
// const person = new Person({
//   name: "Shahadat",
//   roll: 2016331026,
//   cgpa: 3.21,
// });
// person.save();

//Fetching Data from Mongodb and assigning it to an array,do the job same it because
//find method doesn't work properly inside resolver functions,it returns null array
let data = [];
Person.find(function (error, names) {
  if (error) {
    console.log(error);
  } else {
    data = names;
  }
});

const resolvers = {
  Query: {
    student() {
      return data;
    },
  },
  Mutation: {
    createUser(parent, args) {
      const person = new Person({ ...args });
      person.save();
      return "User Created Successfully!";
    },
    updateUser(parent, args, context, info) {
      //without the callback function Update won't occour.Be careful!!!
      Person.updateOne({ roll: args.roll }, { cgpa: args.cgpa }, function () {
        console.log("Updated Successfully!");
      });
      return "User Data Updated Successfully!!!";
    },
    deleteUser(parent, args, context, info) {
      Person.deleteOne({ name: "Ontor" }, function () {
        console.log("Deleted Successfully!!");
      });
      return "User Data Deleted Successfully!!!";
    },
  },
};
module.exports.resolvers = resolvers;
