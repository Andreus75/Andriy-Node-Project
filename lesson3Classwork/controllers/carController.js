// const RetroCar = require('../dataBase/RetroCar');
// const {request, response} = require("express");
//
// module.exports = {
//     getRetroCars: async (request, response) => {
//         try {
//             const retroCars = await RetroCar.find();
//
//             response.json(retroCars);
//         } catch (e) {
//             response.json(e);
//         }
//     },
//     getRetroCarById: async (request, response) => {
//         try {
//             const { retroCar_id } = request.params;
//
//             const retroCar = await RetroCar.findById(retroCar_id);
//
//             response.json(retroCar);
//         } catch (e) {
//             response.json(e);
//         }
//     },
//     createRetroCar: async (request, response) => {
//         try {
//             const newRetroCar = await RetroCar.create(request.body);
//
//             response.json(newRetroCar);
//         } catch (e) {
//             response.json(e);
//         }
//     },
//     deleteRetroCar: async (request, response) => {
//         try {
//             const { retroCar_id } = request.params;
//         } catch (e) {
//             response.json(e);
//         }
//     }
// };
