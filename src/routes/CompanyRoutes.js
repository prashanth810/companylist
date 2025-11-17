import express from 'express';
import { createcompanydata, deletecompanydata, getallcomapnydata, getCompaniesByIndustry, getsinglecompanydata, searchCompany } from '../controller/CompanyController.js';

const companyroute = express.Router();

// get all company data 
companyroute.get('/compantdetails', getallcomapnydata);

// get company data by id 
companyroute.get('/compantdetails/:id', getsinglecompanydata);

// serch company name , location city , state 
companyroute.get("/companydetails/search", searchCompany);

// serch industry name  
companyroute.get("/industry/name", getCompaniesByIndustry);

// post data
companyroute.post('/compantdetails/add', createcompanydata);

// delete comapny data
companyroute.post('/compantdetails/delete/:id', deletecompanydata);

export default companyroute;