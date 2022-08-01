import express from "express";
import {Request, Response} from 'express'; 


export async function getUsers(req:Request, res: Response){
    console.log('controller'); 
    return res.json({})
}