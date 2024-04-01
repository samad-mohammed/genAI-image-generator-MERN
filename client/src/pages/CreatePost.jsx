// CreatePost.jsx
import React, { useState } from "react";
import styled from "styled-components";
import GenerateImageForm from "../components/GenerateImageForm";
import GenerateImageCard from "../components/GenerateImageCard";
import { GenerateAIImage } from "../api"; // Import the generateImage function from your API file

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  gap: 8%;
  display: flex;
  justify-content: center;
padding-top:15px;
  @media (min-width: 769px) and (max-width: 1050px) {
    padding-top: 140px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    height: fit-content;
    padding-top: 450px;
  }
`;


const HeadLine = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top:20px;
  // padding-bottom:20px;
  margin-top: 20px;
  // margin-bottom : 5px;
  @media (max-width: 600px) {
    font-size: 22px;
  }
`;
const Span = styled.div`
  font-size: 30px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
`;

const CreatePost = () => {
  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [post, setPost] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const handleGenerateImage = async () => {
    setGenerateImageLoading(true);
    try {
      const response = await GenerateAIImage({ prompt: post.prompt });
      setPost({ ...post, photo: response.data.photo });
    } catch (error) {
      console.error("Error generating image:", error);
    }
    setGenerateImageLoading(false);
  };

  return (
    <Container>
        <HeadLine>

    Free tier has been Expired!
    <Span>⦾ Check the posts generated with AI in the explore section ⦾</Span>
        </HeadLine>
      <Wrapper>
        <GenerateImageForm
          post={post}
          setPost={setPost}
          generateImageLoading={generateImageLoading}
          setGenerateImageLoading={setGenerateImageLoading}
          createPostLoading={createPostLoading}
          setCreatePostLoading={setCreatePostLoading}
          handleGenerateImage={handleGenerateImage} // Pass the handleGenerateImage function to GenerateImageForm
          />
        <GenerateImageCard src={post.photo} loading={generateImageLoading} />
      </Wrapper>
    </Container>
  );
};

export default CreatePost;


// import React from "react";
// import styled from "styled-components";
// import GenerateImageForm from "../components/GenerateImageForm";
// import GenerateImageCard from "../components/GenerateImageCard";
// import { useState, useEffect } from "react";
// import { create } from "@mui/material/styles/createTransitions";
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
//   @media (max-width: 768px) {
//     padding: 6px 10px;
//   }
//   `;
  
//   const Wrapper = styled.div`
//   width: 100%;
//   // height: fit-content;
  
//   max-width: 1200px;
//   gap: 8%;
//   display: flex;
//   justify-content: center;
  
//   @media (min-width: 769px) and (max-width : 1050px) {
//     padding-top:140px;

//   }
//   @media (max-width: 768px) {
//     flex-direction: column;
//     height: fit-content;
//     padding-top: 450px; 

//   }
// `;
// const CreatePost = () => {
//   const [generateImageLoading, setGenerateImageLoading] = useState(false);
//   const [createPostLoading, setCreatePostLoading] = useState(false);
//   const [post, setPost] = useState({
//     name: "",
//     prompt: "",
//     photo: "",
//   });
//   return (
//     <Container>
//       <Wrapper>
//         <GenerateImageForm
//           post={post}
//           setPost={setPost}
//           generateImageLoading={generateImageLoading}
//           setGenerateImageLoading={setGenerateImageLoading}
//           createPostLoading={createPostLoading}
//           setCreatePostLoading={setCreatePostLoading}

//         />
//         <GenerateImageCard src={post?.photo} loading={generateImageLoading} />
//       </Wrapper>
//     </Container>
//   );
// };

// export default CreatePost;
