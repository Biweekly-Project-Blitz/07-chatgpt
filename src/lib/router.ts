import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/input', async (_req, res) => {
  axios
    .get('https://api.openai.com/v1/models', {
      headers: {
        Authorization: `Bearer ${_req.body.key}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      res.status(200).json({ OK: response.data });
    })
    .catch((error) => {
      res.status(401).json({ Unauthorized: error.response.data });
    });
});

export default router;
