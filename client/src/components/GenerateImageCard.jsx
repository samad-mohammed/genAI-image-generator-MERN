// GenerateImageCard.jsx
import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  flex: 1;
  min-height: 300px;
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  color: ${({ theme }) => theme.arrow + 80};
  border: 2px dashed ${({ theme }) => theme.yellow};
  border-radius: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
  background: ${({ theme }) => theme.black + 50};
`;

const GenerateImageCard = ({ src, loading }) => {
  return (
    <Container>
      {loading ? (
        <>
          <CircularProgress
            style={{ color: "inherit", width: "24px", height: "24px" }}
          />
          <p>Generating Your Image ...</p>
        </>
      ) : (
        <>
          {src ? (
            <Image src={src} alt="Generated Image" />
          ) : (
            <>Write a prompt to generate image</>
          )}
        </>
      )}
    </Container>
  );
};

export default GenerateImageCard;



// import { CircularProgress } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import GenerateImageCard from "./GenerateImageCard";
// import { generateImage } from "../genImg/GenerateImage"; // Import your controller function

// const Container = styled.div`
//   height: 100%;
//   overflow-y: scroll;
//   background: ${({ theme }) => theme.bg};
//   padding: 30px 30px;
//   padding-bottom: 50px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 20px;
//   justify-content: center;
// `;

// const Wrapper = styled.div`
//   width: 100%;
//   max-width: 1200px;
//   gap: 8%;
//   display: flex;
//   justify-content: center;

//   @media (min-width: 769px) and (max-width: 1050px) {
//     padding-top: 140px;
//   }
//   @media (max-width: 768px) {
//     flex-direction: column;
//     height: fit-content;
//     padding-top: 450px;
//   }
// `;

// const GenerateImageContainer = () => {
//   const [generatedImage, setGeneratedImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleGenerateImage = async (prompt) => {
//     setLoading(true);
//     try {
//       const response = await generateImage({ prompt });
//       setGeneratedImage(response.data.photo);
//     } catch (error) {
//       console.error("Error generating image:", error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     // Initial image generation example
//     handleGenerateImage("A beautiful landscape");
//   }, []); // Run only once on component mount

//   return (
//     <Container>
//       <Wrapper>
//         <GenerateImageCard src={generatedImage} loading={loading} />
//       </Wrapper>
//     </Container>
//   );
// };

// export default GenerateImageContainer;
