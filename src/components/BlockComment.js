import styled from "styled-components";
export default function BlockComment({
  name,
  profilePicture,
  message,
  idUserComment,
  userId,
}) {
  return (
    <>
      <Container>
        <Img src={profilePicture} alt="" />

        <Content>
          <Name>{name}</Name>
          {idUserComment === userId ? <Ponto> </Ponto> : ""}
          <Relation>{idUserComment === userId ? "Autor" : ""}</Relation>
          <Message>{message}</Message>
        </Content>
      </Container>
      <Line></Line>
    </>
  );
}
const Ponto = styled.span`
  display: inline-block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: #565656;
  padding: 4px;
  margin: 9px 8px 1px 8px;
`;
const Relation = styled.span`
  font-family: "lato";
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  color: #565656;
`;
const Content = styled.div``;

const Line = styled.div`
  width: 80%;
  height: 1.5px;
  margin: 0 auto;
  background-color: #353535;
`;
const Container = styled.div`
  font-family: "Lato";
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #1e1e1e;
  padding: 2vh;
  border-radius: 16px;
  min-height: 65px;
`;

const Img = styled.img`
  width: 39px;
  min-height: 39px;
  margin-right: 14px;
  border-radius: 50%;
`;
const Name = styled.span`
  width: 100%;
  font-weight: 700;
  font-size: 14px;
`;

const Message = styled.div`
  margin-top: 5px;
  font-weight: 400;
  font-size: 14px;
  word-wrap: break-word;
`;
