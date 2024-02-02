import React from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import '../Home/Home.scss'

const Home = () => {
  return (
    <>
      <main>
        <Carousel controls={false} fade={true}>
          <Carousel.Item>
            <img src="https://i.imgur.com/rLMaOL3.png" alt="" className="img-fluid" />
          </Carousel.Item>
          <Carousel.Item>
            <img src="https://i.imgur.com/WQGVanl.png" alt="" className="img-fluid" />
          </Carousel.Item>
        </Carousel>
      </main>
      <section className="some-products">
        <Container>
          <h1 className="some-products-title">Algunos de nuestros productos</h1>
          <Row className="text-center mt-3 mb-3">
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="https://i.imgur.com/5c5UthI.png" alt="" className="img-fluid" />
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="https://i.imgur.com/gBK4PBS.png" alt="" className="img-fluid" />
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="https://i.imgur.com/9qBJLnB.png" alt="" className="img-fluid" />
            </Col>
          </Row>
          <Row className="text-center mb-3">
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="https://i.imgur.com/sWdMafF.png" alt="" className="img-fluid" />
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="https://i.imgur.com/OnWQfXA.png" alt="" className="img-fluid" />
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="https://i.imgur.com/tP34cjO.png" alt="" className="img-fluid" />
            </Col>
          </Row>
          <Row>
            
          </Row>
          <Row className="text-center mt-3 mb-3">
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="https://i.imgur.com/xlGjhaq.png" alt="" className="img-fluid" />
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="https://i.imgur.com/xlGjhaq.png" alt="" className="img-fluid" />
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="https://i.imgur.com/vxbcXLJ.png" alt="" className="img-fluid" />
            </Col>
          </Row>
          <Row className="text-center mb-3">
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="https://drive.google.com/file/d/1x0_B7f4L5DNNd4J8UuPlT3dr7IO4E5jC/view?usp=drive_link" alt="" className="img-fluid" />
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="https://drive.google.com/file/d/1B4QhFup4YuSiuBLjGwoJgH5JCDeYOLYx/view?usp=drive_link" alt="" className="img-fluid" />
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="https://drive.google.com/file/d/16SrDbQ-6qLESZy7fmKz8eA_4HmK7wWrf/view?usp=drive_link" alt="" className="img-fluid" />
            </Col>
          </Row>
          <Row>
            <img src="https://drive.google.com/file/d/1x0_B7f4L5DNNd4J8UuPlT3dr7IO4E5jC/view?usp=drive_link" className="img-fluid" alt="" />
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
