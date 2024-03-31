import * as dotenv from "dotenv";
import { createError } from "../error.js";
import fetch from 'node-fetch';
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const engineId = 'stable-diffusion-v1-6';
const apiHost = process.env.API_HOST ?? 'https://api.stability.ai';
const apiKey = process.env.STABILITY_API_KEY;

// Cloudinary configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Controller to generate Image
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!apiKey) throw new Error('Missing Stability API key.');

    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
            },
          ],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          steps: 30,
          samples: 1,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    const responseJSON = await response.json();

    const generatedImage = responseJSON.artifacts[0].base64;

    // Upload image to Cloudinary
    const photoUrl = await cloudinary.uploader.upload(generatedImage, { folder: 'generated_images' });

    res.status(200).json({ photo: photoUrl.secure_url }); // Sending Cloudinary URL as response
  } catch (error) {
    next(
      createError(
        error.status,
        error?.response?.data?.error.message || error.message
      )
    );
  }
};


// import * as dotenv from "dotenv";
// import { createError } from "../error.js";
// import fetch from 'node-fetch';
// import fs from 'node:fs';
// import path from 'node:path';

// dotenv.config();

// const engineId = 'stable-diffusion-v1-6';
// const apiHost = process.env.API_HOST ?? 'https://api.stability.ai';
// const apiKey = process.env.STABILITY_API_KEY;

// // Function to ensure directory exists
// const ensureDirectoryExists = (filePath) => {
//   const directory = path.dirname(filePath);
//   if (!fs.existsSync(directory)) {
//     fs.mkdirSync(directory, { recursive: true });
//   }
// };

// // Controller to generate Image
// export const generateImage = async (req, res, next) => {
//   try {
//     const { prompt } = req.body;

//     if (!apiKey) throw new Error('Missing Stability API key.');

//     const response = await fetch(
//       `${apiHost}/v1/generation/${engineId}/text-to-image`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//           Authorization: `Bearer ${apiKey}`,
//         },
//         body: JSON.stringify({
//           text_prompts: [
//             {
//               text: prompt,
//             },
//           ],
//           cfg_scale: 7,
//           height: 1024,
//           width: 1024,
//           steps: 30,
//           samples: 1,
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Non-200 response: ${await response.text()}`);
//     }

//     const responseJSON = await response.json();

//     const generatedImage = responseJSON.artifacts[0].base64;
//     const base64Data = generatedImage.replace(/^data:image\/png;base64,/, "");
//     const filePath = `./out/generated_image.png`;

//     ensureDirectoryExists(filePath); // Ensure directory exists

//     fs.writeFileSync(
//       filePath,
//       Buffer.from(base64Data, 'base64')
//     );

//     res.status(200).json({ photo: filePath }); // Sending file path as response
//   } catch (error) {
//     next(
//       createError(
//         error.status,
//         error?.response?.data?.error.message || error.message
//       )
//     );
//   }
// };


// import * as dotenv from "dotenv";
// import { createError } from "../error.js";
// import  OpenAI from "openai";

// dotenv.config();


// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,

// })

// // Controller to generate Image
// export const generateImage = async (req, res, next) => {
//   try {
//     const { prompt } = req.body;

//     const response = await openai.images.generate({
//       prompt,
//       n: 1,
//       size: "1024x1024",
//       response_format: "b64_json",
//     });
//     const generatedImage = response.data.data[0].b64_json;
//     res.status(200).json({ photo: generatedImage });
//   } catch (error) {
//     next(
//       createError(
//         error.status,
//         error?.response?.data?.error.message || error.message
//       )
//     );
//   }
// };