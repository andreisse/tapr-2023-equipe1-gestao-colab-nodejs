import express from 'express';
import controller from './gestaocolabcontroller'

export default express
    .Router()
    .get('/', controller.all);