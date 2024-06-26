import React from "react";
import styled from "styled-components";
import Button from "./button";
import TextInput from "./TextInput";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { GenerateAIImage } from "../api/index";

const Form = styled.div`
  background: ${({ theme }) => theme.bg};
  padding: 16px 20px;

  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
  // align-items: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.secondary};
`;

const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Actions = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
`;
const GenerateImageForm = ({
  post,
  setPost,
  generateImageLoading,
  setGenerateImageLoading,
  createPostLoading,
  setCreatePostLoading
}) => {

  const generateImageFunction = async () =>{
    setGenerateImageLoading(true);
    await GenerateAIImage({prompt : post.prompt})
    .then((res)=> {setPost({ ...post, photo:`image/jpeg;base64, ${res?.data?.photo}`})
    setGenerateImageLoading(false);
    }).catch((err)=>{
      console.log(err)
    })
    
  }

  const createPostFunction = () =>{
    setCreatePostLoading(true);
  }
  return (
    <Form>
      <Top>
        <Title>Generate Image with prompt</Title>
        <Desc>
          Write your propmt according to the image you want to generate!
        </Desc>
      </Top>
      <Body>
        <TextInput
          label="Author"
          placeholder="Enter your name"
          name="name"
          value={post.name}
          handelChange={(e) => setPost({ ...post, name: e.target.value })}
        />
        <TextInput
          label="Image Propmpt"
          placeholder="Write the detailed propmt about the image you want to generate"
          name="prompt"
          rows="8"
          textArea
          value={post.prompt}
          handelChange={(e)=>setPost({...post,prompt: e.target.value })}
        />
        ** You can post the AI Generated Image to the Community **
      </Body>
      <Actions>
        <Button text="Generate Image" flex leftIcon={<AutoAwesome />}
          isLoading={generateImageLoading}
          isDisabled={
             post.prompt === "" 
          }
        onClick={() => generateImageFunction()}
        />
        <Button
          text="Post Image"
          flex
          type="secondary"
          leftIcon={<CreateRounded />}
          isLoading={createPostLoading}
          isDisabled={
            post.name === "" || post.prompt === "" || post.photo === ""
          }
          onClick={() => createPostFunction()}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImageForm;
