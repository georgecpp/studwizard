const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const {validateRegisterUserInput, validateLoginInput, validateRegisterMeditatorInput} = require('../../utils/validators');
const {SECRET_KEY} = require('../../config');
const {User, Meditator} = require('../../models/User');

function generateToken (user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        img: user.img,
        role: user.role
    }, SECRET_KEY, {expiresIn: '1h'});
}

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);
      
            if (!valid) {
              throw new UserInputError('Errors', { errors });
            }
      
            const userAsUser = await User.findOne({ username });
            const userAsMeditator = await Meditator.findOne({username});
            if (!userAsUser && !userAsMeditator) {
              errors.general = 'User not found';
              throw new UserInputError('User not found', { errors });
            }

            var user = (!userAsUser)? userAsMeditator : userAsUser;
      
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
              errors.general = 'Wrong crendetials';
              throw new UserInputError('Wrong crendetials', { errors });
            }
      
            const token = generateToken(user);
      
            return {
              ...user._doc,
              id: user._id,
              token
            };
        },
        async registerUser(_,
            {
                registerUserInput: {username, email, password, confirmPassword, name}
            },
        ) {
            // TODO1: Validate user data
            const {valid, errors} = validateRegisterUserInput(username,email,password,confirmPassword,name);
            if(!valid) {
                throw new UserInputError('Errors', {errors});
            }
            // TODO2: Make sure user doesn't already exist
            const userInUsers = await User.findOne({$or: [
                {email: email},
                {username: username}
            ]});

            const userInMeditator = await Meditator.findOne({$or: [
                {email: email},
                {username: username}
            ]});

            if(userInUsers!==null || userInMeditator!==null) {
                throw new UserInputError('User already exists', {
                    errors: {
                        user: 'User already exists'
                    }
                })
            }

            // TODO3: Hash the password and create an auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email: email,
                username: username,
                password: password,
                name: name,
                img: 'https://cdn-icons-png.flaticon.com/512/1183/1183764.png?w=740',
                createdAt: new Date().toISOString(),
                role: 1
            });

            const res = await newUser.save();
            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token: token
            };
        },
        async registerMeditator(_,
            {
                registerMeditatorInput: {username,
                    email,
                    password,
                    confirmPassword,
                    name, 
                    phoneNumber, 
                    aboutMe, 
                    educationHistory,
                    experienceYears
                }
            },
        ) {
               // TODO1: Validate user data
               const {valid, errors} = validateRegisterMeditatorInput(username,
                email,
                password,
                confirmPassword,
                name, 
                phoneNumber, 
                aboutMe, 
                educationHistory,
                experienceYears);
               if(!valid) {
                   throw new UserInputError('Errors', {errors});
               }
                // TODO2: Make sure user doesn't already exist
                const userInUsers = await User.findOne({$or: [
                    {email: email},
                    {username: username}
                ]});

                const userInMeditator = await Meditator.findOne({$or: [
                    {email: email},
                    {username: username}
                ]});

                if(userInUsers!==null || userInMeditator!==null) {
                    throw new UserInputError('User already exists', {
                        errors: {
                            user: 'User already exists'
                        }
                    })
                }
               // TODO3: Hash the password and create an auth token
               password = await bcrypt.hash(password, 12);
               
               const newMeditator = new Meditator({
                   email: email,
                   username: username,
                   password: password,
                   name: name,
                   img: 'https://cdn-icons-png.flaticon.com/512/1183/1183773.png?w=740',
                   createdAt: new Date().toISOString(),
                   role: 2,
                   phoneNumber: phoneNumber,
                   aboutMe: aboutMe,
                   educationHistory: educationHistory,
                   experience: {
                       expYears: experienceYears,
                       numberOfMeditations: 0,
                       score: 0
                   }
               });
   
               const res = await newMeditator.save();
               const token = generateToken(res);
   
               return {
                   ...res._doc,
                   id: res._id,
                   token: token
               };
        }
    }
}