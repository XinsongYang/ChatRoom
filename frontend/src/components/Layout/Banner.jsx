import React from 'react'
import { Hero, Container, Title, SubTitle } from 'reactbulma'

function Banner(props) {
    return (
        <Hero info>
          <Hero.Body>
            <Container>
              <Title>
                Instant Chat Room
              </Title>
              <SubTitle>
                Based on WebSocket
              </SubTitle>
            </Container>
          </Hero.Body>
        </Hero>
    )
}


export default Banner