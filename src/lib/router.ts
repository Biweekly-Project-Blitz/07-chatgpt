import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/hello', async (_req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

router.post('/input', async(_req,res) => {
  axios.get('https://api.openai.com/v1/models',{
    headers:{
      Authorization: `Bearer ${_req.body.key}`
    }
  }
  )
    .then(response => {
      console.log(response.data);
      res.status(200).json({"result":response.data});
    })
    .catch(error =>{
      console.log(error.response.data)
      res.status(401).json({"result":error.response.data})
    })
});


export default router;
