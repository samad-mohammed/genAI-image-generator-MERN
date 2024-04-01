import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";
import { GetPosts } from "../api";
import { CircularProgress } from "@mui/material";
import Footer from "../Footer";
const Container = styled.div`
  // height: 100%;
  overflow-y: scroll;
  flex:1;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const HeadLine = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;
const Span = styled.div`
  font-size: 30px;
  font-weight: 500;
  color: ${({ theme }) => theme.secondary};
`;

const Wrapper = styled.div`
margin:5px;
width:100%;
 max-width : 1400px;
 padding : 32px 0px; 
  display:flex;

  justify-content:center;


`
const CardWrapper = styled.div`

  display: grid;
  gap : 20px;

  
  /* Media query for small screens */
  @media (max-width: 479px) {
    grid-template-columns: repeat(1, 1fr);
  }

  /* Media query for screens between 480px and 819px */
  @media (min-width: 480px) and (max-width: 819px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Media query for larger screens */
  @media (min-width: 820px) {
    grid-template-columns: repeat(4, 1fr);

  }
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPost, setFilteredPost] = useState([]);

  const getPosts = async () => {
    setLoading(true);
    await GetPosts()
      .then((res) => {
        setPosts(res?.data?.data);
        setFilteredPost(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredPost(posts);
    }
    const filteredPosts = posts.filter((post) => {
      const promptMatch = post?.prompt?.toLowerCase().includes(search);
      const authorMatch = post?.author?.toLowerCase().includes(search);

      return promptMatch || authorMatch;
    });

    if (search) {
      setFilteredPost(filteredPosts);
    }
  }, [posts, search]);

  return (
    <Container>
      <HeadLine>
        Explore popular posts in the Community!
        <Span>⦾ Generated with AI ⦾</Span>
      </HeadLine>
      <SearchBar
        search={search}
        handleChange={(e) => setSearch(e.target.value)}
      />
      <Wrapper>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {loading ? (
          <CircularProgress />
        ) : (
          <CardWrapper>
            {filteredPost.length > 0 ? (
              <>
                {filteredPost
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <ImageCard key={index} item={item} />
                  ))}
              </>
            ) : (
              <>No Posts Found !!</>
            )}
          </CardWrapper>
        )}
      </Wrapper>

      <Footer/>
    </Container>
  );
};

export default Home;
