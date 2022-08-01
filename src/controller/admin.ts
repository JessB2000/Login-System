import express from "express";
import { Router } from "express";
import { getUsers } from "../service/admin";

const AdminRouter = Router();

AdminRouter.route('/users')
    .get(getUsers);

export default AdminRouter;