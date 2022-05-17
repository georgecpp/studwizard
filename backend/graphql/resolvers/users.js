const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');
const { BlobServiceClient } = require("@azure/storage-blob");

const {validateRegisterUserInput, validateLoginInput, validateRegisterMeditatorInput} = require('../../utils/validators');
const {SECRET_KEY} = require('../../config');
const {User, Meditator} = require('../../models/User');
const Post = require('../../models/Post');

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
    Query: {
        getUser: async (_, {username}) => {
            const userAsUser = await User.findOne({ username });
            const userAsMeditator = await Meditator.findOne({username});
            if (!userAsUser && !userAsMeditator) {
                throw new UserInputError('User not found');
            }
            var user = (!userAsUser)? userAsMeditator : userAsUser;
            return user;
        },
        getMeditators: async () => {
            try {
                const meditators = await Meditator.find().sort({'experience.score': -1});
                return meditators;
            }
            catch(err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        async editUser(_, {username, role, imgname, img}) {
   
            var base64Data = img.substring(img.indexOf(',')+1);
            var notok = "";
            require("fs").writeFileSync(imgname, base64Data, 'base64', function(err) {
                notok = err;
            });

            if(notok !== "") {
                return notok;
            }

            const connStr = "DefaultEndpointsProtocol=https;AccountName=studwizardblob;AccountKey=ENqq2V4hhkULLQka/+dojxAoTrtSUG5eK1dUNtLCZBew6S3J+6q6LG6b05yLeTwtwZmBZCRKpUuOkN1BNdBNKw==;EndpointSuffix=core.windows.net";
            const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
            
            const containerName = "avatars";         
            const containerClient = blobServiceClient.getContainerClient(containerName);
            const blobName = new Date().getTime() + imgname;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            const uploadBlobResponse = await blockBlobClient.uploadFile(imgname);
            
            newimgurl = uploadBlobResponse._response.request.url;
            if(role == 1) {
                // handle update for User
                await User.updateMany({username: username}, {img: newimgurl});
            }
            else {
                // handle update for Meditator
                await Meditator.updateMany({username: username}, {img: newimgurl});
            }

            await Post.updateMany({username: username}, {userimg: newimgurl});
            await Post.updateMany(
                {},
                {$set: {'comments.$[element].userimg': newimgurl}},
                {arrayFilters:[{'element.username': username}]}
            );
    
            require('fs').unlinkSync(imgname);

            return newimgurl;
        },
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