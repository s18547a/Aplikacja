const ClinicInfoRepository = require("../repositories/ClinicInfoRepository");
import express, { Response } from "express";
const router = express.Router();

export const getClinicSchedulde =async (req, res) => {
  const results = await ClinicInfoRepository.getClinicSchedulde();
  if (results instanceof Error) {
    return res.status(500).json({});
  } else {
    return res.status(200).json(results);
  }
}


