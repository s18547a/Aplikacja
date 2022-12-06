
const {createError} =require('http-errors');
// eslint-disable-next-line require-jsdoc
export default function() {

   

    const express = require('express');
    const path = require('path');
    const cookieParser = require('cookie-parser');
    const logger = require('morgan');
    const cors = require('cors');
    
    const userRouter = require('./routers/UserRouter');
    
    const ownerRouter = require('./routers/OwnerRouter');
    
    const animalRouter = require('./routers/AnimalRouter');
    
    const reservationRouter = require('./routers/ReservationRouter');
    
    const visitRouter = require('./routers/VisitRouter');
    
    const vetRouter = require('./routers/VetRouter');
    
    const surgeryRouter = require('./routers/SurgeryRouter');
    
    const vaccineRouter =require('./routers/VaccineRouter');
    
    const clinicInfoRouter=require('./routers/ClinicInfoRouter');    const app = express();
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(cors());

    app.get('/', async (req, res) => {
        res.status(200).json({message: 'REST API for Vet Clinic App'});
    });

    app.use('/users', userRouter);

    app.use('/owners', ownerRouter);

    app.use('/animals', animalRouter);

    app.use('/reservations', reservationRouter);

    app.use('/visits', visitRouter);

    app.use('/vets', vetRouter);

    app.use('/surgeries', surgeryRouter);

    app.use('/vaccines', vaccineRouter);

    app.use('/clinicInfo', clinicInfoRouter);
  
    app.use(function(req, res, next) {
        next(createError(404));
    });
    return app;
}

