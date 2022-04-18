module.exports.validateRegisterUserInput = (
    username,
    email,
    password,
    confirmPassword,
    name,
) => {
    const errors = {};
    if(username.trim() === '') {
        errors.username = 'Username must not be empty';
    }
    if(email.trim() === '') {
        errors.email= 'Email must not be empty';
    }
    else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)) {
            errors.email = 'Email must be a valid email address';
        }
    }
    if(password === '') {
        errors.password = 'Password must not be empty'
    }
    else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords mut match';
    }

    if(name.trim() === '') {
        errors.name = 'Name must not be empty'
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1 
    };
};

module.exports.validateRegisterMeditatorInput = (
    username,
    email,
    password,
    confirmPassword,
    name, 
    phoneNumber, 
    aboutMe, 
    educationHistory,
    experienceYears
) => {
    const errors = {};
    if(username.trim() === '') {
        errors.username = 'Username must not be empty';
    }
    if(email.trim() === '') {
        errors.email= 'Email must not be empty';
    }
    else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)) {
            errors.email = 'Email must be a valid email address';
        }
    }
    if(password === '') {
        errors.password = 'Password must not be empty'
    }
    else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords mut match';
    }

    if(name.trim() === '') {
        errors.name = 'Name must not be empty'
    }

    if(phoneNumber.trim() === '') {
        errors.phoneNumber = 'Phone number must not be empty'
    }

    if(aboutMe.trim() === '') {
        errors.aboutMe = 'About me must not be empty'
    }

    if(educationHistory.lastInstitution.trim() === '') {
        errors.lastInstitution = 'Last institution must not be empty'
    }

    if(educationHistory.teachPlacePreference.trim() === '') {
        errors.teachPlacePreference = 'Teach place preference must not be empty'
    }

    if (experienceYears < 0 ) {
        errors.experienceYears = 'Experience years must be provided.';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1 
    };
};

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.trim() === '') {
      errors.username = 'Username must not be empty';
    }
    if (password.trim() === '') {
      errors.password = 'Password must not be empty';
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };